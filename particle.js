export default class Particle {
  lifeOfParticle = null;
  type = null;

  constructor(radius, isRandomColor, stepSpeed, lifeOfParticle, color, type) {
    this.radius = radius;
    this.lifeOfParticle = lifeOfParticle;
    this.type = type;

    this.x = Math.floor((window.innerWidth - this.radius * 2) * Math.random() + this.radius);
    this.y = Math.floor((innerHeight - this.radius * 2) * Math.random() + this.radius);
    this.directionX = stepSpeed * Math.random();
    this.directionY = stepSpeed * Math.random();
    this.color = isRandomColor ? this.getRandomColor() : color;
  }

  changeDirection(isInfiniteLife) {
    this.x += this.directionX;
    this.y += this.directionY;
    this.x >= window.innerWidth - this.radius || this.x <= this.radius ? this.directionX *= -1 : this.directionX;
    this.y >= window.innerHeight - this.radius || this.y <= this.radius ? this.directionY *= -1 : this.directionY;

    if (!isInfiniteLife) {
      this.radius -= this.radius / (this.lifeOfParticle + Math.random() * this.lifeOfParticle);
    }
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}