import {Directive, ElementRef, Renderer2} from '@angular/core';
import {MessageService} from '../services/directive-messaging';
import {Subscription} from 'rxjs';
import {Shape} from './shape';

@Directive({selector: '[appCircle]'})
export class CircleDirective {
  private subscription: Subscription;
  private messageService: MessageService;

  constructor(elem: ElementRef, renderer: Renderer2, messageService: MessageService) {
    const radius = 35;
    const startAngle = 0;
    const endAngle = 2 * Math.PI;
    const config = {
      width: 2 * radius,
      height: 2 * radius,
      color: 'blue',
      defaultX: 600,
      defaultY: 60,
      paint: {},
      clear: {},
      onTarget: {}
    };
    const ctx = elem.nativeElement.getContext('2d');
    config.paint = (x, y) => {
      ctx.beginPath();
      ctx.arc(x, y, radius, startAngle, endAngle);
      ctx.fillStyle = config.color;
      ctx.fill();
    };

    config.clear = (x, y) => {
      ctx.clearRect(x - radius, y - radius, config.width, config.height);
    };

    config.onTarget = (x, y, oldX, oldY) => {
      return Math.sqrt((x - oldX) * (x - oldX) + (y - oldY) * (y - oldY)) <= radius;
    };

    const shape = new Shape(config);
    this.messageService = messageService;
    this.messageService.subscribeForMouseMoveEvent((payload) => {
      shape.updateOnDrag(payload);
      shape.restoreOnMove();
    });
    this.messageService.subscribeForMouseUpEvent((payload) => {
      this.messageService.broadcast('CircleMouseUpEvent', payload);
    });
    this.messageService.subscribeForMouseDownEvent(shape.dragStart);

    this.messageService.subscribe('TimeOutMessage', shape.endGame);

    this.subscription = this.messageService.subscribe('CircleGetScore', shape.onScore);

  }
}
