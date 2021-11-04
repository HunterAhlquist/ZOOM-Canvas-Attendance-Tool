/**
 * This class represents a student
 * @author Hunter A.
 * @version 1.0
 */
class Student {
    constructor(sid, name, emails) {
        this.sid = sid;
        this.name = name;
        this.emails = emails;
    }

    addKnownEmail(email) {
        if (typeof email !== typeof "string") return false; //valid parameter check
        for (let e of this.emails) if (e === email) return false; //duplicate email check
        this.emails.push(email);
        return true;
    }
    checkKnownEmail(email) {
        if (typeof email !== typeof "string") return false; //valid parameter check
        for (let e of this.emails) if (e === email) return true;
        return false;
    }
    checkName(name) {
        if (typeof name !== typeof "string") return false; //valid parameter check
        return name === this.name;
    }
    addToClass(targetClass) {
        if (typeof targetClass === typeof new StudentClass()) return false; //valid parameter check
        return targetClass.addStudent(this);
    }
    removeFromClass(targetClass) {
        if (typeof targetClass === typeof new StudentClass()) return false; //valid parameter check
        return targetClass.removeStudent(this);
    }
}