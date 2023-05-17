import Canvas from "./canvas.js";
import Particle from "./particle.js";

export default class World {
  // массив кругов на карте
  particles = [];
  // идентификатор анимации. Нужен, чтобы останавливать и обновлять анимацию
  requestAnimationId = null;
  // инстанс класса Canvas
  canvasInstance = null;
  // опции
  options = {
    // надо ли ставить радиус круга рандомно
    isRandomParticleRadius: true,
    // максимальный радиус круга, или если isRandomParticleRadius=false, то радиус всех кругов
    maxParticleRadius: 10,
    // количество частиц на поле
    countOfParticles: 10,
    // бесонечная ли линия между
    isInfiniteLine: false,
    // максимальная длина линии между двумя кругами
    maxLengthOfLine: 300,
    // надо ли выбирать цвет кругов рандомно
    isRandomParticleColor: false,
    // бесконечная ли жизнь круго? Если false, то круги потихоньку уменьшаются
    isInfiniteLife: false,
    // время жизни круга, если isInfiniteLife=false
    lifeOfParticle: 1000,
    // скорость передвижения кругов
    speed: 10,
  }

  constructor(options) {
    // Синглтон. Это паттерн, который не дает создавать более одно инстанса класса
    if (World._instance) {
      World._instance.setOptions(options);
      return World._instance;
    }
    World._instance = this;
    // создаем инстанс класса Canvas и устанавливаем размеры канваса
    this.canvasInstance = new Canvas('.canvas');
    this.canvasInstance.setSize(window.innerWidth, window.innerHeight);
    // устанавливаем опции
    this.setOptions(options);
  }

  setOptions(options) {
    this.options = {...this.options, ...options};
  }

  // создаем круги
  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.options.countOfParticles; i++) {
      this.particles.push(this.createParticle());
    }
  }

  createParticle() {
    // в зависимости от опции isRandomParticleRadius ставим радиус круга рандомно или фиксированно
    const radius = this.options.isRandomParticleRadius
      ? this.options.maxParticleRadius * Math.random() + 1
      : this.options.maxParticleRadius;

    // возвращаем инстанс Particle
    return new Particle(
      radius,
      this.options.isRandomParticleColor,
      this.options.speed,
      this.options.lifeOfParticle);

  }
  // функция рисования линии
  drawLines() {
    // пробегаемся по всем парам кругов и считаем расстояния между ними
    for (let i of this.particles) {
      for (let j of this.particles) {
        // это формула расстояния между двумя кругами на декартовой плоскости
        let dist = Math.sqrt((i.x - j.x) ** 2 + (i.y - j.y) ** 2);
        const from = [i.x, i.y];
        const to = [j.x, j.y];
        // это высчитываем длину линии. Чем дальше круги друг от друга, тем тоньше будет линия между ними
        const lineWidth = 1 - dist / this.options.maxLengthOfLine;
        // если у нас бесконечные линии, то рисуем линии между всеми кругами
        if (this.options.isInfiniteLine) {
          this.canvasInstance.drawLine(lineWidth, from, to);
          continue;
        }
        // если у нас опция isInfiniteLine=false, то рисуем линии только между теми кругами, расстояние между которыми меньше maxLengthOfLine
        if (dist <= this.options.maxLengthOfLine && i !== j) {
          this.canvasInstance.drawLine(lineWidth, from, to);
        }

      }
    }
  }
  // рисует кругами
  drawParticles() {
    // пробегаемся по всем кругам
    this.particles.forEach((particle, index) => {
      // функция в классе Particle, которая решает, куда направляться кругу
      particle.changeDirection(this.options.isInfiniteLife);
      // Если у нас задана опция, что круги не имеют бесконечной жизни, то когда радиус круга становится меньше 1, он удаляется и создается новый в рандомном месте
      if (!this.options.isInfiniteLife && particle.radius <= 1) {
        this.particles.splice(index, 1);
        this.particles.push(this.createParticle());
      }
      this.canvasInstance.drawCircle(particle.color, [particle.x, particle.y], particle.radius);
    });
  }
  // функция начала анимации(вызывается постоянно с частотой обновления экрана
  startAnimate() {
    // очищаем канвас с предыдущего кадра
    this.canvasInstance.clear();
    // перерисовываем круги и линии
    this.drawParticles();
    this.drawLines();
    // заного запускаем эту функцию. requestAnimationFrame - это штука вызвает startAnimate каждый раз, когда происходит обновление экрана
    // Похожа на setInterval, но она запускается именно с обновлением экрана
    this.requestAnimationId = requestAnimationFrame(this.startAnimate.bind(this));
  }
  // функция запуска всего приложения
  startLife() {
    this.createParticles();
    requestAnimationFrame(this.startAnimate.bind(this));
  }

  getCanvas() {
    return this.canvasInstance;
  }
  // функция обновления анимации. Удаляет предыдущую анимацию, устанавливает новые опции и запускает новую анимацию
  restartLife(options) {
    cancelAnimationFrame(this.requestAnimationId);
    this.setOptions(options);
    this.startLife();
  }
}
