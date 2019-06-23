import {Directive, ElementRef, Renderer2} from '@angular/core';
import {MessageService} from '../services/directive-messaging';
import {Subscription} from 'rxjs';
import {Shape} from './shape';


@Directive({selector: '[circle]'})
export class CircleDirective {
  private subscription: Subscription;
  private messageService: MessageService;

  constructor(elem: ElementRef, renderer: Renderer2, messageService: MessageService) {
    this.messageService = messageService;
    console.log("CircleDirective messageService", messageService);
    const ctx = elem.nativeElement.getContext('2d');
    const canvas = elem.nativeElement;
    // this.messageService.subscribe('GameMessage', (gameStatus) => {
      canvas.addEventListener('mousedown', myDown, false);
      canvas.addEventListener('mousemove', myMove, false);
      canvas.addEventListener('mouseup', myUp, false);
      console.log("circleMessage", "get it")
    // });
    this.subscription = messageService.subscribe('CircleGetScore', (payload) => {
      shape.onScore();
    });
    //let randomNumber;
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

    config.paint = (x, y) => {
      ctx.beginPath();
      ctx.arc(x, y, radius, startAngle, endAngle);
      ctx.fillStyle = config.color;
      ctx.fill();
    }

    config.clear = (x, y) => {
      ctx.clearRect(x - radius, y - radius, config.width, config.height);
    }

    config.onTarget = (x, y, oldX, oldY) => {
      return Math.sqrt((x - oldX) * (x - oldX) + (y - oldY) * (y - oldY)) <= radius;
    }

    const shape = new Shape(config);


    function myMove(e) {
      const mx = e.pageX - canvas.offsetLeft;
      const my = e.pageY - canvas.offsetTop;
      shape.updateOnDrag(mx, my);
      shape.restoreOnMove();
    }

    function myDown(e) {
      e.preventDefault();
      const newX = e.pageX - canvas.offsetLeft;
      const newY = e.pageY - canvas.offsetTop;
      shape.dragStart(newX, newY);
    }

    function myUp(e){
      const cx = e.pageX - canvas.offsetLeft;
      const cy = e.pageY - canvas.offsetTop;
      messageService.broadcast('CircleMouseUpEvent', {cx, cy});
    }
  }
}
