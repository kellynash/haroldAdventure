var adventureSize = Math.floor(3 + Math.random()*8);
var myAdventure = new Adventure(0, 0, adventureSize-1, adventureSize-1, adventureSize);

var getID = function() {
    return myAdventure.yCoord.toString() + myAdventure.xCoord.toString();
};

var getIDTarget = function() {
    return myAdventure.endY.toString() + myAdventure.endX.toString();
};

//Adding a function to replace the winning cell with a picture of dead Abe Simpson
var killAbe = function () {
    document.getElementById(getID()).innerHTML = "<img src=\"img/dead.jpg\"></img>";
    myAdventure.isGhost = true;
};

var target = function(){
    var imageElement = "<img class=\"img-responsive center-block\" src=\"img/retire.png\"></img>";
    document.getElementById(getIDTarget()).innerHTML = imageElement;
};
    
var movAbe = function(){
    if (myAdventure.isGhost) {
        imageElement = "<img src=\"img/ghost.png\"></img>";
    } else {
        imageElement = "<img class=\"img-responsive center-block\" src=\"img/small_abe.png\"></img>";
    }
    document.getElementById(getID()).innerHTML = imageElement;
};

var hideAbe = function () {
    document.getElementById(getID()).innerHTML = "";
};

var movDown = function() {
    myAdventure.mov(0, 1);
};

var movUp = function() {
    myAdventure.mov(0, -1);
};

var movLeft = function() {
    myAdventure.mov(-1, 0);
};

var movRight = function() {
    myAdventure.mov(1, 0);
};

var reset = function() {
    myAdventure.reset();
    movAbe();
    target();
};

var generateGrid = function() {
    for (var row = 0; row < myAdventure.bound; row++) {
        document.write("<tr class=\"row\">\n");

        for (var col = 0; col < myAdventure.bound; col++) {
            document.write("  <td id=\"" + row + col + 
                "\" class=\"cell\"></td>\n");
        }
        document.write("</tr>");
    }
    reset();
};


document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            movLeft();
            break;
        case 38:
            movUp();
            break;
        case 39:
            movRight();
            break;
        case 40:
            movDown();
            break;
        case 32:
            reset();
            break;
   }
};

