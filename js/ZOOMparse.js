function parseFile(fileData) {
    //create column definitions via a key/value pair
    let buffer = ""; //stores current value of string
    let colDef = {}; //contains definitions of what each column is
    let colCount = 0; //number of columns counted in this csv

    //Loop through each character in the csv
    for (let i = 0; i < fileData.length; i++) {
        let char = fileData.charAt(i);
        if (char === ',') {
            colDef[colCount] = buffer;
            colCount++;
            buffer = "";
            continue;
        }
        buffer += char;
    }
}