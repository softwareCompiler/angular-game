import {Directive, ElementRef, Renderer2} from '@angular/core';
import {MessageService} from '../services/directive-messaging';
import {Subscription} from 'rxjs';


@Directive({selector: '[MouseTracker]'})
export class MouseTrackerDirective {
  private subscription: Subscription;
  private messageService: MessageService;
  // mouseActive: any;
  // mouseInactive: any;
  // myDown: any;
  // myMove: any;
  // myUp: any;
  constructor(elem: ElementRef, renderer: Renderer2, messageService: MessageService) {
    this.messageService = messageService;
    const canvas = elem.nativeElement;

    canvas.addEventListener('mousemove', e => {
      e.preventDefault();
      const mx = e.pageX - canvas.offsetLeft;
      const my = e.pageY - canvas.offsetTop;
      console.log('mx:', mx);
      console.log('my:', my);
      messageService.broadcast('mousemove', {mx, my});

    }, false);

    canvas.addEventListener('mouseup', e => {
      e.preventDefault();
      const cx = e.pageX - canvas.offsetLeft;
      const cy = e.pageY - canvas.offsetTop;
      console.log('cx:', cx);
      console.log('cy:', cy);
      messageService.broadcast('mouseup', {cx, cy});

    }, false);

    canvas.addEventListener('mousedown', e => {
      e.preventDefault();
      const newX = e.pageX - canvas.offsetLeft;
      const newY = e.pageY - canvas.offsetTop;
      console.log('newX:', newX);
      console.log('newY:', newY);
      messageService.broadcast('mousedown', {newX, newY});

    }, false);

    this.messageService.subscribe('TimeOutMessage', (payload) => {
      canvas.removeEventListener('mousedown', e => {
        e.preventDefault();
        const newX = e.pageX - canvas.offsetLeft;
        const newY = e.pageY - canvas.offsetTop;
        messageService.broadcast('mousedown', {newX, newY});

      });
      canvas.removeEventListener('mousemove', e => {
        e.preventDefault();
        const mx = e.pageX - canvas.offsetLeft;
        const my = e.pageY - canvas.offsetTop;
        messageService.broadcast('mousemove', {mx, my});

      });
      canvas.removeEventListener('mouseup', e => {
        e.preventDefault();
        const cx = e.pageX - canvas.offsetLeft;
        const cy = e.pageY - canvas.offsetTop;
        messageService.broadcast('mouseup', {cx, cy});

      });
    });


  }
}
