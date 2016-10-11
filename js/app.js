
// Few vars
var vertMove = 83;
var horMove = 101;
var playerStartX = 200;
var playerStartY = 380;
var enemyStartX = -170;



// Draw the enemy and player objects on the screen
Object.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Reset player to initial position
Object.prototype.reset = function() {
  player.x = playerStartX;
  player.y = playerStartY;
}


// Enemies class:
var Enemy = function(x,y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random()*300+300);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //if the enemy crosses off screen reset its position
    if(this.x <= 550){
        this.x += this.speed * dt;
    }
    //if not it keeps running
    else{
        this.x = enemyStartX;
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
            this.reset();
        }
    }
};



// Player class:
var Player = function(){
    this.sprite = 'images/char-horn-girl.png';
    this.x = playerStartX;
    this.y = playerStartY;
}


//Update player position
Player.prototype.update = function(){
    //if left key is pressed and player is not on the first column, he moves 1 step on the left
    if(this.ctlKey === 'left' && this.x > 0){
        this.x -= horMove;
    //if right key is pressed and player is not on the last column, he moves 1 step on the right
    }else if(this.ctlKey === 'right' && !(this.x >= 400)){
        this.x += horMove;
    //if up key is pressed player moves 1 step on the upper row
    }else if(this.ctlKey === 'up'){
        this.y -= vertMove;
    //if down key is pressed and player is not on the bottom row, he moves 1 step on row below
    }else if (this.ctlKey === 'down' && !(this.y >= 350)){
        this.y += vertMove;
    }
    this.ctlKey = null;

    //If the player is on the water or he won, reset
    if(this.y < 25){
        this.reset();
    }
}

//Input handler for player
Player.prototype.handleInput = function(e){
    this.ctlKey = e;
}

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
var player = new Player();


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




