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

var students = [
  { id: 1, firstname: "Markham", lastname: "Gross" },
  { id: 2, firstname: "Ari", lastname: "Zamudio" },
  { id: 3, firstname: "Liam", lastname: "Hurt" },
  { id: 4, firstname: "Mike", lastname: "McDermott" },
  { id: 5, firstname: "Dylan", lastname: "Eckert" },
  { id: 6, firstname: "Aaron", lastname: "Martin" },
  { id: 7, firstname: "Markus", lastname: "Brun" },
  { id: 8, firstname: "Blaze", lastname: "Halderman" },
  { id: 9, firstname: "Jayson", lastname: "Smith" },
  { id: 10, firstname: "Svyatoslav", lastname: "Safonov" }
]

// 2.  Start the game:
var score = 10;
var choiceHistory = [];
var timeLeft = 20;
var suspect;
var userInput;
var interval;

var scoreNode = document.querySelector('.score');
var instructionDisplay = document.querySelector('.instructions');
var timerNode = document.querySelector('.game-time');

var startButton = document.querySelector('.btn');
startButton.onclick = startGame;

var inputButton = document.querySelector('.subBtn');
inputButton.onclick = getUserGuess;

function getRandomPerson () {
  var randomIndex = Math.floor(Math.random() * students.length);
  var randomStudent = students[randomIndex];
  return randomStudent;
};

function gameTimer () {
  var i = 20;
  interval = setInterval(function () {
    timeLeft = i;
    timerNode.innerHTML = timeLeft
    i--;
    if (i === -1) {
      endGame();
      clearInterval(interval);
    }
  }, 1000)
};

function userInteration () {
  var initials = suspect.firstname.slice(0,1) + suspect.lastname.slice(0,1);
  if (userInput.toUpperCase() === initials) {
    instructionDisplay.innerHTML = 'Congradulations you guessed the suspect!'
    clearInterval(interval)
  } else {
    recordGuess()
  };
};

function recordGuess () {
  if (choiceHistory.length > 0) {
    for (i = 0; i < choiceHistory.length; i++) {
      if(choiceHistory[i] === userInput) {
        instructionDisplay.innerHTML = 'You have already choosen this person! Pick a new person.'
      }
    }
  } else {
    choiceHistory.push(userInput)
    score--
    scoreNode.innerHTML = score
    instructionDisplay.innerHTML = userInput + " is not the theif!"
  }
}

function getUserGuess () {
  userInput = document.querySelector('.inputField').value;
  if (userInput) {
    userInteration()
  } else {
    instructionDisplay.innerHTML = 'You must enter something!'
  }
}

function endGame () {
  instructionDisplay.innerHTML = 'Game Over! You lost.'
  startButton.innerHTML = 'Start'
};

function turnOn () {
  gameTimer();
  suspect = getRandomPerson();
  console.log(suspect);
};

function startGame () {
  startButton.innerText = 'In Progress'
  score = 10;
  choiceHistory = [];
  scoreNode.innerText = '10';
  turnOn();
};
//  2.a Find a random number that represents the id of *one* of the students and store it as a global variable called "rightAnswer"
//  2.b Give the user a starting score of 10 and store it in a global variable called "currentScore"
//  2.c Create an empty array to save previous guesses, and store it in a global variable called "previousGuesses"
//  2.d Start a timer using javascript, store & update the result as seconds in a global variable called "gameClock"

// 3.  Display a prompt:  "Guess who ate the pie?  Enter initials only."
//  3.a If the value matches a previous guess, display an alert: "You already guessed that!"
//  3.b If the value matches no initials, display an alert: "No matching student found."
//  3.c If a matching student is found who has not already been guessed, compare their ID to "rightAnswer"
//    3.c.1  If the ID is equal to "rightAnswer", display an alert "You win with a score of [currentScore] in [gameClock] seconds!"
//    3.c.2  If the ID is not equal:
//      3.c.2.a Reduce "currentScore" by 1
//      3.c.2.b Add the incorrect student to "previousGuesses"
//      3.c.2.c Display an alert: "Wrong!  Find the pie!"
//      3.c.2.d Repeat step 3


// 4.  If "gameClock" hits 20 seconds:
//  4.1 Display an alert: "Sorry, you lost without finding pie.  Please try again."
//  4.2 Restart the game by resetting to step 2

// 5.  Allow the game to be restarted at any time by typing "restart" in the console.
