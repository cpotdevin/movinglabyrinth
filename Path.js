const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;
const UP_RIGHT = 4;
const DOWN_RIGHT = 5;
const DOWN_LEFT = 6;
const UP_LEFT = 7;

const MAX_TRIES = 20;
const NUM_FRAMES = 5;

const STRAIGHT = 0;
const DIAGONAL = 1;
const STRAIGHT_AND_DIAGONAL = 2;

class Path {
  constructor(maxLength, directions, positionMatrix) {
    this.maxLength = maxLength;
    this.positionMatrix = positionMatrix;
    this.directions = directions;

    do {
      var startXPosition = Math.floor(Math.random()*this.positionMatrix.length);
      var startYPosition = Math.floor(Math.random()*this.positionMatrix[0].length);
    } while (!this.positionIsAvailable(startXPosition, startYPosition));

    this.positions = [{x: startXPosition, y: startYPosition}];
    this.positionMatrix[startXPosition][startYPosition] = false;
    this.firstIndex = 0;
    this.currentFrame = 0;
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
      if (i == 0) {
        let nextIndex = (this.positions.length + index - 1)%this.positions.length;
        let nextPosition = this.positions[nextIndex];
        let midX = this.getMidPosition(nextPosition.x, currentPosition.x);
        let midY = this.getMidPosition(nextPosition.y, currentPosition.y);
        ctx.moveTo(this.getScaledComponent(midX), this.getScaledComponent(midY));
      } else if (this.getSquaredDistance(previousPosition, currentPosition) < 3) {
        if (i == this.maxLength - 1) {
          let midX = this.getMidPosition(currentPosition.x, previousPosition.x);
          let midY = this.getMidPosition(currentPosition.y, previousPosition.y);
          ctx.lineTo(this.getScaledComponent(midX), this.getScaledComponent(midY));
        } else {
          ctx.lineTo(this.getScaledComponent(currentPosition.x), this.getScaledComponent(currentPosition.y));
        }
      } else {
        ctx.moveTo(this.getScaledComponent(currentPosition.x), this.getScaledComponent(currentPosition.y));
      }
      previousPosition = currentPosition;
    }
    ctx.stroke();
  }

  getScaledComponent(value) {
    return 10 + value*10;
  }

  getSquaredDistance(pos1, pos2) {
    return Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2)
  }

  getMidPosition(pos1, pos2) {
    return pos1 + (pos2 - pos1)/NUM_FRAMES*this.currentFrame;
  }

  move() {
    this.currentFrame = (this.currentFrame + 1)%NUM_FRAMES;
    if (!this.currentFrame) {
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
  }

  getNextRandomPosition(x, y) {
    const direction = this.getDirection();

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
      case UP_RIGHT:
        x++;
        y--;
        break;
      case DOWN_RIGHT:
        x++;
        y++;
        break;
      case DOWN_LEFT:
        x--;
        y++;
        break;
      case UP_LEFT:
        x--;
        y--;
        break;
    }
    return {x: x, y: y};
  }

  getDirection() {
    let direction = 0;
    switch (this.directions) {
      case STRAIGHT:
        direction = Math.floor(Math.random()*4);
        break;
      case DIAGONAL:
        direction = Math.floor(Math.random()*4) + 4;
        break;
      case STRAIGHT_AND_DIAGONAL:
        direction = Math.floor(Math.random()*8);
        break;
    }
    return direction;
  }

  findAvalableRandomPosition() {
    do {
      var x = Math.floor(Math.random()*this.positionMatrix.length);
      var y = Math.floor(Math.random()*this.positionMatrix[0].length);
    } while (!this.positionIsAvailable(x, y));
    return {x: x, y: y};
  }
}
