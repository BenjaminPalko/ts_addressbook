
class Student {
    fullName: string;

    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + ". " + lastName;
    }
}

interface Person {
    firstName: String;
    lastName: String;
}

function greeter(person: Student) {
    return "Hello, " + person.fullName;
}

let user = new Student("Benjamin", "A", "Palko")

document.body.textContent = greeter(user);
