class Car{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.friction = 0.05;
        this.angle = 0;

        this.controls = new Controls();
    }

    #move(){
         // -----------------Going forward and backwards--------------------
        // adding acceleration to go forward
        if(this.controls.forward){
            this.speed += this.acceleration;
        }
        // acceleration to reverse
        if(this.controls.reverse){
            this.speed -= this.acceleration;
        }
        // setting the maximum forward and reverse speeds
        if(this.speed > this.maxSpeed){
            this.speed = this.maxSpeed;
        }
        if(this.speed < -this.maxSpeed/2){
            this.speed = -this.maxSpeed/2;
        }
        // making the car slow down
        if(this.speed > 0){
            this.speed -= this.friction;
        }
        if(this.speed < 0){
            this.speed += this.friction;
        }
        if(Math.abs(this.speed) < this.friction){
            this.speed = 0;
        }
        // -------------------Going left and right------------------------
        if(this.speed != 0){
            // if speed is greater than 0, set flip to 1, else set it to -1
            const flip = this.speed>0?1:-1;
            if(this.controls.left){
                this.angle += 0.03 * flip;
            }
            if(this.controls.right){
                this.angle -= 0.03 * flip;
            }
        }

        this.x -= Math.sin(this.angle)*this.speed;
        this.y -= Math.cos(this.angle)*this.speed;
    }

    
    update(){
       this.#move();
    }
    
    draw(ctx){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);
        
        ctx.beginPath();
        ctx.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
            );
        ctx.fill();

        ctx.restore();
    }
}