/**
 * This class represents the students in the csv file
 * @author Hunter A.
 * @version 0.01
 */
class StudentConnection {
    constructor(name, email, time) {
        this.name = name;
        this.email = email;
        this.time = time;
    }

    /**
     * First checks for a match through email, if the email is blank, then default to the student name
     * @param name Name of the student (string)
     * @param email Email of the student (string)
     */
    checkMatch(name, email) {
        if (this.email.toLowerCase() === email.toLowerCase()){ //email check
            return true;
        } else if (this.name.toLowerCase() === name.toLowerCase()) { //name check
            return true;
        }
        return false;
    }

}