export default class Mouse {
  posX = null;
  posY = null;

  constructor() {
    window.addEventListener('mousemove', (e) => {
      this.posX = e.clientX;
      this.posY = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      this.posY = -Infinity;
      this.posX = -Infinity;
    })
  }

  getCoords() {
    return [this.posX, this.posY];
  }
}