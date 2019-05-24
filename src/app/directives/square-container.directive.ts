import {Directive, ElementRef, Renderer2, Input} from '@angular/core';

import {MessageService} from '../services/directive-messaging';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[squareContainer]',
  providers: [MessageService]
})
export class SquareContainerDirective {
  private subscription: Subscription;
  private messageService: MessageService;

  constructor(elem: ElementRef, renderer: Renderer2, messageService: MessageService) {
    this.subscription = messageService.subscribe('SquareMouseUpEvent', (payload) => {
      let sx = payload.cx;
      let sy = payload.cy;
      getScore(sx,sy);

    });

    const ctx = elem.nativeElement.getContext('2d');
    const x = 200;
    const y = 350;
    const radiusX = 60;
    const radiusY = 30;
    const h = 70;
    const rightBoundaryWidth = 0;
    const leftBoundaryWidth = 45;
    const topBoundaryHeight = 20;
    const bottomBoundaryHeight = 10;
    const rotation = 0;
    const startAngle = 0;
    const endAngle = 2 * Math.PI;
    const width = 2 * radiusX;
    const height = 3.5 * radiusY;
    let score = 0;
    let outScore = 0;
    let paint = () => {
      let text = ' ' + score;
      const fontHeight = 30;
      let color = 'black';
      const textX = 180;
      const textY = 370;

      ctx.beginPath();
      ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle);
      ctx.moveTo((x - radiusX), y);
      ctx.lineTo((x - radiusX), (y + h));
      ctx.lineTo((x + radiusX), (y + h));
      ctx.lineTo((x + radiusX), y);
      ctx.lineWidth = 4;
      ctx.strokeStyle = 'orange';
      ctx.stroke();
      ctx.font = fontHeight + 'px Arial';
      ctx.fillStyle = color;
      ctx.fillText(text, textX, textY);
    }

    paint();
    //  let getScore = function (sx, sy) {
    //   if (this.isOnScoreBoard(sx, sy) && cirPiece.isActive()) {
    //     score += 1;
    //     cirPiece.onScore();
    //     ctx.clearRect(x - radius, y - radius, width, height);
    //     paint();
    //     this.outScore = score;
    //     updateScore();
    //   }
    // }

      let updateScore = function () {
        document.getElementById('scoreBoard').innerHTML = outScore;
      };

      let getScore = (sx, sy) => {
        if (isOnScoreBoard(sx, sy)) {
          score += 1;
          ctx.clearRect(x - radiusX, y - radiusY, width, height);
          paint();
          outScore = score;
          updateScore();
        }
      }
    //
    //   this.restoreOnMove = (sx, sy) => {
    //     paint();
    //   }
    //
      let isOnScoreBoard = (sx, sy) => {
        return sx < x + rightBoundaryWidth && sx > x - leftBoundaryWidth &&
          sy < y + bottomBoundaryHeight && sy > y - topBoundaryHeight;
      }
  }

}
