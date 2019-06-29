export class Shape {
  autoDrop: any;
  updateOnDrag: any;
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
      timer = setInterval(function () {
        config.clear(oldX, oldY);
        oldY += 1;
        config.paint(oldX, oldY);
      }, 50);
    };

    this.updateOnDrag = (coordinates) => {
      if (draggable) {
        config.clear(oldX, oldY);
        config.paint(coordinates.x, coordinates.y);
        oldX = coordinates.x;
        oldY = coordinates.y;
      }
    };

    this.dragStart = (coordinates) => {
      console.log('dragStart');
      if (config.onTarget(coordinates.x, coordinates.y, oldX, oldY)) {
        console.log('draggable trueee');

        draggable = true;
      }
    };

    this.restoreOnMove = () => {
      config.paint(oldX, oldY);
    };

    this.onScore = () => {
      clearTimer();
      draggable = false;
      oldX = defaultX;
      oldY = defaultY;
      config.paint(oldX, oldY);
      const randomNumber = Math.random();
      if (0 <= randomNumber && randomNumber < 0.5) {
        this.autoDrop();
      }
    };
    this.isActive = () => {
      return draggable;
    };
    this.endGame = () => {
      clearTimer();
    };

    const clearTimer = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };
  }
}


