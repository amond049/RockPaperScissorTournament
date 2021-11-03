// Creating the canvas and initializing it such that it can be drawn on
var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");

// An array that will contain all Block instances
var blocks = [];


// Creating a Block class that will be the type of all Rock, Papers and Scissors 
class Block {
    constructor(x, y, x_vel, y_vel){
        this.x_coordinate = x;
        this.y_coordinate = y;
        this.x_velocity = x_vel;
        this.y_velocity = y_vel;
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
}

// Generating all the blocks
// NEXT STEPS: MAKE IT SO THAT PEOPLE CAN ENTER HOW MANY BLOCKS THEY WOULD LIKE TO HAVE!
for (let i = 0; i < 15; i++){
    let x_coord = Math.trunc(Math.random() * (canvas.width - 20) + 1);
    let y_coord = Math.trunc(Math.random() * (canvas.height - 20) + 1);
    // NEXT STEPS: Make it so that the velocity can be either positive or negative 
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
    let block = new Block(x_coord, y_coord, x_velocity, y_velocity);

    blocks.push(block);
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

    // Checking to see if the blocks are colliding with each other. Not that efficient of a solution as it is O(n^2) algorithm, but I don't imagine 
    // overloading the application with so many blocks it won't be able to hand it all
    for (let i = 0; i < blocks.length; i++){
        let current_x = blocks[i].getX();
        let current_y = blocks[i].getY();
 
        for (let j = 0; j < blocks.length; j++){
            if (j != i ){
                let new_x = blocks[j].getX();
                let new_y = blocks[j].getY();
                
                
                if (Math.abs(new_x - current_x) <= 20 && Math.abs(new_y - current_y) <= 20){
                    
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
    }
}

// Drawing the rectangles at each update of the screen
function drawRectangle(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#666";
    
    blocks.forEach(block => ctx.fillRect(block.getX(), block.getY(), 20, 20));
    moveRectangle(blocks);
}

// Refreshing the screen every 10 ms
setInterval(function(){drawRectangle()}, 10);


