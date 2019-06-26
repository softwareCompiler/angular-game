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

    // This is better than what I suggested because you have better control when everything shall start.
    this.messageService.subscribe('GameMessage', (payload) => {
      mouseActive();
    });

    this.messageService.subscribe('TimeOutMessage', (payload)=> {
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
    const mouseActive = () => {
      canvas.addEventListener('mousemove', mouseMoveListener, false);

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
    };

    const mouseInactive = () => {
      canvas.removeEventListener('mousedown', mouseMoveListener, true);
      canvas.removeEventListener('mousemove', e => {
        // e.preventDefault();
        // const mx = e.pageX - canvas.offsetLeft;
        // const my = e.pageY - canvas.offsetTop;
        // messageService.broadcast('mousemove', {mx, my});

      }, true);
      canvas.removeEventListener('mouseup', e => {
        // e.preventDefault();
        // const cx = e.pageX - canvas.offsetLeft;
        // const cy = e.pageY - canvas.offsetTop;
        // messageService.broadcast('mouseup', {cx, cy});

      }, true);
    };
  }
}
