// Create a method for the student name, email, duration of time in class. then take in data for parsing student info from the DOM and breaking into pieces
// into the HTML file (The Visual part)

let testCsv = "text weight\nLorem 15\nIpsum 9";
let attendanceWin =
    `<!DOCTYPE html>
    <html>
        <head>
            <title>Attendance List</title>
        </head>
        <body>

        </body>
    </html>`;

let attenURL = URL.createObjectURL(
    new Blob([attendanceWin], {type: "text/html"}));

function displayFile() {
    const attendanceForm = document.getElementById("displayForm");
    const csvFile = document.getElementById("csvFile");

    //Event listener for when a file gets uploaded
    attendanceForm.addEventListener("submit", function (event) {
        // this prevents the page to refresh when submited
        event.preventDefault();
        const input = csvFile.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            const text = event.target.result;
            displayAttendance.document.write(text);
        };
        reader.readAsText(input);
    });

    let displayAttendance = window.open(attenURL, "AttendanceList", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=400,top=" + (screen.height - 400) + ",left=" + (screen.width - 840));
}

