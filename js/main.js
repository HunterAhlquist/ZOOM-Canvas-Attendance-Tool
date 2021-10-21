const initApp = () => {
    const droparea = document.querySelector('.drop-area');

    const active = () => droparea.classList.add("green-border"); //add green border when hovering over droparea
    const inactive = () => droparea.classList.remove("green-border");
    const prevents = (e) => e.preventDefault();

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        droparea.addEventListener(eventName, prevents);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        droparea.addEventListener(eventName, active);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        droparea.addEventListener(eventName, inactive);
    });

    droparea.addEventListener("drop", handleDrop);
}

document.addEventListener("DOMContentLoaded", initApp);

const handleDrop = async (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    const fileArray = [...files];

    console.log(fileArray[0].type)

    if (fileArray[0].type !== "application/vnd.ms-excel") return;
    const fileData = await fileArray[0].text(); //since .text() returns a promise, we must await for it to be fulfilled.
    parseFile(fileData); //turn into students
}

/**
 * Opens a new window displaying
 * @param students StudentConnections object array
 */
function generateAttendanceSheet(students) {
    let html = "<head><title>Student Attendance</title><style> .studentTable { outline: solid black 2px; background-color: #eeffbe; padding: 1em;} .colorFlip { background-color: #f8ffe2; } </style></head>";
    html += "<table><tr><th class='studentTable'>Student Name</th><th class='studentTable'>Student Email</th><th class='studentTable'>Minutes Joined</th></tr>";
    let colorFlip = false;
    for (let s of students) { //loop through students array
        if (s.host) continue; //if the student is the host/not a guest, they must be the instructor, so skip
        html += "<tr>";
        if (colorFlip){ //alternates the color for visibility
            html += "<th class='colorFlip studentTable'>" + s.name + "</th>" + "<th class='colorFlip studentTable'>" + s.email + "</th>" +"<th class='colorFlip studentTable'>" + s.timeMinutes + "</th>";
        } else {
            html += "<th class='studentTable'>" + s.name + "</th>" + "<th class='studentTable'>" + s.email + "</th>" +"<th class='studentTable'>" + s.timeMinutes + "</th>";
        }
        colorFlip = !colorFlip; //flip the boolean
        html += "</tr>";
    }
    html += "</table>";
    let win = window.open("", "Student Attendance", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=" + (screen.height - 220));
    win.document.body.innerHTML = html;
}