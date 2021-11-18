// Start of Tagify JS Code

// Student Email Selection
var studentEmail_input = document.getElementById('studentEmail');
var studentClass_input = document.getElementById('studentList');
var tagify_Email = new Tagify(studentEmail_input, {
    dropdown: {
        enabled: 0
    },
    whitelist: ["Student@Student.com"]
});
var tagify_StudentsInClass = new Tagify(studentClass_input);


// Single Value Selection Tagify
// Student Option
var Student_input = document.querySelector('input[name=student-select-mode]'),
    Student_tagify = new Tagify(Student_input, {
        enforceWhitelist: true,
        mode : "select",
        whitelist: ["first option", "second option", "third option"]
    });

// Class Option
var Class_input = document.querySelector('input[name=class-select-mode]');

new Tagify(Class_input, {
    whitelist: [1,2,3,4,5],
    userInput: false
});

// End of Tagify JS Code
