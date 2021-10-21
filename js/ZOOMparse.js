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
let properCSVFormat = ["Name (Original Name)", "User Email", "Join Time", "Leave Time", "Duration (Minutes)", "Guest", "Recording Consent\r"];

function parseFile(fileData) {
    let students = []; //this is the finished variable that contains StudentConnections.

    //create column definitions via a key/value pair
    let buffer = ""; //stores current value of string
    let colDef = []; //contains definitions of what each column is
    let colCount = 0; //number of columns counted in this csv
    let curCol = 0;
    let defineCol = true;
    let curLine = [];


    //Loop through each character in the csv
    for (let i = 0; i < fileData.length; i++) {
        let char = fileData.charAt(i);
        if (char === ',') {
            if (defineCol) { //if the first line
                colDef[colCount] = buffer;
                colCount++;
                buffer = "";
                continue;
            }
            curLine[curCol] = buffer;
            curCol++;
            buffer = "";
            continue;
        }
        if (char === '\n'){
            if (defineCol){ //if the first line
                colDef[colCount] = buffer;
                colCount++;
                buffer = "";
                defineCol = false;
                console.log(colDef.length);
                for (let i = 0; i < colDef.length; i++) { //loop through all the defined columns to check if the CSV format is proper
                    console.log(colDef[i] + " " + properCSVFormat[i]);
                    if (colDef[i] !== properCSVFormat[i]) {
                        //display an incorrect format error
                        document.getElementById("bottom").innerHTML = `<h3 style="color: red;">Please upload a ZOOM attendance record csv file</h3>`;
                        return;
                    }
                }
                //reset the error prompt
                document.getElementById("bottom").innerHTML = ``;
            } else {
                //Add or update student
                let alreadyAdded = false;
                for (let s of students) { //loop through students already added, to see if they can be merged
                    alreadyAdded = s.checkMatch(curLine[0], curLine[1]); //check if a student was already entered
                    if (alreadyAdded){
                        s.addTime(parseFloat(curLine[4])); //Merge times
                        break;
                    }
                }
                if (!alreadyAdded) {
                    students[students.length] = new StudentConnection(); //create new student object
                    students[students.length - 1].name = curLine[0]; //add the name
                    students[students.length - 1].email = curLine[1]; //add the email
                    students[students.length - 1].addTime(parseFloat(curLine[4])); //add their time
                    if (curLine[5] === "No") { //host check
                        students[students.length - 1].host = true;
                        recordDate = curLine[2]; //get meeting time
                    }
                }

                buffer = ""; //reset buffer
                curLine = []; //clear current line
                curCol = 0;
            }
            continue;
        }
        buffer += char; //add character to buffer
    }
    generateAttendanceSheet(students); //display attendance window with data
}