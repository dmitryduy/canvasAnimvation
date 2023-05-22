import Canvas from "./canvas.js";
import Particle from "./particle.js";
import Mouse from "./mouse.js";
import HelperManager from "./helperManager.js";

export default class World {
  particles = [];
  requestAnimationId = null;
  canvasInstance = null;
  mouseInstance = null;
  options = {
    isRandomParticleRadius: true,
    isRandomParticleColor: false,
    isSquare: false,
    isTriangle: false,
    isCircle: true,
    isMouseRepulsion: true,
    isMouseEncounter: false,
    isInfiniteLine: false,
    isInfiniteLife: false,
    maxParticleRadius: 10,
    countOfParticles: 50,
    maxLengthOfLine: 300,
    lifeOfParticle: 1000,
    lineWidth: 1,
    minParticleRadius: 5,
    speed: 2,
    mouseRepulsion: 50,
    mouseEncounter: 50,
    destroyParticleIn: 1,
    particleColor: '#BF3030',
    bgColor: '#030101',
    lineColor: '#BF3030',
  }

  constructor(options) {
    if (World._instance) {
      World._instance.setOptions(options);
      return World._instance;
    }
    World._instance = this;

    this.canvasInstance = new Canvas('.canvas');
    this.canvasInstance.setSize(window.innerWidth, window.innerHeight);

    this.mouseInstance = new Mouse();

    this.setOptions(options);
  }

  setOptions(options) {
    this.options = {...this.options, ...options};
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.options.countOfParticles; i++) {
      this.createParticle();
    }
  }

  createParticle() {
    const radius = this.options.isRandomParticleRadius
      ? this.options.maxParticleRadius * Math.random() + this.options.minParticleRadius
      : this.options.maxParticleRadius;

    this.particles.push(new Particle(
      radius,
      this.options.isRandomParticleColor,
      this.options.speed,
      this.options.lifeOfParticle,
      this.options.particleColor,
      this.getParticleType()));
  }

  drawLines() {
    for (let i of this.particles) {
      for (let j of this.particles) {
        if (i === j) {
          continue;
        }

        const distance = HelperManager.computeDistance(i.getCoords(), j.getCoords());
        const maxLengthOfLine = this.options.isInfiniteLine
          ? HelperManager.computeDistance(window.innerHeight, window.innerWidth)
          : this.options.maxLengthOfLine;

        const lineWidth = this.options.lineWidth - distance * this.options.lineWidth / maxLengthOfLine;

        if (this.options.isInfiniteLine) {
          this.canvasInstance.drawLine(this.options.lineColor, lineWidth, i.getCoords(), j.getCoords());
          continue;
        }

        if (distance <= this.options.maxLengthOfLine) {
          this.canvasInstance.drawLine(this.options.lineColor, lineWidth, i.getCoords(), j.getCoords());
        }
      }
    }
  }

  getAvailableParticleTypes() {
    const availableTypes = [];

    if (this.options.isCircle) {
      availableTypes.push('circle');
    }
    if (this.options.isSquare) {
      availableTypes.push('square');
    }
    if (this.options.isTriangle) {
      availableTypes.push('triangle');
    }

    return availableTypes;
  }

  getParticleType() {
    const availableTypes = this.getAvailableParticleTypes();
    return availableTypes[Math.floor(Math.random() * availableTypes.length)];
  }

  destroyAndCreateParticle(index) {
    this.particles.splice(index, 1);
    this.createParticle();
  }

  drawParticles() {
    this.particles.forEach((particle, index) => {
      if (this.options.isMouseRepulsion
        && this.isMouseInBounds(particle.getCoords(), particle.radius + this.options.mouseRepulsion)) {
        particle.updateDirectionByQuadrant(HelperManager.getQuadrant(this.mouseInstance.getCoords(), particle.getCoords()));
      }

      if (this.options.isMouseEncounter
        && this.isMouseInBounds(particle.getCoords(), particle.radius + this.options.mouseEncounter)) {
        particle.updateDirectionToPoint(this.mouseInstance.getCoords());
      }

      particle.changeDirection(this.options.isInfiniteLife);

      if (!this.options.isInfiniteLife && particle.radius <= this.options.destroyParticleIn) {
        this.destroyAndCreateParticle(index);
        return;
      }

      const drawer = this.getDrawerByParticleType(particle.type);
      drawer(particle.color, particle.getCoords(), particle.radius);
    });
  }

  getDrawerByParticleType(type) {
    const canvasInstance = this.canvasInstance;
    switch (type) {
      case 'circle':
        return canvasInstance.drawCircle.bind(canvasInstance);
      case 'square':
        return canvasInstance.drawSquare.bind(canvasInstance);
      case 'triangle':
        return canvasInstance.drawTriangle.bind(canvasInstance);
      default:
        return canvasInstance.drawCircle.bind(canvasInstance);
    }
  }

  startAnimate() {
    this.canvasInstance.clear();
    this.drawLines();
    this.drawParticles();
    this.requestAnimationId = requestAnimationFrame(this.startAnimate.bind(this));
  }

  isMouseInBounds(particleCoords, availableRadius) {
    return HelperManager.computeDistance(this.mouseInstance.getCoords(), particleCoords) <= availableRadius;
  }

  startLife() {
    this.canvasInstance.setBackgroundColor(this.options.bgColor);
    this.createParticles();
    requestAnimationFrame(this.startAnimate.bind(this));
  }

  getCanvas() {
    return this.canvasInstance;
  }

  restartLife(options) {
    cancelAnimationFrame(this.requestAnimationId);
    this.setOptions(options);
    this.startLife();
  }
}
