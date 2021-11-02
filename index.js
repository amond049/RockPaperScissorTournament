var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");

var blocks = [];


// Need to create an array of blocks
class Block {
    constructor(x, y, x_vel, y_vel){
        this.x_coordinate = x;
        this.y_coordinate = y;
        this.x_velocity = x_vel;
        this.y_velocity = y_vel;
    }

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

for (let i = 0; i < 4; i++){
    let x_coord = Math.trunc(Math.random() * (canvas.width - 20) + 1);
    let y_coord = Math.trunc(Math.random() * (canvas.height - 20) + 1);
    let x_velocity = Math.trunc(Math.random() * 1 + 1);
    let y_velocity = Math.trunc(Math.random() * 1 + 1);
    let block = new Block(x_coord, y_coord, x_velocity, y_velocity);

    blocks.push(block);
}

function moveRectangle(blocks){
    
    blocks.forEach(block => {
        if (block.getX() + 20 < canvas.width && block.getX() > 0){
            block.setX(block.getX() + block.getXVel());
        } else{
            block.setXVelocity(-block.getXVel());
            block.setX(block.getX() + block.getXVel());
        }
    
        if (block.getY() + 20 < canvas.height && block.getY() > 0){
            block.setY(block.getY() + block.getYVel());
        } else{
            block.setYVelocity(-block.getYVel());
            block.setY(block.getY() + block.getYVel());
        }
    })
    for (let i = 0; i < blocks.length; i++){
        let current_x = blocks[i].getX();
        let current_y = blocks[i].getY();
        
        //console.log("The current x position of block " + (i+1));
        //console.log(current_x);

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

function drawRectangle(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#666";
    
    blocks.forEach(block => ctx.fillRect(block.getX(), block.getY(), 20, 20));
    moveRectangle(blocks);
}

setInterval(function(){drawRectangle()}, 10);


