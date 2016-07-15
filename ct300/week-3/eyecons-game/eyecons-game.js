// -------- Initialize --------
var buttonStartNewGame = document.getElementById('start-new-game');
var buttonPause = document.getElementById('pause');
var buttonHelp = document.getElementById('help');
var timer = document.getElementById('timer');
var score = document.getElementById('score');
var baseTiles = document.querySelectorAll('.tile-slot');
var tileCounter = document.querySelectorAll('.tile-counters');
var picArray = [];
var picId = 0;
var tileSelected = null;
var minute = document.getElementById("minute");
var second = document.getElementById("second");
var tileRem = document.getElementById("tileRem");


var gameInit = function() {
    picArray = [];
    picId = 0;
    tileSelected = null;
    $('.woodenTile').remove();
    clock.clear();
    tileRem.innerHTML = 50;
}

// var gameWon
//   if (tileRem.value = 48) {
//   alert('You win! Press Start New Game to try and get a better time!');
// }

// -------- Buttons --------
buttonStartNewGame.addEventListener("click", function() {
    gameInit();
    populateGameBoard();
    clock.start();
});

buttonPause.addEventListener("click", function() {
    clock.pause();
})

// -------- Image Selector --------
function imageSelector() {
    var url = "/Users/dylan-eckert/GitHub/codetahoe-repo/ct300/week-3/eyecons-game/eyecon-game-assets/eyecons/set-7/"
    var imgArray = [
        url + 'set7-tile-1.jpg',
        url + 'set7-tile-2.jpg',
        url + 'set7-tile-3.jpg',
        url + 'set7-tile-4.jpg',
        url + 'set7-tile-5.jpg',
        url + 'set7-tile-6.jpg',
        url + 'set7-tile-7.jpg',
        url + 'set7-tile-8.jpg',
        url + 'set7-tile-9.jpg',
        url + 'set7-tile-10.jpg',
        url + 'set7-tile-11.jpg',
        url + 'set7-tile-12.jpg',
        url + 'set7-tile-13.jpg',
        url + 'set7-tile-14.jpg',
        url + 'set7-tile-15.jpg',
        url + 'set7-tile-16.jpg',
        url + 'set7-tile-17.jpg',
        url + 'set7-tile-18.jpg',
        url + 'set7-tile-19.jpg',
        url + 'set7-tile-20.jpg',
        url + 'set7-tile-21.jpg',
        url + 'set7-tile-22.jpg',
        url + 'set7-tile-23.jpg',
        url + 'set7-tile-24.jpg',
        url + 'set7-tile-25.jpg',
    ];
    var count = 0;
    for (var i = 0; i < 25; i++) {
        while (count < 4) {
            var randomNumber = Math.floor((Math.random() * 100));;
            console.log(randomNumber);
            if (picArray[randomNumber] == null) {
                picArray[randomNumber] = imgArray[i];
                count++;
                console.log("hit")
            }
        }
        count = 0;
    }
    console.log("done");
};

// -------- Populate Game Board --------
var populateGameBoard = function() {
    imageSelector();

    var totalCount = [];
    var zeroCount = [];
    var oneCount = [];
    var twoCount = [];
    var threeCount = [];

    var populateLayer1 = function() {
        for (var i = 0; i < baseTiles.length; i++) {
            var randomNum = Math.round(100 * Math.random()) / 100;
            if (randomNum <= 0.18) {
                baseTiles[i].dataset.layer = 0;
                zeroCount.push(baseTiles[i].dataset.layer);
                tileCounter[i].innerHTML = 0;
            } else {
                baseTiles[i].dataset.layer = 1;
                oneCount.push(baseTiles[i].dataset.layer);
                totalCount.push(baseTiles[i].dataset.layer);
                tileCounter[i].innerHTML = 1;
                var tile = createTile();
                var tileImage = tile.firstChild
                tileImage.setAttribute("src", picArray[picId++])
                baseTiles[i].appendChild(tile)
            }
        }
        populateLayer2();
    }

    var populateLayer2 = function() {
        for (var i = 0; i < baseTiles.length; i++) {
            if (picId < 100)
                if (baseTiles[i].dataset.layer === '1') {
                    var randomNum = Math.round(100 * Math.random()) / 100;
                    if (randomNum <= 0.20) {
                        baseTiles[i].dataset.layer = 1;
                        oneCount.push(baseTiles[i].dataset.layer);
                    } else {
                        baseTiles[i].dataset.layer = 2;
                        twoCount.push(baseTiles[i].dataset.layer);
                        totalCount.push(baseTiles[i].dataset.layer);
                        tileCounter[i].innerHTML = 2;
                        var tile = createTile();
                        tile.classList.add("layer2")
                        var tileImage = tile.firstChild
                        tileImage.setAttribute("src", picArray[picId++])
                        baseTiles[i].appendChild(tile)
                    }
                }
        }
        populateLayer3();
    }

    var populateLayer3 = function() {
        while (picId < 100) {
            for (var i = 0; i < baseTiles.length; i++) {
                if (picId < 100)
                    if (baseTiles[i].dataset.layer === '2') {
                        var randomNum = Math.round(100 * Math.random()) / 100;
                        if (randomNum <= 0.22) {
                            baseTiles[i].dataset.layer = 2;
                            twoCount.push(baseTiles[i].dataset.layer);
                        } else {
                            baseTiles[i].dataset.layer = 3;
                            threeCount.push(baseTiles[i].dataset.layer);
                            totalCount.push(baseTiles[i].dataset.layer);
                            tileCounter[i].innerHTML = 3;
                            var tile = createTile();
                            tile.classList.add("layer3")
                            var tileImage = tile.firstChild
                            tileImage.setAttribute("src", picArray[picId++])
                            baseTiles[i].appendChild(tile)
                        }
                    }
            }
        }
    }

    populateLayer1();
    console.log(picId)
};

// -------- Placing Tiles --------
var createTile = function() {
    var woodenTile = document.createElement("DIV");
    var image = document.createElement("IMG");
    woodenTile.appendChild(image);
    image.classList.add("image")
    woodenTile.classList.add("woodenTile");
    woodenTile.addEventListener("click", function() {

        // See if a tile is currently selected
        if (tileSelected === null) {

            // If there's a selected tile, add a border and set tileSelected to this (the one that was clicked) div element
            this.classList.add("tileClicked");
            tileSelected = this;

        } else {

            // If there IS a currently selected tile, compare A) the image source of the selected elem and this (the one that was clicked)
            // and B) compare the currently seleted tile div element with this (clicked) div element to make sure they didn't double click the same element
            if (tileSelected.firstChild.src === this.firstChild.src && tileSelected !== this) {

                // Remove BOTH the previously selected element and this element (clicked)
                tileSelected.remove();
                this.remove();

                // reduce the pairs remaing by one
                tileRem.innerHTML = parseInt(tileRem.innerHTML) - 1

            } else {

                // If there's no match OR they double clicked, remove the border
                tileSelected.classList.remove("tileClicked");
            }

            // Update tileSelected = null so that we can make a fresh comparison
            tileSelected = null;

        }
    });
    return woodenTile;
}

// -------- Clock --------

var Clock = function() {

    var runTime;
    var time = 120;
    var gamePaused = false;
    this.start = function() {
        this.runTime = setInterval(function() {
            if (time <= 0) {
                clearInterval(runTime);
                alert('You are too slow! Press Start New Game to try again!')
            } else {
                time--;
                minute.innerHTML = parseInt(time / 60);
                if (time % 60 < 10) {
                    second.innerHTML = "0" + time % 60;
                } else {
                    second.innerHTML = time % 60;
                }
            };
        }, 1000);
    }
    this.pause = function() {
        if (gamePaused) {
            this.start();
        } else {
            clearInterval(this.runTime)
        }
        gamePaused = (gamePaused ? false : true);
    }
    this.clear = function() {
        clearInterval(this.runTime)
        time = 121;
    }
}
var clock = new Clock();
