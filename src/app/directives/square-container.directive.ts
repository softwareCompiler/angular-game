import {Directive, ElementRef, Renderer2} from '@angular/core';
import {MessageService} from '../services/directive-messaging';
import {Subscription} from 'rxjs';
import {Container} from './container';

@Directive({
  selector: '[SquareContainer]'
})
export class SquareContainerDirective {
  private subscription: Subscription;
  private messageService: MessageService;

  constructor(elem: ElementRef, renderer: Renderer2, messageService: MessageService) {
    const radiusX = 60;
    const radiusY = 30;
    const h = 70;
    const rightBoundaryWidth = 0;
    const leftBoundaryWidth = 45;
    const topBoundaryHeight = 20;
    const bottomBoundaryHeight = 10;
    const rotation = 0;
    let squareScore = 0;
    let circleScore = 0;
    let isSquareScore = false;
    const config = {
      x: 200,
      y: 350,
      width: 2 * radiusX,
      height: 3.5 * radiusY,
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
      const textX = 180;
      const textY = 370;

      ctx.beginPath();
      ctx.ellipse(config.x, config.y, radiusX, radiusY, rotation, config.startAngle, config.endAngle);
      ctx.moveTo((config.x - radiusX), config.y);
      ctx.lineTo((config.x - radiusX), (config.y + h));
      ctx.lineTo((config.x + radiusX), (config.y + h));
      ctx.lineTo((config.x + radiusX), config.y);
      ctx.lineWidth = 4;
      ctx.strokeStyle = 'orange';
      ctx.stroke();
      ctx.font = fontHeight + 'px Arial';
      ctx.fillStyle = color;
      ctx.fillText(text, textX, textY);
    };

    const ctx = elem.nativeElement.getContext('2d');
    const canvas = elem.nativeElement;

    // We should NOT have canvas.addEventListener in places other than the mouse tracker class.
    canvas.addEventListener('mousemove', myMove, false);

    this.messageService = messageService;
    this.subscription = messageService.subscribe('CircleGetScore', (payload) => {
      circleScore = payload.circleScore;
    });

    this.subscription = messageService.subscribe('SquareMouseUpEvent', (payload) => {
      getScore(payload.x, payload.y);
    });



    // this function is not necessary. It can be directly replaced by container.restoreOnMove,
    // ie, myMove = container.restoreOnMove.
    function myMove(e) {
      container.restoreOnMove();
    }

    // The IDE asks to change the function to use the arrow syntax;
    // const updateScore = function () {
      const updateScore = () => {
      const totalScore = circleScore + squareScore;
      document.getElementById('scoreBoard').innerHTML = '' + totalScore;
    };

    const getScore = (sx, sy) => {
      if (isOnScoreBoard(sx, sy)) {
        isSquareScore = true;
        config.score += 1;
        ctx.clearRect(config.x - radiusX, config.y - radiusY, config.width, config.height);
        config.paint();
        squareScore = config.score;
        updateScore();
        this.messageService.broadcast('SquareGetScore', {isSquareScore, squareScore});
      }
    };

    const isOnScoreBoard = function (sx, sy) {
      return sx < config.x + rightBoundaryWidth && sx > config.x - leftBoundaryWidth &&
        sy < config.y + bottomBoundaryHeight && sy > config.y - topBoundaryHeight;
    };
    console.log('isOnScoreBoard', isOnScoreBoard);
    const container = new Container(config);

  }

}
