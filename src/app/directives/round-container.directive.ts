import {Directive, ElementRef, Renderer2} from '@angular/core';
import {MessageService} from '../services/directive-messaging';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[circleContainer]',
  providers: [MessageService]
})
export class RoundContainerDirective {
  private subscription: Subscription;
<<<<<<< HEAD
=======
  private messageService: MessageService;

>>>>>>> 4b426bdfd3e788f0bfc28ce3add035fb6366f1c6
  constructor(elem: ElementRef, renderer: Renderer2, messageService: MessageService) {
    this.messageService = messageService;
    const ctx = elem.nativeElement.getContext('2d');
    const canvas = elem.nativeElement;
    canvas.addEventListener('mousemove', myMove, false);

    this.subscription = messageService.subscribe('SquareGetScore', (payload) => {
      squareScore = payload.squareScore;
    });

    this.subscription = messageService.subscribe('CircleMouseUpEvent', (payload) => {
      const sx = payload.cx;
      const sy = payload.cy;
      getScore(sx, sy);
    });

    const x = 450;
    const y = 370;
    const radius = 50;
    const scoreRadius = 10;
    const width = 2 * radius;
    const height = 2 * radius;
    const startAngle = 0;
    const endAngle = 2 * Math.PI;
    let score = 0;
    let circleScore = 0;
    let squareScore = 0;
    let isCircleScore = false;
    const paint = () => {
      const text = ' ' + score;
      const fontHeight = 30;
      const color = 'black';
      const textX = 435;
      const textY = 370;
      ctx.beginPath();
      ctx.arc(x, y, radius, startAngle, endAngle);
      ctx.lineWidth = 4;
      ctx.strokeStyle = 'orange';
      ctx.stroke();
      ctx.font = fontHeight + 'px Arial';
      ctx.fillStyle = color;
      ctx.fillText(text, textX, textY);
    };

    paint();

    const restoreOnMove = function (sx, sy) {
      paint();
    };

<<<<<<< HEAD
      let updateScore = () => {
        document.getElementById('scoreBoard').innerHTML = '' + outScore;
      }
=======
    function myMove(e) {
      const sx = e.pageX - canvas.offsetLeft;
      const sy = e.pageY - canvas.offsetTop;
      restoreOnMove(sx, sy);
    }
>>>>>>> 4b426bdfd3e788f0bfc28ce3add035fb6366f1c6

    const isOnScoreBoard = (sx, sy) => {
      return Math.sqrt((sx - x) * (sx - x) + (sy - y) * (sy - y)) < scoreRadius;
    };

    const updateScore = () => {
      const totalScore = circleScore + squareScore;
      document.getElementById('scoreBoard').innerHTML = '' + totalScore;
    };
    const getScore = (sx, sy) => {
      if (isOnScoreBoard(sx, sy)) {
        isCircleScore = true;
        score += 1;
        ctx.clearRect(x - radius, y - radius, width, height);
        paint();
        circleScore = score;
        updateScore();
        this.messageService.broadcast('CircleGetScore', {isCircleScore, circleScore});
      }
    };
  }
}
