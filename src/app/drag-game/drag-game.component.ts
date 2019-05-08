import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';

@Component({
  selector: 'app-drag-game',
  templateUrl: './drag-game.component.html',
  styleUrls: ['./drag-game.component.css']
})
export class DragGameComponent implements OnInit {
  @ViewChild('myCanvas') canvasRef: ElementRef;
  constructor() { }

  ngOnInit() {
    let canvas = document.getElementById('myCanvas')
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    // ctx.fillStyle = 'red';
    // ctx.fillRect(100, 75, 50, 50);
    // // ctx.fillStyle = 'red';
    // // ctx.fill();
    // ctx.beginPath();
    // ctx.arc(550, 100, 25, 0, 360);
    // ctx.fillStyle = 'blue';
    // ctx.fill();

     let rectangleContainer = new RectangleContainer();
     let circleContainer = new CircleContainer();
     let recPiece = new Rectangle();
     let cirPiece = new Circle();
     let pieces = [recPiece, cirPiece];
     let containers = [rectangleContainer, circleContainer];

    function Rectangle() {
      let randomNumber;
      let width = 60;
      let height = 60;
      let color = "red";
      let defaultX = 25;
      let defaultY = 35;
      let oldX = defaultX;
      let oldY = defaultY;
      let draggable = false;
      let timer = null;

      paint(oldX, oldY);

      this.autoDrop = function () {
        clearTimer();
        timer = setInterval(function () {
          _draw(oldX, oldY + 1);
        }, 50);
      }

      this.updateOnDrag = function (x, y) {
        if (draggable) {
          _draw(x, y);
          oldX = x;
        }
      }

      this.dragStart = function (x, y) {
        if (onTarget(x, y)) {
          draggable = true;
        }
      }

      this.restoreOnMove = function (sx, sy) {
        paint(oldX, oldY);
      }

      function onTarget(x, y) {
        return x < oldX + width && x > oldX && y < oldY + height && y > oldY;
      }

      this.onScore = function (x, y) {
        clearTimer();
        draggable = false;
        oldX = defaultX;
        oldY = defaultY;
        paint(oldX, oldY);
        randomNumber = Math.random();
        if (0 <= randomNumber && randomNumber < 0.5) {
          this.autoDrop();
        }
      }

      this.isActive = function () {
        return draggable;
      }


      function _draw(x, y) {
        ctx.clearRect(oldX, oldY, width, height);
        paint(x, y);
        oldY = y;
      }

      function paint(x, y) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
      }

      this.endGame = function () {
        clearTimer();
      }

      function clearTimer() {
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
      }

    }


    function Circle() {
      let randomNumber;
      let radius = 35;
      let color = "blue";
      let defaultX = 600;
      let defaultY = 60;
      let draggable = false;
      let width = 2 * radius;
      let height = 2 * radius;
      let startAngle = 0;
      let endAngle = 2 * Math.PI;
      let oldX = defaultX;
      let oldY = defaultY;
      let timer = null;

      paint(oldX, oldY);

      this.autoDrop = function () {
        clearTimer();
        timer = setInterval(function () {
          _draw(oldX, oldY + 1);
        }, 50);
      }

      this.updateOnDrag = function (x, y) {
        if (draggable) {
          _draw(x, y);
          oldX = x;
        }
      }

      this.dragStart = function (x, y) {
        if (onTarget(x, y)) {
          draggable = true;
        }
      }

      this.restoreOnMove = function (sx, sy) {
        paint(oldX, oldY);
      }

      function onTarget(x, y) {
        return Math.sqrt((x - oldX) * (x - oldX) + (y - oldY) * (y - oldY)) <= radius;
      }

      this.onScore = function () {
        clearTimer();
        draggable = false;
        oldX = defaultX;
        oldY = defaultY;
        paint(oldX, oldY);
        randomNumber = Math.random();
        if (randomNumber >= 0.5) {
          this.autoDrop();
        }
      }

      this.isActive = function () {
        return draggable;
      }

      function _draw(x, y) {
        ctx.clearRect(oldX - radius, oldY - radius, width, height);
        paint(x, y);
        oldY = y;
      }

      function paint(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle);
        ctx.fillStyle = color;
        ctx.fill();
      }

      this.endGame = function () {
        clearTimer();
      }

      function clearTimer() {
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
      }
    }


    function RectangleContainer() {
      let x = 200;
      let y = 350;
      let radiusX = 60;
      let radiusY = 30;
      let h = 70;
      let rightBoundaryWidth = 0;
      let leftBoundaryWidth = 45;
      let topBoundaryHeight = 20;
      let bottomBoundaryHeight = 10;
      let rotation = 0;
      let startAngle = 0;
      let endAngle = 2 * Math.PI;
      let width = 2 * radiusX;
      let height = 3.5 * radiusY;
      let score = 0;

      this.outScore = 0;

      paint();

      // why this function is still here while ShapeContainer already has one?
      let updateScore = function () {
        document.getElementById("scoreBoard").innerHTML = rectangleContainer.outScore + circleContainer.outScore;
      }

      this.getScore = function (sx, sy) {
        if (this.isOnScoreBoard(sx, sy) && recPiece.isActive()) {
          recPiece.onScore(sx, sy);
          score += 1;
          ctx.clearRect(x - radiusX, y - radiusY, width, height);
          paint();
          this.outScore = score;
          updateScore();
        }
      }

      this.restoreOnMove = function (sx, sy) {
        paint();
      }

      this.isOnScoreBoard = function (sx, sy) {
        return sx < x + rightBoundaryWidth && sx > x - leftBoundaryWidth &&
          sy < y + bottomBoundaryHeight && sy > y - topBoundaryHeight;
      }

      function paint() {
        let text = " " + score;
        let fontHeight = 30;
        let color = "black";
        let textX = 180;
        let textY = 370;

        ctx.beginPath();
        ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle);
        ctx.moveTo((x - radiusX), y);
        ctx.lineTo((x - radiusX), (y + h));
        ctx.lineTo((x + radiusX), (y + h));
        ctx.lineTo((x + radiusX), y);
        ctx.lineWidth = 4;
        ctx.strokeStyle = "orange";
        ctx.stroke();
        ctx.font = fontHeight + "px Arial";
        ctx.fillStyle = color;
        ctx.fillText(text, textX, textY);
      }
    }


    function CircleContainer() {
      let x = 450;
      let y = 370;
      let radius = 50;
      let scoreRadius = 10;
      let width = 2 * radius;
      let height = 2 * radius;
      let startAngle = 0;
      let endAngle = 2 * Math.PI;
      let score = 0;

      this.outScore = 0;

      paint();

      let updateScore = function () {
        document.getElementById("scoreBoard").innerHTML = rectangleContainer.outScore + circleContainer.outScore;
      }

      this.getScore = function (sx, sy) {
        if (this.isOnScoreBoard(sx, sy) && cirPiece.isActive()) {
          score += 1;
          cirPiece.onScore();
          ctx.clearRect(x - radius, y - radius, width, height);
          paint();
          this.outScore = score;
          updateScore();
        }
      }

      this.restoreOnMove = function (sx, sy) {
        paint();
      }

      this.isOnScoreBoard = function (sx, sy) {
        return Math.sqrt((sx - x) * (sx - x) + (sy - y) * (sy - y)) < scoreRadius;
      }

      function paint() {
        let text = " " + score;
        let fontHeight = 30;
        let color = "black";
        let textX = 435;
        let textY = 370;
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle);
        ctx.lineWidth = 4;
        ctx.strokeStyle = "orange";
        ctx.stroke();
        ctx.font = fontHeight + "px Arial";
        ctx.fillStyle = color;
        ctx.fillText(text, textX, textY);
      }
    }

    function myMove(e) {
      onMouseMovement(e, function (newX, newY) {
        pieces.forEach(function (p) {
          p.updateOnDrag(newX, newY)
        });
        containers.concat(pieces).forEach(function (c) {
          c.restoreOnMove(newX, newY)
        });
      });
    }

    function myDown(e) {
      onMouseMovement(e, function (newX, newY) {
        pieces.forEach(function (dw) {
          dw.dragStart(newX, newY)
        });
      });
    }

    function myUp(e) {
      onMouseMovement(e, function (newX, newY) {
        containers.forEach(function (c) {
          c.getScore(newX, newY)
        });
      });
    }

    function onMouseMovement(event, callbackFn) {
      event.preventDefault();

      let newX = event.pageX - canvas.offsetLeft; ;
      let newY = event.pageY - canvas.offsetTop; ;
      callbackFn(newX, newY);
    }

    function startTimer(duration, display) {
      let start = Date.now();
      let diff;
      let minutes;
      let seconds;
      let mileSecondFactor = 1000;
      let secondFactor = 60;
      let minutesFactor = 60;
      let clock = setInterval(timer, mileSecondFactor);

      function timer() {
        diff = duration - (((Date.now() - start) / mileSecondFactor) | 0);
        console.log(diff / minutesFactor);
        minutes = Math.floor(diff / minutesFactor);
        seconds = (diff % secondFactor) | 0;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        display.textContent = minutes + ":" + seconds;

        if (diff <= 0) {
          clearInterval(clock);
          canvas.removeEventListener('mousedown', myDown);
          canvas.removeEventListener('mousemove', myMove);
          canvas.removeEventListener('mouseup', myUp);
          pieces.forEach(function (p) {
            p.endGame();
          });
        }
      }

      timer();
    }

    function gameStartfunction() {
      let oneMinutes = 30;
      let display = document.querySelector('#time');

      canvas.addEventListener('mousedown', myDown, false);
      canvas.addEventListener('mousemove', myMove, false);
      canvas.addEventListener('mouseup', myUp, false);
      startTimer(oneMinutes, display);
    }

  }
}

