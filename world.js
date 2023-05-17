import Canvas from "./canvas.js";
import Particle from "./particle.js";

export default class World {
  particles = [];
  requestAnimationId = null;
  canvasInstance = null;
  options = {
    isRandomParticleRadius: true,
    maxParticleRadius: 10,
    countOfParticles: 5,
    isInfiniteLine: false,
    maxLengthOfLine: 300,
  }

  constructor(options) {
    if (World._instance) {
      World._instance.setOptions(options);
      return World._instance;
    }
    World._instance = this;

    this.canvasInstance = new Canvas('.canvas');
    this.canvasInstance.setSize(window.innerWidth, window.innerHeight);

    this.setOptions(options);
  }

  setOptions(options) {
    this.options = {...this.options, ...options};
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.options.countOfParticles; i++) {
      this.particles.push(this.createParticle());
    }
  }

  createParticle() {
    if (this.options.isRandomParticleRadius) {
      return new Particle(this.options.maxParticleRadius * Math.random() + 1);
    }

    return new Particle(this.options.maxParticleRadius);
  }

  drawLines() {
    for (let i of this.particles) {
      for (let j of this.particles) {
        let dist = Math.sqrt((i.x - j.x) ** 2 + (i.y - j.y) ** 2);
        const from = [i.x, i.y];
        const to = [j.x, j.y];
        const lineWidth = 1 - dist / this.options.maxLengthOfLine;

        if (this.options.isInfiniteLine) {
          this.canvasInstance.drawLine(lineWidth, from, to);
          continue;
        }

        if (dist <= this.options.maxLengthOfLine && i !== j) {
          this.canvasInstance.drawLine(lineWidth, from, to);
        }

      }
    }
  }

  drawParticles() {
    this.particles.forEach((particle) => {
      particle.changeDirection();
      this.canvasInstance.drawCircle(particle.color, [particle.x, particle.y], particle.radius);
    });
  }

  startAnimate() {
    this.canvasInstance.clear();
    this.drawParticles();
    this.drawLines();
    this.requestAnimationId = requestAnimationFrame(this.startAnimate.bind(this));
  }

  startLife() {
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
