class Car{
    constructor(x, y, width, height, controlType, maxSpeed = 3){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = maxSpeed;
        this.friction = 0.05;
        this.angle = 0;
        this.damaged = false;

        if(controlType != "DUMMY"){
            this.sensor = new Sensor(this);
        }
        this.controls = new Controls(controlType);
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

    
    update(roadBorders, traffic){
        if (!this.damaged){
            this.#move();
            this.polygon = this.#createPolygon();
            // assessing the damage with the road borders and the traffic
            this.damaged = this.#assessDamage(roadBorders, traffic);
        }
        if(this.sensor){
            // making sure that the sensor perceives the traffic as well
            this.sensor.update(roadBorders, traffic);
        }
    }

    #assessDamage(roadBorders, traffic){
        // checking damage for road border intersection
        for(let i = 0; i < roadBorders.length; i++){
            if(polysIntersect(this.polygon, roadBorders[i])){
                return true;
            }
        }
        // checking damage for collisions with traffics
        for(let i = 0; i < traffic.length; i++){
            if(polysIntersect(this.polygon, traffic[i].polygon)){
                return true;
            }
        }
        return false;
    }

    #createPolygon(){
        const points = [];
        const rad = Math.hypot(this.width, this.height)/2;
        const alpha = Math.atan2(this.width, this.height);
        // top right point
        points.push({
            x: this.x - Math.sin(this.angle - alpha) * rad,
            y: this.y - Math.cos(this.angle - alpha) * rad
        });
        // top left point
        points.push({
            x: this.x - Math.sin(this.angle + alpha) * rad,
            y: this.y - Math.cos(this.angle + alpha) * rad
        });
        // bottom left point
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad
        });
        // bottom right point
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad
        });

        return points;
    }
    
    draw(ctx, color){
        if(this.damaged){
            ctx.fillStyle = 'gray';
        }
        else{
            ctx.fillStyle = color;
        }
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
        for(let i = 1; i < this.polygon.length; i++){
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }
        ctx.fill();
        if(this.sensor){
            this.sensor.draw(ctx);
        }
    }
}