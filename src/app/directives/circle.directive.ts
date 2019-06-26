import {Directive, ElementRef, Renderer2} from '@angular/core';
import {MessageService} from '../services/directive-messaging';
import {Subscription} from 'rxjs';
import {Shape} from './shape';


@Directive({selector: '[circle]'})
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
    this.messageService = messageService;
    const canvas = elem.nativeElement;
    // We shall no longer have the code that add and remove listeners because we have MouseTrcker now.
    // We only need to subscribe to the mouse events.
    // this.messageService.subscribe('GameMessage', (payload) => {
    //   canvas.addEventListener('mousedown', myDown, false);
    //   canvas.addEventListener('mousemove', myMove, false);
    //   canvas.addEventListener('mouseup', myUp, false);
    //   console.log('GameMessage', payload.gameStart);
    // });
    this.messageService.subscribe('TimeOutMessage', (payload) => {
      // canvas.removeEventListener('mousedown', myDown);
      // canvas.removeEventListener('mousemove', myMove);
      // canvas.removeEventListener('mouseup', myUp);
      shape.endGame();
    });

    this.subscription = messageService.subscribe('CircleGetScore', (payload) => {
      shape.onScore();
    });

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

    // myMove, myDown, and myUp have lots of duplicate. They should be moved to the canvas directive mentioned above.
    function myMove(e) {
      // The 5 lines below are no longer necessary. Think about what to do instead.
      e.preventDefault();
      const mx = e.pageX - canvas.offsetLeft;
      const my = e.pageY - canvas.offsetTop;
      console.log('mx2:', mx);
      console.log('my2:', my);
      shape.updateOnDrag(mx, my);
      shape.restoreOnMove();
    }

    function myDown(e) {
      // The 3 lines below are no longer necessary.
      e.preventDefault();
      const newX = e.pageX - canvas.offsetLeft;
      const newY = e.pageY - canvas.offsetTop;
      shape.dragStart(newX, newY);
    }

    function myUp(e) {
      // The 3 lines below are no longer necessary.
      e.preventDefault();
      const cx = e.pageX - canvas.offsetLeft;
      const cy = e.pageY - canvas.offsetTop;
      messageService.broadcast('CircleMouseUpEvent', {cx, cy});
    }
  }
}
