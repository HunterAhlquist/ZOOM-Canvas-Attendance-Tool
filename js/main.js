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
    document.querySelector('#zoomLink').addEventListener("click", openZoomLink);
    document.querySelector('#upload').addEventListener("input", handleUpload);
}

document.addEventListener("DOMContentLoaded", initApp);
document.getElementById("openSettings").addEventListener('click', function () {
    chrome.tabs.create({url: chrome.runtime.getURL('StudentAdd.html')});
});

const handleDrop = async (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    const fileArray = [...files];

    if (fileArray[0].type !== "application/vnd.ms-excel") {
        document.getElementById("bottom").innerHTML = `<h3 style="color: red;">Please upload a ZOOM attendance record csv file</h3>`;
        return;
    }
    const fileData = await fileArray[0].text(); //since .text() returns a promise, we must await for it to be fulfilled.
    console.log(fileData.type);
    parseFile(fileData); //turn into students
}
//TODO
const handleUpload = async (evt) => {
    const fileData = await evt.target.files[0].text();

    if (evt.target.files[0].type !== "application/vnd.ms-excel") {
        document.getElementById("bottom").innerHTML = `<h3 style="color: red;">Please upload a ZOOM attendance record csv file</h3>`;
        return;
    }

    parseFile(fileData);
}

const openZoomLink = async () => {
    window.open("https://us02web.zoom.us/account/report/user", '_blank') //opens to zoom report page
}

/**
 * Opens a new window displaying
 * @param students StudentConnections object array
 */
function generateAttendanceSheet(students) {
    let html = "<head>" +
                    "<title>Student Attendance</title>" +
                    "<style> " +
                        "body {font-family: 'Arial', sans-serif;}" +
                        "center{display: flex; align-items: center; align-content: center;}" +
                        "ul {padding: 0.625rem 1.875rem 0 1.875rem}" +
                        "li { border-radius: 0.1875rem; padding: 1.5625rem 1.875rem; display: flex; justify-content: space-between; margin-bottom: 1.5625rem; }" +
                        ".table_header { background-color: #5179b4; font-size: 1.125rem; text-transform: uppercase; }" +
                        ".table_row { background-color: #ececec; box-shadow: 0 0 0.4375rem 0 dimgrey; }" +
                        ".column_1 {flex-basis: 30%; }" +
                        ".column_2 {flex-basis: 60%; }" +
                        ".column_3 {flex-basis: 10%; }" +
                        ".button {display: inline-flex; height: 2.5rem; width: auto; border: 2px solid #BFC0C0; padding: 0.313rem 0.625rem 0.313rem 0.625rem; font-weight: 500; background: transparent; cursor: pointer; transition: all 0.3s ease; position: relative;}" +
                        ".button a{display: flex; text-decoration: none; align-items: center; justify-content: center;}" +
                        ".button_designs {transition: all 0.3s ease;}" +
                        ".button_designs:hover {box-shadow: -0.438rem -0.438rem 1.25rem 0 #fff9, -0.25rem -0.25rem 0.313rem 0 #fff9, 0.438rem 0.438rem 1.25rem 0 #0002, 0.25rem 0.25rem 0.313rem 0 #0001;}" +
                    "</style>" +
                "</head>";
    html += "<h2 style='text-align: center; padding-top: 0.3125rem'> For the meeting/class hosted on " + recordDate.split(" ")[0] + " starting at " + recordDate.split(" ")[1] + "</h2>";
    html += "<div class='button button_designs'>" +
                "<a href='#'>Setting placeholder</a>" +
            "</div>";
    // Creates new student table
    html += "<ul>" +
                "<li class=\"table_header\">" +
                    "<div class='column_1 center'>Student Name</div>" +
                    "<div class='column_2 center'>Student Email</div>" +
                    "<div class='column_3 center'>Minutes Joined</div>" +
                "</li>";
    // displays new student into list
    for (let s of students) { //loop through students array
        if (s.host) continue; //if the student is the host/not a guest, they must be the instructor, so skip
        html += "<li class=\"table_row\"> <div class='column_1' style='font-size: 0.875rem;'>" + s.name +
                    "</div>" + "<div class='column_2' style='font-size: 0.875rem;'>" + s.email + "</div>" +
                    "<div class='column_3' style='font-size: 0.875rem;'>" + s.timeMinutes + "</div> " +
                "</li>";
    }
    html += "</ul>";
    let win = window.open("", "Student Attendance", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=900,height=" + (screen.height - 220));
    win.document.body.innerHTML = html;
}