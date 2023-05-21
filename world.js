import Canvas from "./canvas.js";
import Particle from "./particle.js";
import { Mouse } from "./mouse.js";

export default class World {
  particles = [];
  requestAnimationId = null;
  canvasInstance = null;
  mouseInstance = null;
  options = {
    isRandomParticleRadius: true,
    maxParticleRadius: 10,
    countOfParticles: 50,
    isInfiniteLine: false,
    maxLengthOfLine: 300,
    isRandomParticleColor: false,
    isInfiniteLife: false,
    lifeOfParticle: 1000,
    lineWidth: 1,
    lineColor: '#BF3030',
    minParticleRadius: 5,
    speed: 2,
    particleColor: '#BF3030',
    bgColor: '#030101',
    isSquare: false,
    isTriangle: false,
    isCircle: true,
    isMouseRepulsion: true,
    mouseRepulsion: 50,
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
      this.getRandomParticleType()));
  }

  drawLines() {
    for (let i of this.particles) {
      for (let j of this.particles) {
        if (i === j) {
          continue;
        }

        let dist = Math.sqrt((i.x - j.x) ** 2 + (i.y - j.y) ** 2);
        const from = [i.x, i.y];
        const to = [j.x, j.y];
        const maxLengthOfLine = this.options.isInfiniteLine
          ? Math.sqrt(window.innerHeight ** 2 + window.innerWidth ** 2)
          : this.options.maxLengthOfLine;

        const lineWidth = this.options.lineWidth - dist * this.options.lineWidth / maxLengthOfLine;

        if (this.options.isInfiniteLine) {
          this.canvasInstance.drawLine(this.options.lineColor, lineWidth, from, to);
          continue;
        }

        if (dist <= this.options.maxLengthOfLine && i !== j) {
          this.canvasInstance.drawLine(this.options.lineColor, lineWidth, from, to);
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
      availableTypes.push('square')
    }
    if (this.options.isTriangle) {
      availableTypes.push('triangle');
    }

    return availableTypes;
  }

  getRandomParticleType() {
    const availableTypes = this.getAvailableParticleTypes();
    return availableTypes[Math.floor(Math.random() * availableTypes.length)];
  }

  destroyAndCreateParticle(index) {
    this.particles.splice(index, 1);
    this.createParticle();
  }

  drawParticles() {
    this.particles.forEach((particle, index) => {
      const particleCoords = [particle.x, particle.y];

      if (this.options.isMouseRepulsion && this.isMouseInBounds(particleCoords, particle.radius)) {
        particle.updateDirectionByQuadrant(this.getQuadrant(this.mouseInstance.getCoords(), particleCoords));
      }

      particle.changeDirection(this.options.isInfiniteLife);

      if (!this.options.isInfiniteLife && particle.radius <= 1) {
        this.destroyAndCreateParticle(index);
        return;
      }

      const particleInfo = [particle.color, [particle.x, particle.y], particle.radius];

      const drawer = this.getDrawerByParticleType(particle.type);
      drawer(...particleInfo);
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

  isMouseInBounds(particleCoords, particleRadius) {
    const availableRadius = particleRadius + this.options.mouseRepulsion;
    const [mouseX, mouseY] = [this.mouseInstance.posX, this.mouseInstance.posY];
    const [particleX, particleY] = particleCoords;
    const dist = Math.sqrt((mouseY - particleY) ** 2 + (mouseX - particleX) ** 2);

    return dist <= availableRadius;
  }

  getQuadrant(pointCoords, centerCoords) {
    const [pointX, pointY] = pointCoords;
    const [centerX, centerY] = centerCoords;

    if (pointX >= centerX && pointY <= centerY) {
      return 1;
    }
    if (pointX <= centerX && pointY <= centerY) {
      return 2;
    }
    if (pointX <= centerX && pointY >= centerY) {
      return 3;
    }
    return 4;
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
