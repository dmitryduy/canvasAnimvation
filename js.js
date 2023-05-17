import World from "./world.js";

// функция, которая возвращает дом узел по его классу
const getDOMElement = (className) => document.querySelector(className);

// функция создания листенера на числовые инпуты
// element - элемент инпута; option - опция, которую этот инпут меняте(название, как в классе world); maxValue, minValue - максимальное и минимальное значение данно опции
const createNumberListener = (element, option, maxValue=Infinity, minValue=-Infinity) => {
  element.addEventListener('input', (e) => {
    const value = +e.target.value;
    if (value > maxValue || !value || value < minValue) {
      return;
    }
    // перезапускаем приложение с новыми опциями
    world.restartLife({[option]: value});
  });
}

// функция создания листенера на checkbox
// element - элемент инпута; option - опция, которую этот инпут меняте(название, как в классе world)
const createCheckboxListener = (element, option) => {
  element.addEventListener('change', (e) => {
    world.restartLife({[option]: e.target.checked});
  });
}

createNumberListener(getDOMElement('.particles-count'), 'countOfParticles', 100, 1);
createNumberListener(getDOMElement('.line-length'), 'maxLengthOfLine');
createNumberListener(getDOMElement('.particles-speed'), 'speed', 150, 1);
createNumberListener(getDOMElement('.particles-life'), 'lifeOfParticle', 1000, 50);
createNumberListener(getDOMElement('.max-particles-radius'), 'maxParticleRadius', 150, 5);

createCheckboxListener(getDOMElement('.random-radius'), 'isRandomParticleRadius');
createCheckboxListener(getDOMElement('.is-infinite-line'), 'isInfiniteLine');
createCheckboxListener(getDOMElement('.random-colors'), 'isRandomParticleColor');
createCheckboxListener(getDOMElement('.is-particles-infinite-life'), 'isInfiniteLife');

const world = new World();
// Получаем инстанс класса Canvas
const canvas = world.getCanvas();

// вешаем обработки на виндоу, чтобы при изменении размера экрана, канвас перерисовывался на весь экран
window.addEventListener('resize', () => {
  // Функция в классе Canvas
  canvas.setSize(window.innerWidth, window.innerHeight);
});

// функция в классе World. Запускает анимацию
world.startLife();
