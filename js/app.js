// Enemies our player must avoid
var Enemy = function(x,y) {//added x,y
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;//
    this.y = y;//
    this.speed = getRandomInt(1,6);
    //console.log(this.speed);
};

function getRandomInt(min, max) {                                   //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    return Math.floor(Math.random() * (max - min)) + min;
}


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt * 50);
    if(this.x > 505) {
        this.x = -200;
    }
    //console.log("this.x " + this.x);

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = "images/char-boy.png";
    this.x = 250;
    this.y = 350;
    this.score = 0;
};

Player.prototype.update = function(key) {
    if(this.key === "left" && this.x >20) {
        this.x -= 30;
        this.key = null;
    } else if (this.key === "up") {
        this.y -= 30;
        this.key = null;
    } else if (this.key === "right" && this.x <400) {
        this.x += 30;
        this.key = null;
    }else if (this.key === "down" && this.y < 400) {
        this.y += 30;
        this.key = null;
    }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

Player.prototype.handleInput = function(key) {
    //console.log(key);
    this.key = key;
};

Player.prototype.chooseCharacter = function (id) {
    player.sprite = "images/" + id + ".png";
};

var Gem  =  function(x,y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Gem-Blue.png';
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

Gem.prototype.update = function() {
    gem.create();

    if ( ((player.x - 50) < this.x) && (this.x < (player.x + 50 ))){
        if ( ((player.y - 50) < this.y) && (this.y < (player.y + 50 ))){
            gem.reset();
            player.score++;
            $("#score").text(player.score);
        }
    }

};

Gem.prototype.create = function () {                //creates a random gem/rock/key to be collected
    var spriteArray  = ['images/Gem-Blue.png',      //array of elements that can be displayed
        'images/Gem-Green.png',
        'images/Gem-Orange.png',
        'images/Rock.png',
        'images/Key.png'
    ];
    var yArray       = [65,160,230];                //arrays of set positions where gems etc will appear
    var xArray       = [50,150,250,360];

    var appearOrNotAppear = getRandomInt(0,1000);       //use a random number generatorto decide if gem etc will be displayed

    if(appearOrNotAppear  > 990 ) {                 //will be displayed 10 times out of one thousand

        this.sprite = spriteArray[getRandomInt(0,spriteArray.length)];      //pick random gem etc
        this.x      = xArray[getRandomInt(0,xArray.length)];                //pick random location for that gem etc
        this.y      = yArray[getRandomInt(0,yArray.length)];
    }

};

Gem.prototype.reset = function() {                          //disappears gem off the game board
    this.x = -100;
    this.y = -10;
    this.sprite = "images/Gem-Blue.png";
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var enemy1 = new Enemy(0, 65);
var enemy2 = new Enemy(0, 150);
var enemy3 = new Enemy(0, 230);



allEnemies.push(enemy1,enemy2,enemy3);

var player = new Player();
var gem = new Gem();
gem.create();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
