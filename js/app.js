// Few vars
var VERT_MOVE = 83;
var HOR_MOVE = 101;
var HOR_STARTING_X = -170;
var RESET_X = 200;
var RESET_Y = 380;

// Superclass
var Character = function(sprite,x, y) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
};

// Draw the enemy and player objects on the screen
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player subclass:
var Player = function(sprite, x, y){
    Character.call(this, sprite, x, y);
};

// Player prototype to inherit Character.prototype's methods
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;


// Enemies subclass:
var Enemy = function(x,y) {
    Character.call(this,'images/enemy-bug.png',x,y);
    this.speed = Math.floor(Math.random()*300+300);
};

// Enemy prototype to inherit Character.prototype's methods
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //if the enemy crosses off screen reset its position
    if(this.x <= 550){
        this.x += this.speed * dt;
    }
    //if not it keeps running
    else{
        this.x = HOR_STARTING_X;
        this.speed = Math.floor(Math.random()*300+75);
        switch(Math.floor(Math.random()*3)){
            case 1:
                this.y = 55;
                break;
            case 2:
                this.y = 140;
                break;
            default:
                this.y = 225;
            }
    }
    //If the player collides an enemy, reset the game
    if(player.x >= this.x - 30 && player.x <= this.x + 30){
        if(player.y >= this.y - 30 && player.y <= this.y + 30){
            player.reset();
        }
    }
};

//Update player position
Player.prototype.update = function(){
    //if left key is pressed and player is not on the first column, he moves 1 step on the left
    if(this.ctlKey === 'left' && this.x > 0){
        this.x -= HOR_MOVE;
    //if right key is pressed and player is not on the last column, he moves 1 step on the right
    }else if(this.ctlKey === 'right' && !(this.x >= 400)){
        this.x += HOR_MOVE;
    //if up key is pressed player moves 1 step on the upper row
    }else if(this.ctlKey === 'up'){
        this.y -= VERT_MOVE;
    //if down key is pressed and player is not on the bottom row, he moves 1 step on row below
    }else if (this.ctlKey === 'down' && !(this.y >= 350)){
        this.y += VERT_MOVE;
    }
    this.ctlKey = null;
    //If the player is on the water or he won, reset
    if(this.y < 25){
        this.reset();
    }
};

//Reset player to initial position
Player.prototype.reset = function() {
  this.x = RESET_X;
  this.y = RESET_Y;
};

//Input handler for player
Player.prototype.handleInput = function(e){
    this.ctlKey = e;
};

// Instantiate enemy objects
var allEnemies = [];
(function setEnemies(){
    var startX, startY;
    for(var i=0; i<4; i++){
        startX = Math.floor(Math.random()*675-170);
        switch(Math.floor(Math.random()*3)){
            case 1:
                startY = 55;
                break;
            case 2:
                startY = 140;
                break;
            default:
                startY = 225;
            }
            allEnemies.push(new Enemy(startX, startY));
    }
}());

// Istantiate player object
var player = new Player('images/char-horn-girl.png',RESET_X,RESET_Y);

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
