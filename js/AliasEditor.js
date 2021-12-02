
//Add student variables
let studentEditSelector = document.getElementById("selectStudent");
let studentIDField = document.getElementById("studentID");
let studentNameField = document.getElementById("studentName");
let studentSaveButton = document.getElementById("saveStudent");

//Add class variables
let classEditSelector = document.getElementById("selectClass");
let classIDField = document.getElementById("classID");
let classTitleField = document.getElementById("classTitle");
let classStudentField = document.getElementById("selectClassStudent");
let classSaveButton = document.getElementById("saveClass");

//change events
studentEditSelector.addEventListener('change', function () { //change student to edit (or keep it new)
    tagify_Email.removeAllTags();
    if (studentEditSelector.value === "-") {
        studentSaveButton.innerText = "Add Student";
        studentSaveButton.value = "add";
        studentIDField.value = "";
        studentNameField.value = "";
        return;
    }
    studentSaveButton.innerText = "Save Student";
    studentSaveButton.value = "save";
    let student = FindStudentInArray(students, studentEditSelector.value);
    studentIDField.value = student.sid;
    studentNameField.value = student.name;
    tagify_Email.addTags(student.emails);
});

//click events
studentSaveButton.addEventListener('click', function () {
    let emails = tagify_Email.value;
    if (studentSaveButton.value === "add") { //add new
        if (studentIDField.value !== "" && studentNameField.value !== "") {
            let newStudent = new Student(studentIDField.value, studentNameField.value, emails);
            students.push(new Student(studentIDField.value, studentNameField.value, emails));
            PopulateStudents(studentEditSelector);
            studentEditSelector.value = newStudent.sid;
        } else { //one or more are blank

        }
    } else if (studentSaveButton.value === "save") { //replace instead of add
        let newStudent =  new Student(studentIDField.value, studentNameField.value, emails)
        students[GetStudentSIDInArray(students, studentEditSelector.value)] = newStudent;
        PopulateStudents(studentEditSelector);
        studentEditSelector.value = newStudent.sid;
    }

    SaveDataLocal();

});


//general functions
function PopulateStudents(selector) {
    let options = "<option>-</option> \r\n";
    for (let s of students) {
        options += "<option value='" + s.sid + "'>" + s.name + "</option> \r\n";
    }
    selector.innerHTML = options;
}
function PopulateClasses(selector) {
    let options = "<option>-</option> \r\n";
    for (let c of classes) {
        options += "<option value='" + c.classID + "'>" + c.title + "</option> \r\n";
    }
    selector.innerHTML = options;
}
LoadDataLocal(true);