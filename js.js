import World from "./world.js";


const getDOMElement = (selector) => document.querySelector(selector);

const createInputListener = (element, option, maxValue=Infinity, minValue=-Infinity) => {
  element.addEventListener('input', (e) => {
    const value = +e.target.value;
    if (value > maxValue || !value || value < minValue) {
      return;
    }
    world.restartLife({[option]: value});
  });
}

const createChangeListener = (element, option, targetField) => {
  element.addEventListener('change', (e) => {
    world.restartLife({[option]: e.target[targetField]});
  });
}

createInputListener(getDOMElement('.particles-count'), 'countOfParticles', 100, 1);
createInputListener(getDOMElement('.line-length'), 'maxLengthOfLine');
createInputListener(getDOMElement('.particles-speed'), 'speed', 150, 1);
createInputListener(getDOMElement('.particles-life'), 'lifeOfParticle', 1000, 50);
createInputListener(getDOMElement('.max-particles-radius'), 'maxParticleRadius', 150, 5);
createInputListener(getDOMElement('.line-width'), 'lineWidth', 20, 1);
createInputListener(getDOMElement('.repulsion'), 'mouseRepulsion', 500, 1);

createChangeListener(getDOMElement('.random-radius'), 'isRandomParticleRadius', 'checked');
createChangeListener(getDOMElement('.is-infinite-line'), 'isInfiniteLine', 'checked');
createChangeListener(getDOMElement('.random-colors'), 'isRandomParticleColor', 'checked');
createChangeListener(getDOMElement('.is-particles-infinite-life'), 'isInfiniteLife', 'checked');
createChangeListener(getDOMElement('.is-circle'), 'isCircle', 'checked');
createChangeListener(getDOMElement('.is-square'), 'isSquare', 'checked');
createChangeListener(getDOMElement('.is-triangle'), 'isTriangle', 'checked');
createChangeListener(getDOMElement('.color-particle-picker'), 'particleColor', 'value');
createChangeListener(getDOMElement('.color-line-picker'), 'lineColor', 'value');
createChangeListener(getDOMElement('.color-background-picker'), 'bgColor', 'value');
createChangeListener(getDOMElement('.is-mouse-repulsion'), 'isMouseRepulsion', 'value');

const button = getDOMElement('button');
const form = getDOMElement('.form');
const isMusicCheckbox = getDOMElement('.is-music');

const audio = new Audio('audio.mp3');

button.addEventListener('click', () => {
  form.classList.toggle('active');
  button.classList.toggle('hidden');
})

isMusicCheckbox.addEventListener('change', (e) => {
  if (e.target.checked) {
    audio.play();
    audio.loop = true;
  } else {
    audio.pause();
  }
})

const world = new World();
const canvas = world.getCanvas();

window.addEventListener('resize', () => {
  canvas.setSize(window.innerWidth, window.innerHeight);
});

world.startLife();
