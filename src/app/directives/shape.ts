
import {Injectable} from '@angular/core';

@Injectable()
export class Shape {
  constructor(config) {
    const defaultX = config.defaultX;
    const defaultY = config.defaultY;
    let oldX = defaultX;
    let oldY = defaultY;
    let draggable = false;
    let timer = null;
    let isScore = false;

    config.paint(oldX, oldY);

    function autoDrop() {
      clearTimer();
      timer = setInterval(function () {
        config.clear(oldX, oldY);
        oldY += 1;
        config.paint(oldX, oldY);
      }, 50);
    }

    const updateOnDrag = (x, y) => {
      if (draggable) {
        config.clear(oldX, oldY);
        config.paint(x, y);
        oldX = x;
        oldY = y;
      }
    };

    const dragStart = (x, y) => {
      if (config.onTarget(x, y, oldX, oldY)) {
        draggable = true;
      }
    };

    const restoreOnMove = (sx, sy) => {
      config.paint(oldX, oldY);
    };

    const onScore = (x, y) => {
      if (isScore) {
        clearTimer();
        draggable = false;
        oldX = defaultX;
        oldY = defaultY;
        config.paint(oldX, oldY);
        const randomNumber = Math.random();
        if (0 <= randomNumber && randomNumber < 0.5) {
          autoDrop();
        }
      }
    };
    const isActive = () => {
      return draggable;
    };
    const endGame = () => {
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


