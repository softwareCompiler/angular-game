import {angularMath} from 'angular-ts-math';

export class Shape {
  autoDrop: any;
  dragStart: any;
  restoreOnMove: any;
  onScore: any;
  isActive: any;
  endGame: any;

  constructor(config) {
    const defaultX = config.defaultX;
    const defaultY = config.defaultY;
    let oldX = defaultX;
    let oldY = defaultY;
    let draggable = false;
    let timer = null;

    config.paint(oldX, oldY);
    this.autoDrop = () => {
      clearTimer();
      timer = setInterval(() => {
        config.clear(oldX, oldY);
        oldY += 1;
        config.paint(oldX, oldY);
      }, 50);
    };

    this.restoreOnMove = (coordinates) => {
      if (draggable) {
        config.clear(oldX, oldY);
        config.paint(coordinates.x, coordinates.y);
        oldX = coordinates.x;
        oldY = coordinates.y;
        config.paint(oldX, oldY);
      }
    };

    this.dragStart = (coordinates) => {
      if (config.onTarget(coordinates.x, coordinates.y, oldX, oldY)) {
        draggable = true;
      }
    };

    this.onScore = () => {
      clearTimer();
      draggable = false;
      oldX = defaultX;
      oldY = defaultY;
      config.paint(oldX, oldY);
      const randomNumber = angularMath.getRandom();
      if (0 <= randomNumber && randomNumber < 0.5) {
        this.autoDrop();
      }
    };

    this.isActive = () => {
      return draggable;
    };

    this.endGame = () => clearTimer();

    const clearTimer = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };
  }
}


