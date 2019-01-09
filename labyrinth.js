let canvas = null;
let ctx = null;

let windowWidth = 60;
let windowHeight = 60;

const frameRate = 30;

const positionMatrix = [];

const NUM_OF_PATHS = 10;
let paths = null;

function begin() {
  setup();
  setInterval(loop, 1000/frameRate);
}

function setup() {
  canvas = document.getElementById('labyrinth');
  ctx = canvas.getContext('2d');

  ctx.canvas.width = windowWidth;
  ctx.canvas.height = windowHeight;
  ctx.lineWidth = 4;

  setupPositionMatrix();

  path = new Path(20, positionMatrix);
}

function setupPositionMatrix() {
  for (let i = 0; i < windowWidth/10 - 1; i++) {
    positionMatrix[i] = [];
    for (let j = 0; j < windowHeight/10 - 1; j++) {
      positionMatrix[i][j] = true;
    }
  }
}

function loop() {
  ctx.clearRect(0, 0, windowWidth, windowHeight);
  path.move();
  path.draw();
}
