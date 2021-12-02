/*
* Columns
* 0 -> Name
* 1 -> Email
* 2 -> Join date/time
* 3 -> Leave date/time
* 4 -> Joined duration
* 5 -> Was a guest (No = meeting host/instructor, Yes = guest/student
* 6 -> Recording consent (Y = Yes/true, (blank) = No/false)
* */
let properCSVFormatWithConsent = ["Name (Original Name)", "User Email", "Join Time", "Leave Time", "Duration (Minutes)", "Guest", "Recording Consent"];
let properCSVFormat = ["Name (Original Name)", "User Email", "Join Time", "Leave Time", "Duration (Minutes)", "Guest"];
let studentsConnections = []; //this is the finished variable that contains StudentConnections.
let unknownStudents = []; //if no match for a student is found

function parseFile(fileData) {
    //Create Array from file
    let rawLines = fileData.split('\r\n');
    let colDef = rawLines[0].split(",");
    if (JSON.stringify(properCSVFormat) !== JSON.stringify(colDef)
        && JSON.stringify(properCSVFormatWithConsent) !== JSON.stringify(colDef)) {
        if (confirm("WARNING: File does not match proper format, continuing may add unrelated data to the students list!")){
            //do nothing
            console.log("Don't say I didn't warn you...")
        } else {
            return;
        }
    }
    let entries = [];
    for (let i=0;i <rawLines.length;i++){
        if (i === 0) continue;
        if (rawLines[i].length <= 0) continue; //skip blank lines
        entries.push(rawLines[i].split(","));
    }
    for (let i=0;i <entries.length;i++){
        processLine(entries[i]);
    }

    //save unknown students as new in chrome data
    for (let i=0; i < unknownStudents.length; i++){
        if (!AttemptStudentMerge(unknownStudents[i])){
            let emails = [];
            if (unknownStudents[i].email.length > 0) emails.push(unknownStudents[i].email);
            students.push(new Student(uuidv4(), unknownStudents[i].name, emails))
        }
    }
    unknownStudents = [];
    SaveDataLocal();

    generateAttendanceSheet(studentsConnections); //display attendance window with data
}

function processLine(curLine) {
    if (curLine[0] === "arazabdulmajeed") {

    }
    if (curLine[5] !== "No") { //skip if host
        let matchResult = FindMatchFromStudentAttendance(curLine);
        if (matchResult.student !== null) {
            if (matchResult.unmatchedEmail !== null && matchResult.unmatchedEmail.length > 0) {//new email found with name
                console.log("Adding new email");
                students[students.indexOf(matchResult.student)].addKnownEmail(curLine[1]);
            }
            if (matchResult.unmatchedName !== null) {//new name found with email (might be a ZOOM username)
                console.log("Unsupported");
            }
            let connectionMatch = null;
            for (let i=0; i<studentsConnections.length; i++) {
                if (studentsConnections[i].checkMatch(curLine[0], curLine[1])) {
                    connectionMatch = studentsConnections[i];
                }
            }
            if (connectionMatch == null) {
                connectionMatch = new StudentConnection();
                connectionMatch.name = curLine[0];
                connectionMatch.email = curLine[1];
                connectionMatch.addTime(curLine[4]);
                studentsConnections.push(connectionMatch);

            } else {
                studentsConnections[studentsConnections.indexOf(connectionMatch)].addTime(curLine[4]);
            }

        } else { //create new student connection
            let connectionMatch = null;

            for (let i=0; i < studentsConnections.length; i++) {
                if (studentsConnections[i].checkMatch(curLine[0], curLine[1])) {
                    connectionMatch = studentsConnections[i];
                }
            }
            if (connectionMatch == null) {
                let newConnection = new StudentConnection();
                newConnection.name = curLine[0];
                newConnection.email = curLine[1];
                newConnection.addTime(curLine[4]);
                newConnection.unknown = true;
                studentsConnections.push(newConnection);
                connectionMatch = newConnection;
            } else {
                studentsConnections[studentsConnections.indexOf(connectionMatch)].addTime(curLine[4]);
            }
            unknownStudents.push(connectionMatch);
        }
    } else {
        recordDate = curLine[2];
    }

}