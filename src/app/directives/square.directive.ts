import {Directive, ElementRef, Renderer2} from '@angular/core';
import {MessageService} from '../services/directive-messaging';
import {Subscription} from 'rxjs';
import {Shape} from './shape';

// import {MouseTrackerDirective} from './canvas.directive';

@Directive({selector: '[square]'})
export class SquareDirective {
  private subscription: Subscription;
  private messageService: MessageService;

  constructor(elem: ElementRef, renderer: Renderer2, messageService: MessageService) {
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
    const ctx = elem.nativeElement.getContext('2d');
    //const canvas = elem.nativeElement;
    this.messageService = messageService;

    this.messageService.subscribe('mousemove', (payload) => {
      shape.updateOnDrag(payload.mx, payload.my);
      shape.restoreOnMove();
    });
    this.messageService.subscribe('mouseup', (payload) => {
      const cx = payload.cx;
      const cy = payload.cy;
      messageService.broadcast('SquareMouseUpEvent', {cx, cy});
    });
    this.messageService.subscribe('mousedown', (payload) => {
      shape.dragStart(payload.newX, payload.newY);
    });


    this.messageService.subscribe('TimeOutMessage', (payload) => {
      shape.endGame();
    });

    this.subscription = this.messageService.subscribe('SquareGetScore', (payload) => {
      shape.onScore();
    });

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

  }
}
