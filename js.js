import World from "./world.js";
import FormManager from "./formManager.js";

const world = new World();
const canvas = world.getCanvas();

window.addEventListener('resize', () => {
  canvas.setSize(window.innerWidth, window.innerHeight);
});

const formManager = new FormManager('.form', world);

formManager.createNumericInput(50, 'Количество частиц(макс 100):', 'countOfParticles', 1, 100);
formManager.createNumericInput(300, 'Максимальная длина линии(макс 2000):', 'maxLengthOfLine', 1, 2000);
formManager.createNumericInput(10, 'Максимальный радиус частицы(мин 5, макс 150):', 'maxParticleRadius', 5, 150);
formManager.createNumericInput(2, 'Скорость частицы(макс 20):', 'speed', 1, 20);
formManager.createNumericInput(1000, 'Длительность жизни частицы(мин 50, макс 1000):', 'lifeOfParticle', 50, 1000);
formManager.createNumericInput(1, 'Ширина линий. Если линии бесконечны(макс 20):', 'lineWidth', 1, 20);
formManager.createNumericInput(50, 'Зона отталкивания частиц. Если включено отталкивание(макс 500):', 'mouseRepulsion', 1, 500);
formManager.createNumericInput(50, 'Зона притягивания частиц. Если включено притягивание(макс 500):', 'mouseEncounter', 1, 500);
formManager.createNumericInput(1, 'Уничтожать частицу при радиусе:(макс 4):', 'destroyParticleIn', 1, 4);

formManager.createMusicCheckbox(false, 'Включить музыку', 'audio.mp3');

formManager.createCheckbox(false, 'Бесконечные линии', 'isInfiniteLine');
formManager.createCheckbox(true, 'Случайный радиус частицы', 'isRandomParticleRadius');
formManager.createCheckbox(false, 'Случайный цвет частицы', 'isRandomParticleColor');
formManager.createCheckbox(false, 'Бесконечная жизнь частицы', 'isInfiniteLife');
formManager.createCheckbox(true, 'Отталкивание от мышки', 'isMouseRepulsion');
formManager.createCheckbox(false, 'Притягивание к мыши', 'isMouseEncounter');
formManager.createCheckbox(true, 'Круги', 'isCircle');
formManager.createCheckbox(false, 'Ромбы', 'isRhombus');
formManager.createCheckbox(false, 'Квадраты', 'isSquare');
formManager.createCheckbox(false, 'Многоугольники', 'isPolygon');

formManager.createColor('#BF3030', 'Цвет частицы', 'particleColor');
formManager.createColor('#BF3030', 'Цвет линий', 'lineColor');
formManager.createColor('#030101', 'Цвет фона', 'bgColor');

world.startLife();
