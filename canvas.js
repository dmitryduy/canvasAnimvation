export default class Canvas {
  canvas = null;
  ctx = null;
  lineColor= "#BF3030";

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

    this.canvas.style.background = '#030101';
  }

  drawLine(width, from, to) {
    this.ctx.lineWidth = width;
    this.ctx.strokeStyle = this.lineColor;

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

  setSize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}