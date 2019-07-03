import {Directive, ElementRef, Renderer2} from '@angular/core';
import {MessageService} from '../services/directive-messaging';

@Directive({selector: '[appMouseTracker]'})
export class MouseTrackerDirective {

  private messageService: MessageService;

  constructor(elem: ElementRef, renderer: Renderer2, messageService: MessageService) {
    this.messageService = messageService;
    const canvas = elem.nativeElement;

    // 20190702: How to further reduce the duplication in this class?
    const mouseEventListener = e => {
      console.log('mouseMoveListener ', e.type);
      e.preventDefault();
      const x = e.pageX - canvas.offsetLeft;
      const y = e.pageY - canvas.offsetTop;
      messageService.broadcast(e.type, {x, y});
    };

    const mouseActive = () => {
      canvas.addEventListener('mousemove', mouseEventListener, false);
      canvas.addEventListener('mouseup', mouseEventListener, false);
      canvas.addEventListener('mousedown', mouseEventListener, false);
    };

    const mouseInactive = () => {
      canvas.removeEventListener('mousemove', mouseMoveListener, false);
      canvas.removeEventListener('mouseup', mouseUpListener, false);
      canvas.removeEventListener('mousedown', mouseDownListener, false);

    };

    this.messageService.subscribe('GameMessage', mouseActive);

    this.messageService.subscribe('TimeOutMessage', mouseInactive);

    const mouseMoveListener = e => {
      console.log('mouseMoveListener ', e.type);
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
