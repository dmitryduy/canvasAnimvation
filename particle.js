export default class Particle {
  circleColor = ["#BF3030", "#33CCCC", "#679B00", "#9FEE00", "#FF4040"];
  lifeOfParticle = null;
  startRadius = null;

  constructor(radius, isRandomColor, stepSpeed, lifeOfParticle) {
    this.radius = radius;
    this.startRadius = radius;
    this.lifeOfParticle = lifeOfParticle;

    this.x = Math.floor((window.innerWidth - this.radius * 2) * Math.random() + this.radius);
    this.y = Math.floor((innerHeight - this.radius * 2) * Math.random() + this.radius);
    this.directionX = stepSpeed * Math.random();
    this.directionY = stepSpeed * Math.random();
    this.color = isRandomColor ? this.circleColor[Math.floor(this.circleColor.length * Math.random())] : this.circleColor[0];
  }

  changeDirection(isInfiniteLife) {
    this.x += this.directionX;
    this.y += this.directionY;
    this.x >= window.innerWidth - this.radius || this.x <= this.radius ? this.directionX *= -1 : this.directionX;
    this.y >= window.innerHeight - this.radius || this.y <= this.radius ? this.directionY *= -1 : this.directionY;

    if (!isInfiniteLife) {
      this.radius-= this.radius / this.lifeOfParticle;
    }
  }
}