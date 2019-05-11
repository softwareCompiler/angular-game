import {ElementRef, Injectable, ViewChild} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RectangleService {

  constructor() { }

    Rectangle() {
    let randomNumber;
    const width = 60;
    const height = 60;
    let color = "red";
    const defaultX = 25;
    const defaultY = 35;
    let oldX = defaultX;
    let oldY = defaultY;
    let draggable = false;
    let timer = null;

    // paint(oldX, oldY);

    // this.autoDrop = () => {
    //   clearTimer();
    //   timer = setInterval(function () {
    //     _draw(oldX, oldY + 1);
    //   }, 50);
    // }
    //
    // this.updateOnDrag = (x, y) => {
    //   if (draggable) {
    //     _draw(x, y);
    //     oldX = x;
    //   }
    // }

    // this.dragStart = (x, y) => {
    //   if (onTarget(x, y)) {
    //     draggable = true;
    //   }
    // }
    //
    // this.restoreOnMove = (sx, sy) => {
    //   paint(oldX, oldY);
    // }
    //
    // onTarget = (x, y) => {
    //   return x < oldX + width && x > oldX && y < oldY + height && y > oldY;
    // }

    // this.onScore = (x, y) => {
    //   clearTimer();
    //   draggable = false;
    //   oldX = defaultX;
    //   oldY = defaultY;
    //   paint(oldX, oldY);
    //   randomNumber = Math.random();
    //   if (0 <= randomNumber && randomNumber < 0.5) {
    //     this.autoDrop();
    //   }
    // }
    //
    // this.isActive = () => {
    //   return draggable;
    // }
    //
    //
    // _draw = (x, y) => {
    //   ctx.clearRect(oldX, oldY, width, height);
    //   paint(x, y);
    //   oldY = y;
    // }

    // let paint = (x, y) => {
    //   ctx.fillStyle = color;
    //   ctx.fillRect(x, y, width, height);
    // }

    // this.endGame = () => {
    //   clearTimer();
    // }
    //
    // clearTimer = () => {
    //   if (timer) {
    //     clearInterval(timer);
    //     timer = null;
    //   }
    // }

  }
}
