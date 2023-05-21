export default class Particle {
  lifeOfParticle = null;
  type = null;

  constructor(radius, isRandomColor, stepSpeed, lifeOfParticle, color, type) {
    this.radius = radius;
    this.lifeOfParticle = lifeOfParticle;
    this.type = type;
    this.speed = stepSpeed;

    this.x = Math.floor((window.innerWidth - this.radius * 2) * Math.random() + this.radius);
    this.y = Math.floor((innerHeight - this.radius * 2) * Math.random() + this.radius);
    this.setRandomDirection();
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

  updateDirectionByQuadrant(quadrant) {
    const isAvailableChangeX = !(this.x >= window.innerWidth - this.radius || this.x <= this.radius);
    const isAvailableChangeY = !(this.y >= window.innerHeight - this.radius || this.y <= this.radius);

    switch (quadrant) {
      case 1:
        isAvailableChangeX && (this.directionX = -Math.abs(this.directionX));
        isAvailableChangeY && (this.directionY = Math.abs(this.directionY));
        return;
      case 2:
        isAvailableChangeX && (this.directionX = Math.abs(this.directionX));
        isAvailableChangeY && (this.directionY = Math.abs(this.directionY));
        return;
      case 3:
        isAvailableChangeX && (this.directionX = Math.abs(this.directionX));
        isAvailableChangeY && (this.directionY = -Math.abs(this.directionY));
        return;
      case 4:
        isAvailableChangeX && (this.directionX = -Math.abs(this.directionX));
        isAvailableChangeY && (this.directionY = -Math.abs(this.directionY));
        return;
    }
  }

  updateDirectionToPoint(pointCoords) {
    const [pointX, pointY] = pointCoords;
    const time = (Math.sqrt((pointX - this.x) ** 2 + (pointY - this.y) ** 2)) / this.speed;
  
    this.directionX = (pointX - this.x) / time;
    this.directionY = (pointY - this.y) / time;
  }

  setRandomDirection() {
    this.directionX = this.speed * Math.random();
    this.directionY = this.speed * Math.random();
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