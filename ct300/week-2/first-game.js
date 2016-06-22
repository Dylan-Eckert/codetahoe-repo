var students = [{
    id: 1,
    firstname: "Markham",
    lastname: "Gross"
}, {
    id: 2,
    firstname: "Ari",
    lastname: "Zamudio"
}, {
    id: 3,
    firstname: "Liam",
    lastname: "Hurt"
}, {
    id: 4,
    firstname: "Mike",
    lastname: "McDermott"
}, {
    id: 5,
    firstname: "Dylan",
    lastname: "Eckert"
}, {
    id: 6,
    firstname: "Aaron",
    lastname: "Martin"
}, {
    id: 7,
    firstname: "Markus",
    lastname: "Brun"
}, {
    id: 8,
    firstname: "Blaze",
    lastname: "Halderman"
}, {
    id: 9,
    firstname: "Jayson",
    lastname: "Smith"
}, {
    id: 10,
    firstname: "Svyatoslav",
    lastname: "Safonov"
}]
var rightAnswerId = Math.floor((Math.random() * 10) + 1);

function findStudent(id) {
    for (var i = 0; i < students.length; i++) {
        if (students[i].id === id) {
            return students[i];
        }
    }
}

function getInitials() {
    var student = findStudent(rightAnswerId);
    return student.firstname[0] + student.lastname[0]
}
var currentScore = 10;
var previousGuesses = []

function gameMain() {
    var correct = false;
    var previous = false;
    while (!correct) {
        var userInput = prompt('Guess who ate the pie?  Enter initials only.');
        var correctStudentInitials = getInitials();
        if (userInput === correctStudentInitials) {
            alert('You win with a score of [currentScore] in [gameClock] seconds!');
            correct = true;
        } else {
            for (var i = 0; i < this.previousGuesses.length; i++) {
                if (userInput === previousGuesses[i]) {
                    alert('You already guessed that!.');
                    currentScore - 1;
                    previous = true;
                }
            }
            if (!previous) {
                alert('Wrong!  Find the pie!');
                currentScore - 1;
                this.previousGuesses.push(userInput);
            }
            previous = false;
        }
    }
}
gameMain();
