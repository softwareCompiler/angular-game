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
    this.messageService.subscribe('GameMessage', (payload) => {
      // add code here to handle end of game.
    });
    this.messageService.subscribe('mousemove', (payload) => {
      shape.updateOnDrag(payload);
      shape.restoreOnMove();
    });
    this.messageService.subscribe('mouseup', (payload) => {
      this.messageService.broadcast('SquareMouseUpEvent', payload);
    });
    this.messageService.subscribe('mousedown', shape.dragStart);


    // Try to understand one of the most important techniques
    // for functional programming; passing functions just like primitive values.
    this.messageService.subscribe('TimeOutMessage', shape.endGame);
    // The 3 lines below are equivalent to the line above.
    //   this.messageService.subscribe('TimeOutMessage', (payload) => {
    //   shape.endGame();
    // });

    this.subscription = this.messageService.subscribe('SquareGetScore', shape.onScore);
  }
}
