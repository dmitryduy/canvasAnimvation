export default class Particle {
  speedStep = 3;
  circleColor= ["#BF3030", "#33CCCC", "#679B00", "#9FEE00", "#FF4040"];
  constructor(radius) {
    this.radius = radius;

    this.x = Math.floor((window.innerWidth - this.radius * 2) * Math.random() + this.radius);
    this.y = Math.floor((innerHeight - this.radius * 2) * Math.random() + this.radius);
    this.directionX = this.speedStep * Math.random();
    this.directionY = this.speedStep * Math.random();
    this.color = this.circleColor[Math.floor(this.circleColor.length * Math.random())];
  }

  changeDirection() {
    this.x += this.directionX;
    this.y += this.directionY;
    this.x >= window.innerWidth - this.radius || this.x <= this.radius ? this.directionX *= -1 : this.directionX;
    this.y >= window.innerHeight - this.radius || this.y <= this.radius ? this.directionY *= -1 : this.directionY;
  }
}