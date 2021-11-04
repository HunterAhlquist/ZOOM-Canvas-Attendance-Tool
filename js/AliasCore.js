let students = [];
let classes = [];

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
        students = data.students;
        if (students.length > 0){
            document.getElementById("studentEdit").innerHTML = "<select class=\"entryLabel\" id=\"studentList\">\n" +
                "        </select>\n" +
                "        <input value=\"Remove Student\" type=\"button\" class=\"upload_bottom\">";
            let selector = document.getElementById("studentList");
            for (let s of students) {
                selector.innerHTML += "<option value='" + s.sid + "'>" + s.name + "</option> \r\n";
            }
        }
    });
    chrome.storage.local.get('classes', function (data) {
        classes = data.students;
    });
}

let sidField = document.getElementById("cSID");
let nameField = document.getElementById("sName");
let emailsField = document.getElementById("emails");

document.getElementById("addStudent").addEventListener('click', function () {
    let emails = emailsField.value.split(' ');
    CreateNewStudent(sidField.value, nameField.value, emails);
});

function CreateNewStudent(sid, name, knownEmails) {
    let newStudent = new Student(sid, name, knownEmails);
    students[newStudent.sid] = newStudent;
    SaveDataLocal();
}

LoadDataLocal();
