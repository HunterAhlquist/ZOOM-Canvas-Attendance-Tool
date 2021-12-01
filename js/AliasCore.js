let students = [];
let classes = [];

let curStudent;
let curClass;

function SaveDataLocal() {
    chrome.storage.local.clear(function () {
        console.log("deleted all")
    });
    chrome.storage.local.set({'students': students}, function () {
        console.log("saved students")
    });
    chrome.storage.local.set({'classes': classes}, function () {
        console.log("saved classes")
    });
}

function LoadDataLocal() {
    chrome.storage.local.get('students', function (data) {
        if (data.students === undefined || data.students.length <= 0) return;
        students = data.students;
        PopulateStudents(studentEditSelector);
    });
    chrome.storage.local.get('classes', function (data) {
        if (data.classes === undefined || data.classes.length <= 0) return;
        classes = data.classes;
        PopulateClasses(classEditSelector);
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
    for (let s of students) {
        if (s.email.match(rows[1])) {
            if (s.name === rows[0]) return {student:s, unmatchedEmail:null, unmatchedName:null};
            else return {student:s, unmatchedEmail:null, unmatchedName:rows[0]};
        }

    }
    //check for name match (less important)
    for (let s of students) {
        if (s.name === rows[0]) return {student:s, unmatchedEmail:rows[1], unmatchedName:null};
    }
    return {student:null, unmatchedEmail:null, unmatchedName:null};
}

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}