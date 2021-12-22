// Creating the canvas and initializing it such that it can be drawn on
var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");

// An array that will contain all Block instances
var blocks = [];

var current_index = 0;
var options = ["rock", "paper", "scissors"];

var colour = "orange";

var playerBet = "";
var currentBalance = 500;
var incrementCount = 0;
var bettingTime = 5000;

// Creating a Block class that will be the type of all Rock, Papers and Scissors
class Block {
    constructor(x, y, x_vel, y_vel, classification){
        this.x_coordinate = x;
        this.y_coordinate = y;
        this.x_velocity = x_vel;
        this.y_velocity = y_vel;
        this.classification = classification;
    }

    // Creating the getter methods
    getX() {
        return this.x_coordinate;
    }

    getY(){
        return this.y_coordinate;
    }

    getXVel(){
        return this.x_velocity;
    }

    getYVel(){
        return this.y_velocity;
    }

    getClassification(){
        return this.classification;
    }

    // Creating the setter methods
    setX(x){
        this.x_coordinate = x;
    }

    setY(y){
        this.y_coordinate = y;
    }

    setXVelocity(x){
        this.x_velocity = x;
    }

    setYVelocity(y){
        this.y_velocity = y;
    }

    setClassification(c){
        this.classification = c;
    }
}

// Generating all the blocks
function createBlocks(number){
    blocks = [];
    for (let i = 0; i < number; i++){
        let x_coord = Math.trunc(Math.random() * (canvas.width - 20) + 1);
        let y_coord = Math.trunc(Math.random() * (canvas.height - 20) + 1);

        let positive_negative_x = Math.round(Math.random());
        let positive_negative_y = Math.round(Math.random());
        let multiplier_x = 1;
        let multiplier_y = 1;
                if (positive_negative_x == 0){
            multiplier_x = -1;
        }

        if (positive_negative_y == 0){
            multiplier_y = -1;
        }

        let x_velocity = Math.trunc(Math.random() * 1 + 1) * multiplier_x;
        let y_velocity = Math.trunc(Math.random() * 1 + 1) * multiplier_y;

        let classification = options[current_index];
        if (current_index != 2){
            current_index += 1
        } else {
            current_index = 0;
        }

        let block = new Block(x_coord, y_coord, x_velocity, y_velocity, classification);

        blocks.push(block);
    }
}
// Moving the blocks around the screen
function moveRectangle(blocks){

    // Checking to see if the blocks are colliding with the borders of the canvas
    blocks.forEach(block => {
        if (block.getX() + 20 < canvas.width && block.getX() > 0){
            block.setX(block.getX() + block.getXVel());
        } else{
            // This bit of code should hopefully prevent any blocks from getting stuck in the walls
            if (block.getX() + 20 >= canvas.width){
                block.setX(canvas.width - 20);
            } else {
                block.setX(0);
            }

            block.setXVelocity(-block.getXVel());
            block.setX(block.getX() + block.getXVel());
        }

        if (block.getY() + 20 < canvas.height && block.getY() > 0){
            block.setY(block.getY() + block.getYVel());
        } else{
            // This bit of code should prevent any blocks from getting stuck at the top or bottom of the screen
            if (block.getY() + 20 >= canvas.height){
                block.setY(canvas.height - 20);
            } else {
                block.setY(0);
            }
            block.setYVelocity(-block.getYVel());
            block.setY(block.getY() + block.getYVel());
        }
    })

    // Need to order the x and y positions of each block
    let x_positions = {};

    for (let i = 0; i < blocks.length; i++){
        x_positions["x_position" + i] = blocks[i].getX();
    }
    
    for (let i = 0; i < blocks.length; i++){
        let current_x = blocks[i].getX();
        let current_y = blocks[i].getY();

        for (let j = 0; j < blocks.length; j++){
            if (j != i ){
                let new_x = blocks[j].getX();
                let new_y = blocks[j].getY();

                // Checking to see if the blocks are colliding 
                if (Math.abs(new_x - current_x) <= 25 && Math.abs(new_y - current_y) <= 25){
                    // Need to switch based on the results 
                    if (blocks[i].getClassification() == "rock" && blocks[j].getClassification() == "paper"){
                        blocks[i].setClassification("paper");
                    } else if (blocks[i].getClassification() == "rock" && blocks[j].getClassification() == "scissors"){
                        blocks[j].setClassification("rock");
                    }

                    if (blocks[i].getClassification() == "paper" && blocks[j].getClassification() == "scissors"){
                        blocks[i].setClassification("scissors");
                    } else if (blocks[i].getClassification() == "paper" && blocks[j].getClassification() == "rock"){
                        blocks[j].setClassification("paper");
                    }

                    if (blocks[i].getClassification() == "scissors" && blocks[j].getClassification() == "paper"){
                        blocks[i].setClassification("scissors");
                    } else if (blocks[i].getClassification() == "scissors" && blocks[j].getClassification() == "rock"){
                        blocks[j].setClassification("rock");
                    }

                    if (blocks[j].getClassification() == "rock" && blocks[i].getClassification() == "paper"){
                        blocks[j].setClassification("paper");
                    } else if (blocks[j].getClassification() == "rock" && blocks[i].getClassification() == "scissors"){
                        blocks[i].setClassification("rock");
                    }

                    if (blocks[j].getClassification() == "paper" && blocks[i].getClassification() == "scissors"){
                        blocks[j].setClassification("scissors");
                    } else if (blocks[j].getClassification() == "paper" && blocks[i].getClassification() == "rock"){
                        blocks[i].setClassification("paper");
                    }

                    if (blocks[j].getClassification() == "scissors" && blocks[i].getClassification() == "paper"){
                        blocks[j].setClassification("scissors");
                    } else if (blocks[j].getClassification() == "scissors" && blocks[i].getClassification() == "rock"){
                        blocks[i].setClassification("rock");
                    }

                    // Perfectly elastic collision
                    let tempx = blocks[i].getXVel();
                    let tempy = blocks[i].getYVel();

                    blocks[i].setXVelocity(blocks[j].getXVel());
                    blocks[i].setYVelocity(blocks[j].getYVel())

                    blocks[j].setXVelocity(tempx);
                    blocks[j].setYVelocity(tempy);

                    blocks[i].setX(blocks[i].getX() + blocks[i].getXVel());
                    blocks[i].setY(blocks[i].getY() + blocks[i].getYVel());

                    blocks[j].setX(blocks[j].getX() + blocks[j].getXVel());
                    blocks[j].setY(blocks[j].getY() + blocks[j].getYVel());
                }
            }
        }

        // Checking to see if a specific block has won
        let winning = true;
        for (let x = 0; x < blocks.length - 1; x++){
            if (blocks[x].getClassification() != blocks[x + 1].getClassification()){
                winning = false;
            }
        }
        
        // Printing a victory message if a specific block has won and stopping all movement
        if (winning){
            let classification = blocks[0].getClassification();
            document.getElementById("blockRange").disabled = false;

            document.getElementById("victory-message").innerHTML = classification[0].toUpperCase() + classification.slice(1) + " wins!";
            for (let z = 0; z < blocks.length; z++){
                blocks[z].setXVelocity(0);
                blocks[z].setYVelocity(0);
            }

            if (incrementCount == 0){
                if (playerBet == classification){
                    currentBalance += 100;
                    // Should set the betting timer message to notify the user if they won and if so, how much did they win
                    document.getElementById("win-or-not").innerHTML = "You bet correctly, you have won $100! Your current balance has now been updated. ";
                } else if (playerBet == "") {
                    continue;
                } else {
                    currentBalance -= 100;
                    document.getElementById("win-or-not").innerHTML = "You bet incorrectly unfortunately, you have lost $100, better luck next time. Your current balance has now been updated. ";
                }

                incrementCount += 1;
                document.getElementById("currentBalance").innerHTML = "$" + currentBalance;
            }

        }
    }

}

function compareNumbers(a, b){
    // Not really sure why this function is here, but it's just nice to have I suppose. 
    return a - b;
}

function assignBet(bet){
    playerBet = bet;
    document.getElementById("betting-button-rock").disabled = "disabled";
    document.getElementById("betting-button-paper").disabled = "disabled";
    document.getElementById("betting-button-scissors").disabled = "disabled";
    document.getElementById("betting-button-" + bet).style.backgroundColor = "lightgray";
    // Need to disable the range as well
    document.getElementById("blockRange").disabled = true;
}

function getKeyByValue(object, value){
    return Object.keys(object).find(key => object[key] === value);
}

// Drawing the rectangles at each update of the screen
function drawRectangle(){
    bettingTime -= 10;
    if (bettingTime >= 0 && bettingTime % 1000 == 0){
        document.getElementById("betting-timer").innerHTML = "Betting will close in " + ((bettingTime - bettingTime % 1000) / 1000) + " seconds.";
    } else if (bettingTime < 0){
        document.getElementById("betting-timer").innerHTML = "Betting is now closed. Please wait until the next round";
        document.getElementById("betting-button-rock").disabled = "disabled";
        document.getElementById("betting-button-paper").disabled = "disabled";
        document.getElementById("betting-button-scissors").disabled = "disabled";
        // Need to disable the range
        document.getElementById("blockRange").disabled = true;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#666";


    blocks.forEach(block =>{
        var image = new Image();

        if (colour == "default"){
            image.src = "Graphics/" + block.getClassification() + ".png";

        } else {
            image.src = "Graphics/" + block.getClassification() + colour + ".png";
        }

        ctx.drawImage(image, block.getX(), block.getY(), 20, 20)

    }

    );
    moveRectangle(blocks);
}

// Refreshing the screen every 10 ms
setInterval(function(){drawRectangle()}, 10);

//========================================================================= GENERAL JS ============================================================================
var slider = document.getElementById("blockRange");
var initialAmount = slider.value;
createBlocks(initialAmount);
changeColour(colour);
document.getElementById("numberOfBlocks").style.color = colour;


slider.oninput = function(){
    // Setting increment count to 0
    incrementCount = 0;
    // Setting the timer back to 5 seconds
    bettingTime = 5000;
    document.getElementById("betting-button-rock").disabled = false;
    document.getElementById("betting-button-rock").style.backgroundColor = "white";
    document.getElementById("betting-button-paper").disabled = false;
    document.getElementById("betting-button-paper").style.backgroundColor = "white";
    document.getElementById("betting-button-scissors").disabled = false;
    document.getElementById("betting-button-scissors").style.backgroundColor = "white";
    document.getElementById("victory-message").innerHTML = "";
    document.getElementById("win-or-not").innerHTML = "";

    // Need to check if the player's balance is enough to actually play again
    if (currentBalance >= 100){
        createBlocks(this.value);
    } else {
        document.getElementById("betting-timer").innerHTML = "You unfortunately do not have the appropriate funds to bet anymore. You can either watch without betting, or you can refresh the page to get your funds back again. ";
        document.getElementById("blockRange").disabled = true;
        document.getElementById("betting-button-rock").disabled = "disabled";
        document.getElementById("betting-button-paper").disabled = "disabled";
        document.getElementById("betting-button-scissors").disabled = "disabled";
    }
    document.getElementById("numberOfBlocks").innerHTML = this.value + " blocks!";
}

function changeColour(newColour){
    colour = newColour;
    
    switch(colour){
        case "orange":
            document.body.style.backgroundColor = "rgb(250, 213, 165)";
            document.getElementById("numberOfBlocks").style.color = colour;
            break;
        case "red":
            document.body.style.backgroundColor = "rgb(255, 99, 71)";
            document.getElementById("numberOfBlocks").style.color = colour;
            break;
        case "blue":
            document.body.style.backgroundColor = "rgb(0, 191, 255)";
            document.getElementById("numberOfBlocks").style.color = colour;
            break;
        case "yellow":
            document.body.style.backgroundColor = "rgb(250, 250, 210)";
            document.getElementById("numberOfBlocks").style.color = colour;
            break;
        case "default":
            document.body.style.backgroundColor = "white";
            document.getElementById("numberOfBlocks").style.color = "black";

    }
}