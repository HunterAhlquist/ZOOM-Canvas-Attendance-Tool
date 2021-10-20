/**
 * This class represents the students in the csv file
 * @author Hunter A.
 * @version 0.01
 */
class StudentConnection {
    constructor() {
        this.name = "";
        this.email = "";
        this.timeMinutes = 0;
    }

    /**
     * First checks for a match through email, if the email is blank, then default to the student name
     * @param name Name of the student (string)
     * @param email Email of the student (string)
     */
    checkMatch(name, email) {
        if (this.email.toLowerCase() === email.toLowerCase() && email.toLowerCase() !== ""){ //email check
            return true;
        } else if (this.name.toLowerCase() === name.toLowerCase()) { //name check
            if (this.email.toLowerCase() === "" && email.toLowerCase() !== "") { //add email if student rejoins
                this.email = email;
            }
            return true;
        }
        return false;
    }

    addTime(timeMinutes) {
        this.timeMinutes += parseFloat(timeMinutes);
    }

}