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

    const mouseActive = () => {
      canvas.addEventListener('mousemove', mouseMoveListener, false);
      canvas.addEventListener('mouseup', mouseUpListener, false);
      canvas.addEventListener('mousedown', mouseDownListener, false);
    };

    const mouseInactive = () => {
      canvas.removeEventListener('mousemove', mouseMoveListener, false);
      canvas.removeEventListener('mouseup', mouseUpListener, false);
      canvas.removeEventListener('mousedown', mouseDownListener, false);

    };

    this.messageService.subscribe('GameMessage', mouseActive);

    this.messageService.subscribe('TimeOutMessage', mouseInactive);

    const mouseMoveListener = e => {
      e.preventDefault();
      const x = e.pageX - canvas.offsetLeft;
      const y = e.pageY - canvas.offsetTop;
      messageService.broadcast('mousemove', {x, y});
    };

    const mouseUpListener = e => {
      e.preventDefault();
      const x = e.pageX - canvas.offsetLeft;
      const y = e.pageY - canvas.offsetTop;
      messageService.broadcast('mouseup', {x, y});
    };

    const mouseDownListener = e => {
      e.preventDefault();
      const x = e.pageX - canvas.offsetLeft;
      const y = e.pageY - canvas.offsetTop;
      messageService.broadcast('mousedown', {x, y});
    };

  }
}
