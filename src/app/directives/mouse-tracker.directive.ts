import {Directive, ElementRef, Renderer2} from '@angular/core';
import {MessageService} from '../services/directive-messaging';
import {Subscription} from 'rxjs';


@Directive({selector: '[MouseTracker]'})
export class MouseTrackerDirective {

  private subscription: Subscription;
  private messageService: MessageService;

  constructor(elem: ElementRef, renderer: Renderer2, messageService: MessageService) {
    this.messageService = messageService;
    const canvas = elem.nativeElement;

    this.messageService.subscribe('GameMessage', (payload) => {
      mouseActive();
    });

    this.messageService.subscribe('TimeOutMessage', (payload) => {
      console.log('timeout', payload);
      mouseInactive();

    });

    const mouseMoveListener = e => {
      e.preventDefault();
      const mx = e.pageX - canvas.offsetLeft;
      const my = e.pageY - canvas.offsetTop;
      console.log('mx:', mx);
      console.log('my:', my);
      messageService.broadcast('mousemove', {mx, my});
    };

    const mouseUpListener = e => {
      e.preventDefault();
      const cx = e.pageX - canvas.offsetLeft;
      const cy = e.pageY - canvas.offsetTop;
      console.log('cx:', cx);
      console.log('cy:', cy);
      messageService.broadcast('mouseup', {cx, cy});
    };

    const mouseDownListener = e => {
      e.preventDefault();
      const newX = e.pageX - canvas.offsetLeft;
      const newY = e.pageY - canvas.offsetTop;
      messageService.broadcast('mousedown', {newX, newY});
    };


    const mouseActive = () => {
      canvas.addEventListener('mousemove', mouseMoveListener, false);
      canvas.addEventListener('mouseup', mouseUpListener, false);
      canvas.addEventListener('mousedown', mouseDownListener, false);
    };

    const mouseInactive = () => {
      canvas.removeEventListener('mousemove', mouseMoveListener, true);
      canvas.removeEventListener('mouseup', mouseUpListener, true);
      canvas.removeEventListener('mousedown', mouseDownListener, true);

    };
  }
}
