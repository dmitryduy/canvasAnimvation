export default class Canvas {
  canvas = null;
  ctx = null;

  constructor(className) {
    if (Canvas._instance) {
      Canvas._instance.setCtx(className);
      return Canvas._instance;
    }
    Canvas._instance = this;
    this.setCtx(className);
  }

  setCtx(className) {
    this.canvas = document.querySelector(className);
    this.ctx = this.canvas.getContext('2d');
  }

  setBackgroundColor(color) {
    this.canvas.style.background = color;
  }

  drawLine(color, width, from, to) {
    this.ctx.lineWidth = width;
    this.ctx.strokeStyle = color;

    this.ctx.beginPath();
    this.ctx.moveTo(...from);
    this.ctx.lineTo(...to);

    this.ctx.stroke();
  }

  drawCircle(color, coords, radius) {
    this.ctx.beginPath();
    this.ctx.fillStyle = color;

    this.ctx.arc(...coords, radius, 0, Math.PI * 2);

    this.ctx.fill();
    this.ctx.closePath();
  }

  drawSquare(color, coords, radius) {
    const size = radius * Math.sqrt(2);
    this.ctx.fillStyle = color;
    this.ctx.fillRect(coords[0] - size/2, coords[1] - size/2, size, size);
  }

  drawTriangle(color, coords, radius) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(coords[0] + radius, coords[1]);
    for (let i = 1; i <= 3; i++) {
      const angle = i * (Math.PI * 2 / 3);
      const x = coords[0] + radius * Math.cos(angle);
      const y = coords[1] + radius * Math.sin(angle);
      this.ctx.lineTo(x, y);
    }
    this.ctx.closePath();
    this.ctx.fill();
  }

  setSize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}