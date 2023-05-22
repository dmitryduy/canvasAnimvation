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
    const size = radius * 2;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(coords[0] - size / 2, coords[1] - size / 2, size, size);
  }

  drawRhombus(color, coords, radius) {
    this.drawPolygon(4, color, coords, radius);
  }

  drawPolygon(sizes, color, coords, radius) {
    this.ctx.fillStyle = color;

    this.ctx.beginPath();
    this.ctx.moveTo(coords[0], coords[1]);
    for (let i = 0; i <= sizes; i++) {
      const x = coords[0] + radius * Math.cos(2 * i * Math.PI / sizes - Math.PI / 2);
      const y = coords[1] + radius * Math.sin(2 * i * Math.PI / sizes - Math.PI / 2);
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