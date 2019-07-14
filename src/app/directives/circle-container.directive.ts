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
    // let circleScore = 0;
    // let isCircleScore = false;

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


    const getScore = (coordinates) => {
      if (isOnScoreBoard(coordinates.x, coordinates.y)) {
        // isCircleScore = true;
        config.score += 1;
        ctx.clearRect(config.x - radius, config.y - radius, config.width, config.height);
        // config.paint();
        // circleScore = config.score;
        // The variable, isCircleScore, is NOT necessary because we are already using the name of the event, CircleGetScore.
        // this.messageService.broadcast('CircleGetScore', {isCircleScore, circleScore});
        // Make similar changes in square-container.directive.js
        this.messageService.broadcast('CircleGetScore', config.score);
      }
    };

    this.subscription = messageService.subscribe('CircleMouseUpEvent', getScore);
    const isOnScoreBoard = (sx, sy) => {
      return angularMath.squareOfNumber((sx - config.x) * (sx - config.x) + (sy - config.y) * (sy - config.y)) < scoreRadius;
    };
  }
}
