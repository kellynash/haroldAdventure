var holdon = new Audio('sounds/holdon.wav');
var coon = new Audio('sounds/racoon.wav');
var dead = new Audio('sounds/dead.wav');

function Adventure(startX, startY, endX, endY, bound) {
	this.coord = new Thing(startX, startY);
	this.start = new Thing(startX, startY);
	this.end = new Thing(endX, endY, this, this.endAction);
    this.burns = new Thing(endX-1, endY-1, this, this.burnsAction);
	this.bound = bound;
	this.isGhost = false;
}

Adventure.prototype.endAction = function(xChange, yChange) {
    this.adventure.hideAbe();
    this.adventure.coord.x += xChange;
    this.adventure.coord.y += yChange;
    alert("Whuuthaa!!??");
    this.adventure.killAbe();
    dead.play();
};

Adventure.prototype.burnsAction = function(xChange, yChange) {
    alert("You're fired!");
    reset();
}

Adventure.prototype.atPosition = function(xChange, yChange, position) {
    return this.coord.x + xChange === position.x && this.coord.y + yChange === position.y;
};

Adventure.prototype.mov = function(xChange, yChange) {
	if(!this.isGhost && this.atPosition(xChange, yChange, this.end)) {
        this.end.action(xChange, yChange);
	}
    else if (!this.isGhost && this.atPosition(xChange, yChange, this.burns)) {
        this.burns.action(xChange, yChange);
    }
	else if ((this.coord.x + xChange) < 0 || (this.coord.x + xChange) >= this.bound) {
        holdon.play();
        alert("D'oh!!!");
    }
    else if ((this.coord.y + yChange) < 0 || (this.coord.y + yChange) >= this.bound) {
        coon.play();
        alert("D'oh!!!");
    }
    else {
 		this.hideAbe();
        this.coord.x += xChange;
        this.coord.y += yChange;
		this.movAbe();
	};
}

Adventure.prototype.getID = function() {
    return this.coord.x.toString() + this.coord.y.toString();
};

Adventure.prototype.getIDTarget = function() {
    return this.end.x.toString() + this.end.y.toString();
};

Adventure.prototype.getIDBurns = function() {
    return this.burns.x.toString() + this.burns.y.toString();
};

//Adding a function to replace the winning cell with a picture of dead Abe Simpson
Adventure.prototype.killAbe = function () {
    document.getElementById(this.getID()).innerHTML = this.makeImageElement("dead.jpg");
    this.isGhost = true;
};

Adventure.prototype.placeBurns = function() {
    var imageElement = this.makeImageElement("burns.jpg");
    document.getElementById(this.getIDBurns()).innerHTML = imageElement;
};

Adventure.prototype.target = function() {
    var imageElement = this.makeImageElement("retire.png");
    document.getElementById(this.getIDTarget()).innerHTML = imageElement;
};
    
Adventure.prototype.movAbe = function() {
    if (myAdventure.isGhost) {
        imageElement = this.makeImageElement("ghost.png");
    } else {
        imageElement = this.makeImageElement("small_abe.png");
    }
    document.getElementById(this.getID()).innerHTML = imageElement;
};

Adventure.prototype.makeImageElement = function(image) {
    return "<img class=\"img-responsive center-block\" src=\"img/"
        + image + "\"></img>";
}

Adventure.prototype.hideAbe = function () {
    document.getElementById(this.getID()).innerHTML = "";
};

Adventure.prototype.generateGrid = function() {
    for (var row = 0; row < this.bound; row++) {
        document.write("<tr class=\"row\">\n");

        for (var col = 0; col < this.bound; col++) {
            document.write(" <td id=\"" + col + row + 
                "\" class=\"cell\"></td>\n");
        }
        document.write("</tr>");
    }
    this.reset();
};

Adventure.prototype.reset = function() {
    this.hideAbe();
    this.coord.x = this.start.x;
    this.coord.y = this.start.y;
    this.isGhost = false;
    this.movAbe();
    this.target();
    this.placeBurns();
}

function Thing(x, y, adventure, action) {
    this.x = x;
    this.y = y;
    this.adventure = adventure;
    this.action = action;
}