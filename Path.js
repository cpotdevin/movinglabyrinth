const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

const MAX_TRIES = 20;

class Path {
  constructor(maxLength, positionMatrix) {
    this.maxLength = maxLength;
    this.positionMatrix = positionMatrix;

    do {
      var startXPosition = Math.floor(Math.random()*this.positionMatrix.length);
      var startYPosition = Math.floor(Math.random()*this.positionMatrix[0].length);
    } while (!this.positionIsAvailable(startXPosition, startYPosition));

    this.positions = [{x: startXPosition, y: startYPosition}];
    this.positionMatrix[startXPosition][startYPosition] = false;
    this.firstIndex = 0;
  }

  positionIsAvailable(x, y) {
    if (0 <= x && 0 <= y && x < this.positionMatrix.length && y < this.positionMatrix[0].length) {
      return this.positionMatrix[x][y];
    } else {
      return false;
    }
  }

  draw() {
    ctx.beginPath();
    let previousPosition = {x: -100, y: -100};
    for (let i = 0; i < this.positions.length; i++) {
      let index = (this.positions.length + this.firstIndex - i)%this.positions.length;
      let currentPosition = this.positions[index];
      if (Math.pow(currentPosition.x - previousPosition.x, 2) + Math.pow(currentPosition.y - previousPosition.y, 2) <= 1) {
        ctx.lineTo(10 + currentPosition.x*10, 10 + currentPosition.y*10);
      } else {
        ctx.moveTo(10 + currentPosition.x*10, 10 + currentPosition.y*10);
      }
      previousPosition = currentPosition;
    }
    ctx.stroke();
  }

  move() {
    let currentPosition = this.positions[this.firstIndex];
    let tries = 0;
    do {
      var nextPosition = this.getNextRandomPosition(currentPosition.x, currentPosition.y);
      tries++;
    } while (tries < MAX_TRIES && !this.positionIsAvailable(nextPosition.x, nextPosition.y));

    this.firstIndex = (this.firstIndex + 1)%this.maxLength;
    if (tries == MAX_TRIES) {
      nextPosition = this.findAvalableRandomPosition();
    }

    if (this.positions.length < this.maxLength) {
      this.positions.push(nextPosition);
    } else {
      let lastPosition = this.positions[this.firstIndex];
      this.positionMatrix[lastPosition.x][lastPosition.y] = true;
      this.positions[this.firstIndex] = nextPosition;
    }
    this.positionMatrix[nextPosition.x][nextPosition.y] = false;
  }

  getNextRandomPosition(x, y) {
    const direction = Math.floor(Math.random()*4);
    switch (direction) {
      case UP:
        y--;
        break;
      case RIGHT:
        x++;
        break;
      case DOWN:
        y++;
        break;
      case LEFT:
        x--;
        break;
    }
    return {x: x, y: y};
  }

  findAvalableRandomPosition() {
    do {
      var x = Math.floor(Math.random()*this.positionMatrix.length);
      var y = Math.floor(Math.random()*this.positionMatrix[0].length);
    } while (!this.positionIsAvailable(x, y));
    return {x: x, y: y};
  }
}
