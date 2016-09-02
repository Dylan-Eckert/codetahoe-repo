/*
We are going to create a very simple game.

Things you will have to Google:

1.  Generating a random number(hint: Math.random())

2.  Running a timer (hint: setInterval, clearInterval, etc)

The rules of the game are as follows:

Someone ate Rush's chicken pot pie!  We know it was someone in class, but we don't know who.  Luckily, Tim knows, but he's going to make you guess.

Goals of the game:
*/

// 1.  Use the following array to represent all students:
var Person = function(id, firstname, lastname) {
  this.id = id,
  this.firstname = firstname,
  this.lastname = lastname
}

Person.prototype.getInitials = function() {
  return this.firstname.charAt(0) + this.lastname.charAt(0);
}

Person.prototype.getFullName = function() {
  return this.firstname + ' ' + this.lastname;
}

var Game = function() {
  this.students = [
    new Person(1, "Markham", "Gross"),
    new Person(2, "Ari", "Zamudio"),
    new Person(3, "Liam", "Hurt"),
    new Person(4, "Mike", "McDermott"),
    new Person(5, "Dylan", "Eckert"),
    new Person(6, "Aaron", "Martin"),
    new Person(7, "Markus", "Brun"),
    new Person(8, "Blaze", "Halderman"),
    new Person(9, "Jayson", "Smith"),
    new Person(10, "Svyatoslav", "Safonov")
  ];
};

// 2.  Start the game:
Game.prototype.start = function () {

  console.log('Starting game...');

  //  2.a Find a random number that represents the id of *one* of the students and store it as a global variable called "rightAnswer"
  this.rightAnswer = Math.floor(Math.random() * 10) + 1;
  console.log(this.students[this.rightAnswer - 1].getFullName())


  //  2.b Give the user a starting score of 10 and store it in a global variable called "currentScore"
  this.currentScore = 10;

  //  2.c Create an empty array to save previous guesses, and store it in a global variable called "previousGuesses"
  this.previousGuesses = [];

  //  2.d Start a timer using javascript, store & update the result as seconds in a global variable called "gameClock"
  this.gameClock = 0;
  this.gameRef = setInterval(gameTimer, 1000);
  this.gameStart = new Date();

  showPrompt();
}

var gameTimer = function() {
  checkTime();
}

var checkTime = function() {
  var checkDate = new Date();
  game.gameClock = Math.floor( (checkDate - game.gameStart) / 1000 );

  // 4.  If "gameClock" hits 20 seconds:
  //  4.1 Display an alert: "Sorry, you lost without finding pie.  Please try again."
  //  4.2 Restart the game by resetting to step 2
  if (game.gameClock >= 20) {
    clearInterval(game.gameRef);
    alert('Sorry, you lost without finding pie.  Please try again.');
    game.start();
  }
}

// 3.  Display a prompt:  "Guess who ate the pie?  Enter initials only."
var showPrompt = function() {
  var guess = prompt('Guess who ate the pie?  Enter initials only.');
  if (guess === '') {
    showPrompt();
  } else if (guess){
    checkGuess( guess.toUpperCase() );
  }
};

var checkGuess = function(guess) {
  checkTime();

  //  3.a  If the value matches a previous guess, display an alert: "You already guessed that!"
  if (game.previousGuesses.indexOf(guess) !== -1) {
    wrongAnswer('You already guessed that!');
    return;
  }

  //  3.b  If the value matches no initials, display an alert: "No matching student found."
  for (i = 0; i < game.students.length; i++) {
    if ( guess === game.students[i].getInitials() ) {

      //  3.c If a matching student is found who has not already been guessed, compare their ID to "rightAnswer"
      if ( game.students[i].id === game.rightAnswer ) {

        //    3.c.1  If the ID is equal to "rightAnswer", display an alert "You win with a score of [currentScore] in [gameClock] seconds!"
        alert('You win with a score of ' + game.currentScore + ' in ' + game.gameClock + ' seconds!');
        game.start();
        return;

      } else {
        //    3.c.2  If the ID is not equal:
        //      3.c.2.a Reduce "currentScore" by 1
        //      3.c.2.b Add the incorrect student to "previousGuesses"
        //      3.c.2.c Display an alert: "Wrong!  Find the pie!"
        //      3.c.2.d Repeat step 3
        game.previousGuesses.push(guess);
        wrongAnswer('Wrong!  Find the pie!');
        return;
      }
    }
  }

  wrongAnswer('No matching student found.');
}

var wrongAnswer = function(message) {
  game.currentScore--;
  alert(message);
  showPrompt();
}

// 5.  Allow the game to be restarted at any time by typing "restart()" in the console.
var restart = function() {
  game.start();
}

var game = new Game();
game.start();
