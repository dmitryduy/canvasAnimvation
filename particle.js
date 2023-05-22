import HelperManager from "./helperManager.js";

export default class Particle {
  lifeOfParticle = null;
  type = null;
  isEncounter = null;

  constructor(radius, isRandomColor, stepSpeed, lifeOfParticle, color, type) {
    this.radius = radius;
    this.lifeOfParticle = lifeOfParticle;
    this.type = type;
    this.speed = stepSpeed;

    [this.x, this.y] = HelperManager.getCoordsInWindow(this.radius);
    this.setRandomDirection();
    this.color = isRandomColor ? HelperManager.getRandomColor() : color;
  }

  changeDirection(isInfiniteLife) {
    if (this.isEncounter !== null && this.isEncounter) {
      this.isEncounter = false;
    } else if (this.isEncounter !== null) {
      this.isEncounter = null;
      this.setRandomDirection();
    }

    this.x += this.directionX;
    this.y += this.directionY;

    const [isXAvailable, isYAvailable] = HelperManager.isAvailableCoordsInWindow(this.radius, this.getCoords());

    !isXAvailable && (this.directionX *= -1);
    !isYAvailable && (this.directionY *= -1);

    if (!isInfiniteLife) {
      this.radius -= this.radius / (this.lifeOfParticle + Math.random() * this.lifeOfParticle);
    }
  }

  updateDirectionByQuadrant(quadrant) {
    const [isXAvailable, isYAvailable] = HelperManager.isAvailableCoordsInWindow(this.radius, this.getCoords());
    const multiplyByQuadrant = [[-1, 1], [1, 1], [1, -1], [-1, -1]];

    isXAvailable && (this.directionX = multiplyByQuadrant[quadrant - 1][0] * Math.abs(this.directionX));
    isYAvailable && (this.directionY = multiplyByQuadrant[quadrant - 1][1] * Math.abs(this.directionY));
  }

  updateDirectionToPoint(pointCoords) {
    const [pointX, pointY] = pointCoords;
    const time = HelperManager.computeDistance(pointCoords, this.getCoords()) / this.speed;

    this.isEncounter = true;

    this.directionX = (pointX - this.x) / time;
    this.directionY = (pointY - this.y) / time;
  }

  setRandomDirection() {
    this.directionX = this.speed * Math.random();
    this.directionY = this.speed * Math.random();
  }

  getCoords() {
    return [this.x, this.y];
  }
}