let students = [];
let classes = [];

let curStudent;
let curClass;

function DEBUG_WipeChromeData() {
    chrome.storage.local.clear(function () {
        console.log("deleted all")
    });
}

function SaveDataLocal() {
    chrome.storage.local.clear(function () {
        console.log("deleted all")
    });
    chrome.storage.local.set({'students': students}, function () {
        console.log("saved students")
    });
}

function LoadDataLocal(editor) {
    chrome.storage.local.get('students', function (data) {
        if (data.students === undefined || data.students.length <= 0) return;
        for (let s of data.students){
            students.push(new Student(s.sid, s.name, s.emails));
        }
        if (editor === true) PopulateStudents(studentEditSelector);
    });
}

//to use with student connection objects
function AttemptStudentMerge(unknownStudent) {
    for (let i=0; i<students.length; i++) {
        if (students[i].checkKnownEmail(unknownStudent.email)) {
            return true;
        }
        if (students[i].checkName(unknownStudent.name)) {
            if (unknownStudent.email.length <= 0) {
                return true;
            } else {
                students[i].addKnownEmail(unknownStudent.email);
                return true;
            }

        }
    }
    return false;
}

function FindMatchFromStudentAttendance(rows) {
    //check for email match (more important)
    for (let i=0; i<students.length; i++) {
        if (students[i].emails <= 0) break;
        if (students[i].checkKnownEmail(rows[1])) {
            if (students[i].checkName(rows[0])) return {student:students[i], unmatchedEmail:null, unmatchedName:null};
            else return {student:students[i], unmatchedEmail:null, unmatchedName:rows[0]};
        }

    }
    //check for name match (less important)
    for (let i=0; i<students.length; i++) {
        if (students[i].checkName(rows[0])) return {student:students[i], unmatchedEmail:rows[1], unmatchedName:null};
    }
    return {student:null, unmatchedEmail:null, unmatchedName:null};
}

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

