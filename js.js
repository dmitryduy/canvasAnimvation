import World from "./world.js";

const getDOMElement = (className) => document.querySelector(className);

const createNumberListener = (element, option, maxValue=Infinity, minValue=-Infinity) => {
  console.log(element)
  element.addEventListener('input', (e) => {
    const value = +e.target.value;
    if (value > maxValue || !value || value < minValue) {
      return;
    }
    world.restartLife({[option]: value});
  });
}

const createCheckboxListener = (element, option) => {
  element.addEventListener('change', (e) => {
    world.restartLife({[option]: e.target.checked});
  });
}


window.addEventListener('resize', () => {
  canvas.setSize(window.innerWidth, window.innerHeight);
});

createNumberListener(getDOMElement('.particles-count'), 'countOfParticles', 100, 1);
createNumberListener(getDOMElement('.line-length'), 'maxLengthOfLine');
createNumberListener(getDOMElement('.particles-speed'), 'speed', 150, 1);
createNumberListener(getDOMElement('.particles-life'), 'lifeOfParticle', 1000, 50);
createNumberListener(getDOMElement('.max-particles-radius'), 'maxParticleRadius', 150, 5);
createNumberListener(getDOMElement('.line-width'), 'lineWidth', 20, 1);

createCheckboxListener(getDOMElement('.random-radius'), 'isRandomParticleRadius');
createCheckboxListener(getDOMElement('.is-infinite-line'), 'isInfiniteLine');
createCheckboxListener(getDOMElement('.random-colors'), 'isRandomParticleColor');
createCheckboxListener(getDOMElement('.is-particles-infinite-life'), 'isInfiniteLife');

const world = new World();
const canvas = world.getCanvas();

world.startLife();
