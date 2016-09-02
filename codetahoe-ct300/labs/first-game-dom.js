var guessField = document.getElementById('guess');
var messageDisplay = document.getElementById('display');
var guessList = document.getElementById('guess-list');
var submitButton = document.getElementById('submit');
var counter = document.getElementById('counter');

submitButton.onclick = function() {
  var guess = guessField.value;

  if (!guess || guess === '') {
    game.updateDisplay('Give me some text, bro!', 'red');
  } else {
    checkGuess( guess.toUpperCase() );
  }
}

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
  ],
  this.start = function () {
    console.log('Starting....');

    messageDisplay.innerHTML = '';
    submitButton.disabled = false;
    guessField.disabled = false;
    guessField.focus();
    counter.innerHTML = 20;

    this.rightAnswer = Math.floor(Math.random() * 10) + 1;
    this.currentScore = 10;
    this.gameClock = 0;
    this.previousGuesses = [];
    this.gameRef = setInterval(gameTimer, 1000);

    console.log(this.students[this.rightAnswer - 1].getFullName())
  },
  this.restart = function() {
    clearInterval(game.gameRef);
    guessField.disabled = true;
    submitButton.disabled = true;
    guessList.innerHTML = '';

    var restarter = setInterval(function(){
      reset();
    }, 5000);

    var reset = function() {
      clearInterval(restarter);
      game.start();
    }
  },
  this.updateDisplay = function(message, className) {
    messageDisplay.innerHTML = message;
    messageDisplay.classList = '';
    messageDisplay.classList.add(className);
    guessField.value = '';
    guessField.focus();
  }
};

var gameTimer = function() {
  game.gameClock++;
  counter.innerHTML = 20 - game.gameClock;

  if (game.gameClock >= 20) {
    game.updateDisplay('Sorry, you lost without finding pie.  Please try again.', 'blue');
    game.restart();
  }
}

var checkGuess = function(guess) {

  if (game.previousGuesses.indexOf(guess) !== -1) {
    wrongAnswer('You already guessed that!', 'purple');
    return;
  }

  for (i = 0; i < game.students.length; i++) {
    if ( guess === game.students[i].getInitials() ) {
      if ( game.students[i].id === game.rightAnswer ) {
        game.updateDisplay('You win with a score of ' + game.currentScore + ' in ' + game.gameClock + ' seconds!', 'green');
        game.restart();
        return;
      } else {
        game.previousGuesses.push(guess);
        var listItem = document.createElement('li');
        listItem.innerHTML = game.students[i].getFullName();
        guessList.appendChild(listItem);
        wrongAnswer('Wrong!  Find the pie!', 'orange');
        return;
      }
    }
  }

  wrongAnswer('No matching student found.', 'white');
}

var wrongAnswer = function(message, className) {
  game.currentScore--;
  game.updateDisplay(message, className);
}

var game = new Game();
game.start();
