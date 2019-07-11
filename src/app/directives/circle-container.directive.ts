import {Directive, ElementRef, Renderer2} from '@angular/core';
import {MessageService} from '../services/directive-messaging';
import {Subscription} from 'rxjs';
import {Container} from './container';
import {angularMath} from 'angular-ts-math';

@Directive({
  selector: '[appCircleContainer]'
})
export class CircleContainerDirective {
  private subscription: Subscription;
  private messageService: MessageService;

  constructor(elem: ElementRef, renderer: Renderer2, messageService: MessageService) {
    const radius = 50;
    const scoreRadius = 10;
    let circleScore = 0;
    let isCircleScore = false;

    const config = {
      x: 450,
      y: 370,
      width: 2 * radius,
      height: 2 * radius,
      startAngle: 0,
      endAngle: 2 * angularMath.getPi(),
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

    const ctx = elem.nativeElement.getContext('2d');
    this.messageService = messageService;
    const container = new Container(config);
    this.messageService.subscribe('mousemove', container.restoreOnMove);
    // Why in the circle container we need to subscribe to 'SquareGetScore' event?
    // this.subscription = messageService.subscribe('SquareGetScore', (payload) => {
    //   squareScore = payload.squareScore;
    // });
    this.subscription = messageService.subscribe('CircleMouseUpEvent', (payload) => {
      getScore(payload.x, payload.y);
    });

    // 20190711: This version of getScore takes two parameters. If we change it to use one parameter, this function will be easier to be passed as a
    // parameter to another function.
    const getScore = (sx, sy) => {
      // const [sx, sy] = payload;
      if (isOnScoreBoard(sx, sy)) {
        isCircleScore = true;
        config.score += 1;
        ctx.clearRect(config.x - radius, config.y - radius, config.width, config.height);
        config.paint();
        circleScore = config.score;
        // updateScore();
        this.messageService.broadcast('CircleGetScore', {isCircleScore, circleScore});
      }
    };

    // const getScore = payload => {
    //   const [sx, sy] = payload;
    //   if (isOnScoreBoard(sx, sy)) {
    //     isCircleScore = true;
    //     config.score += 1;
    //     ctx.clearRect(config.x - radius, config.y - radius, config.width, config.height);
    //     config.paint();
    //     circleScore = config.score;
    //     // updateScore();
    //     this.messageService.broadcast('CircleGetScore', {isCircleScore, circleScore});
    //   }
    // };

    // this.subscription = messageService.subscribe('CircleMouseUpEvent', getScore);

    const isOnScoreBoard = (sx, sy) => {
      return angularMath.squareOfNumber((sx - config.x) * (sx - config.x) + (sy - config.y) * (sy - config.y)) < scoreRadius;
    };

    // const updateScore = () => {
    //   const totalScore = circleScore + squareScore;
    //   document.getElementById('scoreBoard').innerHTML = '' + totalScore;
    // };

    // This is the getScore function defined in square-container.directive.ts. It's so similar to the getScore function
    // in this class. Can we reuse the similar logic to avoid duplication?
    // const getScore = (sx, sy) => {
    //   if (isOnScoreBoard(sx, sy)) {
    //     isSquareScore = true;
    //     config.score += 1;
    //     ctx.clearRect(config.x - radiusX, config.y - radiusY, config.width, config.height);
    //     config.paint();
    //     squareScore = config.score;
    //     updateScore();
    //     this.messageService.broadcast('SquareGetScore', {isSquareScore, squareScore});
    //   }
    // };
  }
}
