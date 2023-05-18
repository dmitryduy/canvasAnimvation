import World from "./world.js";

const getDOMElement = (className) => document.querySelector(className);

const createInputListener = (element, option, maxValue=Infinity, minValue=-Infinity) => {
  element.addEventListener('input', (e) => {
    const value = +e.target.value;
    if (value > maxValue || !value || value < minValue) {
      return;
    }
    world.restartLife({[option]: value});
  });
}

const createChangeListener = (element, option) => {
  element.addEventListener('change', (e) => {
    world.restartLife({[option]: e.target.checked});
  });
}

window.addEventListener('resize', () => {
  canvas.setSize(window.innerWidth, window.innerHeight);
});

createInputListener(getDOMElement('.particles-count'), 'countOfParticles', 100, 1);
createInputListener(getDOMElement('.line-length'), 'maxLengthOfLine');
createInputListener(getDOMElement('.particles-speed'), 'speed', 150, 1);
createInputListener(getDOMElement('.particles-life'), 'lifeOfParticle', 1000, 50);
createInputListener(getDOMElement('.max-particles-radius'), 'maxParticleRadius', 150, 5);
createInputListener(getDOMElement('.line-width'), 'lineWidth', 20, 1);

createChangeListener(getDOMElement('.random-radius'), 'isRandomParticleRadius');
createChangeListener(getDOMElement('.is-infinite-line'), 'isInfiniteLine');
createChangeListener(getDOMElement('.random-colors'), 'isRandomParticleColor');
createChangeListener(getDOMElement('.is-particles-infinite-life'), 'isInfiniteLife');
createChangeListener(getDOMElement('.color-particle-picker'), 'particleColor');
createChangeListener(getDOMElement('.color-line-picker'), 'lineColor');
createChangeListener(getDOMElement('.color-background-picker'), 'bgColor');


const world = new World();
const canvas = world.getCanvas();

world.startLife();
