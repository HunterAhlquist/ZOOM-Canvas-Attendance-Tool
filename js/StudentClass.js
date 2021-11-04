/**
 * This class represents a class that a student attends
 * @author Hunter A.
 * @version 1.0
 */
class StudentClass {
    constructor() {
        this.classID = 0;
        this.title = "";
        this.students = [];
    }

    addStudent(student) {
        if (typeof student === typeof new Student()) return false; //valid parameter check
        for (let s of this.students) if (s === student) return false; //duplicate check
        this.students.push(student);
        return true;
    }
    removeStudent(student) {
        if (typeof student === typeof new Student()) return false; //valid parameter check
        for (let s of this.students){
            if (s === student) {
                this.students.remove(s);
                return true;
            }
        }
        return false;
    }
}