import {Directive, ElementRef, Renderer2} from '@angular/core';
import {MessageService} from '../services/directive-messaging';
import {Subscription} from 'rxjs';
import {Container} from './container';

@Directive({
  selector: '[circleContainer]',
  providers: [MessageService]
})
export class RoundContainerDirective {
  private subscription: Subscription;
  private messageService: MessageService;

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


    const radius = 50;
    const scoreRadius = 10;
    let circleScore = 0;
    let squareScore = 0;
    let isCircleScore = false;

    const config = {
      x: 450,
      y: 370,
      width: 2 * radius,
      height: 2 * radius,
      startAngle: 0,
      endAngle: 2 * Math.PI,
      score: 0,
      paint: () => {
      },
    };
    config.paint = () => {
      const text = ' ' + config.score;
      const fontHeight = 30;
      const color = 'black';
      const textX = 435;
      const textY = 370;
      ctx.beginPath();
      ctx.arc(config.x, config.y, radius, config.startAngle, config.endAngle);
      ctx.lineWidth = 4;
      ctx.strokeStyle = 'orange';
      ctx.stroke();
      ctx.font = fontHeight + 'px Arial';
      ctx.fillStyle = color;
      ctx.fillText(text, textX, textY);
    };

    function myMove(e) {
      // const sx = e.pageX - canvas.offsetLeft;
      // const sy = e.pageY - canvas.offsetTop;
      container.restoreOnMove();
    }

    const isOnScoreBoard = (sx, sy) => {
      return Math.sqrt((sx - config.x) * (sx - config.x) + (sy - config.y) * (sy - config.y)) < scoreRadius;
    };

    const updateScore = () => {
      const totalScore = circleScore + squareScore;
      document.getElementById('scoreBoard').innerHTML = '' + totalScore;
    };
    const getScore = (sx, sy) => {
      if (isOnScoreBoard(sx, sy)) {
        isCircleScore = true;
        config.score += 1;
        ctx.clearRect(config.x - radius, config.y - radius, config.width, config.height);
        config.paint();
        circleScore = config.score;
        updateScore();
        this.messageService.broadcast('CircleGetScore', {isCircleScore, circleScore});
      }
    };
    const container = new Container(config);
  }
}
