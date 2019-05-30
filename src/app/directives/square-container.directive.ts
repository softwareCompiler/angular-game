import {Directive, ElementRef, Renderer2} from '@angular/core';
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
    this.messageService = messageService;
    const ctx = elem.nativeElement.getContext('2d');
    const canvas = elem.nativeElement;
    canvas.addEventListener('mousemove', myMove, false);
    this.subscription = messageService.subscribe('SquareMouseUpEvent', (payload) => {
      const sx = payload.cx;
      const sy = payload.cy;
      getScore(sx, sy);
      console.log('isSquareScore3:', isSquareScore);
    });
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
    let isSquareScore = false;
    const paint = () => {
      const text = ' ' + score;
      const fontHeight = 30;
      const color = 'black';
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
    };

    paint();

    const restoreOnMove = (sx, sy)=> {
      paint();
    };

    function myMove(e) {
      const sx = e.pageX - canvas.offsetLeft;
      const sy = e.pageY - canvas.offsetTop;
      restoreOnMove(sx, sy);
    }

    const updateScore = () => {
      document.getElementById('scoreBoard').innerHTML = '' + outScore;
    };

    const getScore = (sx, sy) => {
      if (isOnScoreBoard(sx, sy)) {
        isSquareScore = true;
        score += 1;
        ctx.clearRect(x - radiusX, y - radiusY, width, height);
        paint();
        outScore = score;
        updateScore();
        this.messageService.broadcast('SquareGetScore', {isSquareScore});
        console.log('isSquareScore:', isSquareScore);
      }
    };

    const isOnScoreBoard = (sx, sy) => {
      return sx < x + rightBoundaryWidth && sx > x - leftBoundaryWidth &&
        sy < y + bottomBoundaryHeight && sy > y - topBoundaryHeight;
    };
  }

}
