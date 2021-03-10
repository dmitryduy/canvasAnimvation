const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

const E = .1;

canvas.width = width = window.innerWidth;
canvas.height = height = window.innerHeight;

//properties
const properties = {
    isRandomRadius:     true,
    particleRadius:     0,
    countOfParticles:   30,
    speedStep:          3,
    bgColor:            "#030101",
    lineColor:          "#FF7373",
    circleColor:        ["#BF3030", "#33CCCC", "#679B00", "#9FEE00" , "#FF4040"],
    isInfiniteLine:     false,
    maxLengthOfLine:    300,
    isInfiniteLife:     true,
    lifeOfParticle:     1000
};

class Particle {
    constructor() {
        // radius
        if (properties.isRandomRadius) this.radius = properties.particleRadius*Math.random() + 1;
        else this.radius = properties.particleRadius;

        this.x = Math.floor((width-this.radius*2)*Math.random() + this.radius);
        this.y = Math.floor((innerHeight-this.radius*2)*Math.random() + this.radius);
        this.directionX = properties.speedStep*Math.random();
        this.directionY = properties.speedStep*Math.random();
        this.color = properties.circleColor[Math.floor(properties.circleColor.length*Math.random())];
    }

    changeDirection() {
        this.x+= this.directionX;
        this.y+= this.directionY;
        this.x >= width - this.radius || this.x <= this.radius ? this.directionX*=-1 : this.directionX;
        this.y >= height - this.radius || this.y <= this.radius ? this.directionY*=-1 : this.directionY;
        if (!properties.isInfiniteLife) this.radius-= this.radius / properties.lifeOfParticle;
    }
}

const arrayOfParticles =[];

canvas.style.backgroundColor = properties.bgColor;

function drawParticles() {
    // clear canvas
    ctx.clearRect(0,0, width, height);

    arrayOfParticles.forEach((item, index) => {
        item.changeDirection();
        if (!properties.isInfiniteLife && item.radius <= 3) {
            arrayOfParticles.splice(index, 1);
            arrayOfParticles.push(new Particle());
        }
        // draw cirle
        ctx.beginPath();
        ctx.fillStyle = item.color;
        if (!properties.isRandomRadius) {
            ctx.arc(item.x, item.y, item.radius, 0, Math.PI*2);
        }
        else {
            ctx.arc(item.x, item.y, item.radius, 0, Math.PI*2);
        }
        ctx.fill();
        ctx.closePath();

    });
}

function drawLines() {
    for (let i of arrayOfParticles) {
        for (let j of arrayOfParticles) {
            // calculate distanation between particles
            let dist = Math.sqrt((i.x - j.x)**2 + (i.y - j.y)**2);

            //draw lines
            if (dist <= properties.maxLengthOfLine) ctx.lineWidth = 1 - dist/properties.maxLengthOfLine;
            else properties.isInfiniteLine ? ctx.lineWidth = 0.1: ctx.lineWidth = 0.001;

            ctx.strokeStyle = properties.lineColor;

            ctx.beginPath();
            ctx.moveTo(i.x, i.y);
            ctx.lineTo(j.x, j.y)
            ctx.stroke();
        }
    }
}


function startAnimate() {
    drawParticles();
    drawLines();
    requestAnimationFrame(startAnimate);
}

window.onresize = function () {
    canvas.width = width = window.innerWidth;
    canvas.height = height = window.innerHeight;
}

function createParticles() {
    for (let i = 0; i < properties.countOfParticles; i++) {
        arrayOfParticles.push(new Particle());
    }
}

createParticles();
requestAnimationFrame(startAnimate);




