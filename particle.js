export default class Particle {
  circleColor = ["#BF3030", "#33CCCC", "#679B00", "#9FEE00", "#FF4040"];
  // сколько времени должен жить круг
  lifeOfParticle = null;

  constructor(radius, isRandomColor, stepSpeed, lifeOfParticle) {
    // устанавливаем радиус и время жизни круга
    this.radius = radius;
    this.lifeOfParticle = lifeOfParticle;
    //устанавливаем начальные координаты круга рандомно
    this.x = Math.floor((window.innerWidth - this.radius * 2) * Math.random() + this.radius);
    this.y = Math.floor((innerHeight - this.radius * 2) * Math.random() + this.radius);
    // устанавливаем направление, по которому будет идти круг
    this.directionX = stepSpeed * Math.random();
    this.directionY = stepSpeed * Math.random();
    // устанавливаем цвет круга. Если isRandomColor = true, то цвет берется рандомно из массива, в противном случае берется первый цвет в массиве
    this.color = isRandomColor ? this.circleColor[Math.floor(this.circleColor.length * Math.random())] : this.circleColor[0];
  }
  // функция изменение направления. Просто математические формулы
  changeDirection(isInfiniteLife) {
    this.x += this.directionX;
    this.y += this.directionY;
    this.x >= window.innerWidth - this.radius || this.x <= this.radius ? this.directionX *= -1 : this.directionX;
    this.y >= window.innerHeight - this.radius || this.y <= this.radius ? this.directionY *= -1 : this.directionY;
    // если isInfiniteLife = false, то радиус круга потихоньку уменьшается
    if (!isInfiniteLife) {
      this.radius-= this.radius / this.lifeOfParticle;
    }
  }
}