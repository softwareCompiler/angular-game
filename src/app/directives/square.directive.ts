import {Directive, ElementRef, Renderer2} from '@angular/core';
import {MessageService} from '../services/directive-messaging';
import {Subscription} from 'rxjs';
import {Shape} from './shape';

@Directive({selector: '[appSquare]'})
export class SquareDirective {
  private subscription: Subscription;
  private messageService: MessageService;

  constructor(elem: ElementRef, renderer: Renderer2, messageService: MessageService) {
    const ctx = elem.nativeElement.getContext('2d');
    const config = {
      width: 60,
      height: 60,
      color: 'red',
      defaultX: 25,
      defaultY: 35,
      paint: {},
      clear: {},
      onTarget: {}
    };
    config.paint = (x, y) => {
      ctx.fillStyle = config.color;
      ctx.fillRect(x, y, config.width, config.height);
    };
    config.clear = (x, y) => {
      ctx.clearRect(x, y, config.width, config.height);
    };

    config.onTarget = (x, y, oldX, oldY) => {
      return x < oldX + config.width && x > oldX && y < oldY + config.height && y > oldY;
    };
    const shape = new Shape(config);
    this.messageService = messageService;
    this.messageService.subscribeForMouseMoveEvent((payload) => {
      shape.updateOnDrag(payload);
      shape.restoreOnMove();
    });
    this.messageService.subscribeForMouseUpEvent((payload) => {
      this.messageService.broadcast('SquareMouseUpEvent', payload);
    });
    this.messageService.subscribeForMouseDownEvent(shape.dragStart);

    this.messageService.subscribe('TimeOutMessage', shape.endGame);

    this.subscription = this.messageService.subscribe('SquareGetScore', shape.onScore);
  }
}
