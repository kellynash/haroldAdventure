var holdon = new Audio('holdon.wav');
var coon = new Audio('racoon.wav');
var dead = new Audio('dead.wav');

function Adventure(startX, startY, endX, endY, bound) {
	this.yCoord = startX;
	this.xCoord = startY;
	this.startX = startX;
	this.startY = startY;
	this.endX = endX;
	this.endY = endY;
	this.bound = bound;
	this.isGhost = false;
}

Adventure.prototype.mov = function(xDel, yDel) {
	if(!this.isGhost && this.xCoord + xDel === this.endX && this.yCoord + yDel === this.endY) {
        alert("Whuuthaa!!??");
        hideAbe();	
        this.xCoord += xDel;
        this.yCoord += yDel;
        killAbe();
        dead.play();
	}
	else if ((this.yCoord + yDel) < 0 || (this.yCoord + yDel) >= this.bound) {
        holdon.play();
        alert("D'oh!!!");
    }
    else if ((this.xCoord + xDel) < 0 || (this.xCoord + xDel) >= this.bound) {
        coon.play();
        alert("D'oh!!!");
    }
    else {
 		hideAbe();
        this.xCoord += xDel;
        this.yCoord += yDel;
		movAbe();
	};
}

Adventure.prototype.reset = function() {
    this.xCoord = this.startX;
    this.yCoord = this.startY;
    this.isGhost = false;
}