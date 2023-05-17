import World from "./world.js";

const particlesCountInput = document.querySelector('.particles-count');
const randomRadiusInput = document.querySelector('.random-radius');
const lineLengthInput = document.querySelector('.line-length');
const isInfiniteLineInput = document.querySelector('.is-infinite-line');

const world = new World();
const canvas = world.getCanvas();

world.startLife();


window.addEventListener('resize', () => {
  canvas.setSize(window.innerWidth, window.innerHeight);
})

particlesCountInput.addEventListener('input', (e) => {
  const particlesCount = +e.target.value;
  if (particlesCount > 100 || !particlesCount || particlesCount < 0) {
    return;
  }
  world.restartLife({countOfParticles: particlesCount});
})

randomRadiusInput.addEventListener('change', (e) => {
  world.restartLife({isRandomParticleRadius: e.target.checked});
})

lineLengthInput.addEventListener('input', (e) => {
  const lengthOfLine = +e.target.value;
  if (!lengthOfLine || lengthOfLine < 0) {
    return;
  }
  world.restartLife({maxLengthOfLine: lengthOfLine});
})

isInfiniteLineInput.addEventListener('change', (e) => {
  world.restartLife({isInfiniteLine: e.target.checked});
})