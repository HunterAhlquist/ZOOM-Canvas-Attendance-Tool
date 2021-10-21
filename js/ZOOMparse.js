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

function parseFile(fileData) {
    let students = []; //this is the finished variable that contains StudentConnections.

    let lines = fileData.split('\n');
    console.log(lines.pop());
    //create column definitions via a key/value pair
    let buffer = ""; //stores current value of string
    let colDef = {}; //contains definitions of what each column is
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
            } else {
                //Add or update student
                let alreadyAdded = false;
                for (let s of students) { //loop through students already added, to see if they can be merged
                    alreadyAdded = s.checkMatch(curLine[0], curLine[1])
                    if (alreadyAdded){
                        s.addTime(parseFloat(curLine[4]));
                        break;
                    }
                }
                if (!alreadyAdded) {
                    students[students.length] = new StudentConnection();
                    students[students.length - 1].name = curLine[0];
                    students[students.length - 1].email = curLine[1];
                    students[students.length - 1].addTime(parseFloat(curLine[4]));
                    if (curLine[5] === "No") {
                        students[students.length - 1].host = true;
                    }
                }

                buffer = "";
                curLine = [];
                curCol = 0;
            }
            continue;
        }
        buffer += char;
    }

    generateAttendanceSheet(students);
}