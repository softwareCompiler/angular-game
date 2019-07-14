import {Directive, ElementRef, Renderer2} from '@angular/core';
import {MessageService} from '../services/directive-messaging';
import {Subscription} from 'rxjs';
import {Container} from './container';
import {angularMath} from 'angular-ts-math';

@Directive({
  selector: '[appSquareContainer]'
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
    const config = {
      x: 200,
      y: 350,
      width: 2 * radiusX,
      height: 3.5 * radiusY,
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
    this.messageService = messageService;
    const container = new Container(config);
    this.messageService.subscribe('mousemove', container.restoreOnMove);

    const getScore = (coordinates) => {
      if (isOnScoreBoard(coordinates.x, coordinates.y)) {
        config.score += 1;
        ctx.clearRect(config.x - radiusX, config.y - radiusY, config.width, config.height);
        this.messageService.broadcast('SquareGetScore', config.score);
      }
    };

    this.subscription = messageService.subscribe('SquareMouseUpEvent', getScore);

    const isOnScoreBoard = (sx, sy) => {
      return sx < config.x + rightBoundaryWidth && sx > config.x - leftBoundaryWidth &&
        sy < config.y + bottomBoundaryHeight && sy > config.y - topBoundaryHeight;
    };
  }

}
