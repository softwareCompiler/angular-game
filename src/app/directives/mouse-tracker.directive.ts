import {Directive, ElementRef, Renderer2} from '@angular/core';
import {MessageService} from '../services/directive-messaging';


import * as R from 'ramda';

@Directive({selector: '[appMouseTracker]'})
export class MouseTrackerDirective {

  private messageService;

  constructor(elem: ElementRef, renderer: Renderer2, messageService: MessageService) {
    this.messageService = messageService;
    const canvas = elem.nativeElement;
    const mouseEvents = ['mousemove', 'mouseup', 'mousedown'];

    const mouseEventListener = e => {
      console.log('mouseMoveListener ', e.type);
      e.preventDefault();
      const x = e.pageX - canvas.offsetLeft;
      const y = e.pageY - canvas.offsetTop;
      messageService.broadcast(e.type, {x, y});
    };

    const curriedListener = R.curryN(3, canvas.addEventListener);
    const curriedListenerFn = curriedListener(R.__, mouseEventListener, false);
    const mouseActive = () => {
      mouseEvents.forEach(curriedListenerFn);
    };

    const curriedRemoveListener = R.curryN(3, canvas.removeEventListener);
    const curriedRemoveListenerFn = curriedRemoveListener(R.__, mouseEventListener, false);

    const mouseInactive = () => {
      mouseEvents.forEach(curriedRemoveListenerFn);
      // curriedRemoveListenerFn('mousemove');
      // curriedRemoveListenerFn('mouseup');
      // curriedRemoveListenerFn('mousedown');
    };

    this.messageService.subscribe('GameMessage', mouseActive);

    this.messageService.subscribe('TimeOutMessage', mouseInactive);

  }
}
