startButton = $('#restart');
pauseButton = $('#pause');

startButton.click(function(){ clock.start() });
pauseButton.click(function(){ clock.pause() });

var gameTileSets = [
  {id:1,title:"DefJam",d:26},
  {id:2,title:"Dr. Pepper",d:27},
  {id:3,title:"ESPN",d:34},
  {id:4,title:"Hard Rock",d:35},
  {id:5,title:"Nike",d:34},
  {id:6,title:"Playboy",d:34},
  {id:7,title:"Travelocity",d:37},
  {id:8,title:"Expedia",d:35},
  {id:9,title:"Priceline",d:32},
  {id:10,title:"Barnes & Noble",d:37},
  {id:11,title:"Spinmaster",d:34},
  {id:12,title:"Live Nation",d:45}
]

function Tile(id, url) {
  this.id = id;
  this.url = url;
}

function Clock() {
  this.gameTime = 0;
  this.gameClock;
  this.paused = false;

  var that = this;

  this.timer = function() {
    if (that.gameTime === 0) {
      this.clearTimer();
    } else {
      that.gameTime--;
      $('#clock').text(that.gameTime)
    }
  }
  this.start = function() {
    this.paused = false;
    this.gameTime = 120;
    $('#clock').text(this.gameTime);
    game.init();
    this.clearTimer();
    pauseButton.text('PAUSE'); // TODO: Hide or disable until ready
    var that = this;
    setTimeout(function() {
      that.startClock();
    }, game.dropCounter + (game.dropCounterIncrement * 100))
  }
  this.pause = function() {
    if (this.paused) {
      this.paused = false;
      pauseButton.text('PAUSE');
      this.startClock();
    } else {
      this.paused = true;
      pauseButton.text('RESUME');
      this.clearTimer();
    }
  }
  this.startClock = function() {
    this.gameClock = setInterval(this.timer, 1000);
  }
  this.clearTimer = function() {
    clearInterval(this.gameClock);
  }

}

function Game() {
  this.init = function() {
    var randomIndex = Math.floor(Math.random() * 12) - 1;

    this.tileSelected = null;
    this.tileSet = gameTileSets[randomIndex].id;
    this.numTiles = gameTileSets[randomIndex].d;
    this.dropCounter = 100;
    this.dropCounterIncrement = 20;

    this.buildBoard();
  }
  this.buildBoard = function() {
    $('.tile-container').remove();

    for (i=1;i<=56;i++){
      $('.wrapper').append(
        $('<li/>')
        .addClass('tile-container')
        .attr('id', i)
        .data('count', 0)
      );
    }
    this.buildTiles()
  }
  this.buildTiles = function() {
    var tileNum = 1;
    var index = 0;
    for (i=1;i<=50;i++) {
      var tile = new Tile(tileNum, 'eyecons/set'+this.tileSet+'/set'+this.tileSet+'-tile-'+(tileNum<10 ? '0' : '')+tileNum+'.jpg');
      this.assignToBoard(tile, index++);
      this.assignToBoard(tile, index++);
      tileNum = (tileNum === this.numTiles ? 1 : tileNum += 1);
    }
  }
  this.assignToBoard = function(tile, index) {
    var tileContainer = $('#' + Math.floor(Math.random() * 56));
    var stackLevel = parseInt( tileContainer.data('count') ) + 1;
    if ( stackLevel <= 3) {
      var tileElem = $('<div/>')
        .attr('id', 'img' + index)
        .addClass('level' + String(stackLevel))
        .data('img', tile.id)
        .append(
          $('<img/>')
          .attr('src', tile.url)
        );

      if (stackLevel > 1) {
        tileContainer.children().unbind('click');
      }
      tileContainer.data('count', String(stackLevel) );

      var that = this;
      setTimeout(this.addTile, this.dropCounter += this.dropCounterIncrement, tileContainer, tileElem, that)
    }
  }
  this.addTile = function(tileContainer, tileElem, that) {
    tileContainer.append(tileElem);
    that.applyClicks(tileElem);
  }
  this.applyClicks = function(tile) {
    var animateSpeed = 200;
    var that = this;
    tile.click(function(){
      // TODO: Unbind click event to prevent double clicks while animating
      if (that.tileSelected) {
        if ( $(this).attr('id') !== that.tileSelected.attr('id') &&
         $(this).data('img') === that.tileSelected.data('img') ) {

          if ( $(this).prev().length ) that.applyClicks($(this).prev());
          if ( that.tileSelected.prev().length ) that.applyClicks(that.tileSelected.prev());

          $(this).animate({ marginLeft: '-=4px', marginTop: '-=4px'}, animateSpeed, function(){
            $(this).fadeOut();
            that.tileSelected.fadeOut();
            that.tileSelected = null;
          });

        } else if ( $(this).attr('id') === that.tileSelected.attr('id') ) {

          $(this).animate({ marginLeft: '+=4px', marginTop: '+=4px'}, animateSpeed);
          that.tileSelected = null;

        } else {
          $(this).animate({ marginLeft: '-=4px', marginTop: '-=4px'}, animateSpeed, function(){

            $(this).animate({ marginLeft: '+=4px', marginTop: '+=4px'}, animateSpeed);
            that.tileSelected.animate({ marginLeft: '+=4px', marginTop: '+=4px'}, animateSpeed);
            that.tileSelected = null;
          });
        }

      } else {
        that.tileSelected = $(this);
        that.tileSelected.animate({ marginLeft: '-=4px', marginTop: '-=4px'}, animateSpeed);
      }
    })
  }
}

var game = new Game();
var clock = new Clock();
clock.start();
