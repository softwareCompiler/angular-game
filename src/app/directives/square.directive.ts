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
    const canvas = elem.nativeElement;
    // const canvasDirective = new MouseTrackerDirective(elem, renderer, messageService);
    this.messageService = messageService;
    this.messageService.subscribe('GameMessage', (payload) => {
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

    });
    this.messageService.subscribe('TimeOutMessage', (payload) => {
      // canvas.removeEventListener('mousedown');
      // canvas.removeEventListener('mousemove');
      // canvas.removeEventListener('mouseup');
      // const canvasDirective = new MouseTrackerDirective(elem, renderer);
      // canvasDirective.mouseInactive();
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
    // function myMove(e) {
    //   e.preventDefault();
    //   const mx = e.pageX - canvas.offsetLeft;
    //   const my = e.pageY - canvas.offsetTop;
    //   shape.updateOnDrag(mx, my);
    //   shape.restoreOnMove();
    // }
    //
    // function myDown(e) {
    //   e.preventDefault();
    //   const newX = e.pageX - canvas.offsetLeft;
    //   const newY = e.pageY - canvas.offsetTop;
    //   shape.dragStart(newX, newY);
    // }
    //
    // function myUp(e) {
    //   e.preventDefault();
    //   const cx = e.pageX - canvas.offsetLeft;
    //   const cy = e.pageY - canvas.offsetTop;
    //   messageService.broadcast('SquareMouseUpEvent', {cx, cy});
    // }

  }
}
