let canvas = null;
let ctx = null;

let windowWidth = 400;
let windowHeight = 400;

const frameRate = 60;

const positionMatrix = [];

const NUM_OF_PATHS = 4;
const PATH_LENGTH = 200;
let paths = [];

function begin() {
  setup();
  setInterval(loop, 1000/frameRate);
}

function setup() {
  canvas = document.getElementById('labyrinth');
  ctx = canvas.getContext('2d');

  ctx.canvas.width = windowWidth;
  ctx.canvas.height = windowHeight;
  ctx.fillStyle = 'white';
  ctx.lineWidth = 4;

  setupPositionMatrix();
  setupPaths();
}

function setupPositionMatrix() {
  for (let i = 0; i < windowWidth/10 - 1; i++) {
    positionMatrix[i] = [];
    for (let j = 0; j < windowHeight/10 - 1; j++) {
      positionMatrix[i][j] = true;
    }
  }
}

function setupPaths() {
  for (let i = 0; i < NUM_OF_PATHS; i++) {
    paths.push(new Path(PATH_LENGTH, STRAIGHT, positionMatrix));
  }
}

function loop() {
  ctx.fillRect(0, 0, windowWidth, windowHeight);
  paths.forEach(path => path.move());
  paths.forEach(path => path.draw());
}
