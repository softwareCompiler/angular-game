import {ElementRef, Injectable, ViewChild} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RectangleService {
  @ViewChild('myCanvas') canvasRef: ElementRef;

  constructor() {
  }


  canvas = document.getElementById('myCanvas');
  ctx = this.canvasRef.nativeElement.getContext('2d');
  width = 60;
  height = 60;
  color = 'red';
  defaultX = 25;
  defaultY = 35;
  oldX = this.defaultX;
  oldY = this.defaultY;
  draggable = false;
  timer = null;

  paint(x, y) {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(x, y, this.width, this.height);
  }
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

