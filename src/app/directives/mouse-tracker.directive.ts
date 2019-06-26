import {Directive, ElementRef, Renderer2} from '@angular/core';
import {MessageService} from '../services/directive-messaging';


@Directive({selector: '[MouseTracker]'})
export class MouseTrackerDirective {

  // mouseActive: any;
  // mouseInactive: any;
  // myDown: any;
  // myMove: any;
  // myUp: any;
  constructor(elem: ElementRef, renderer: Renderer2, messageService: MessageService) {

    const canvas = elem.nativeElement;

    canvas.addEventListener('mousemove', e => {
      e.preventDefault();
      const mx = e.pageX - canvas.offsetLeft;
      const my = e.pageY - canvas.offsetTop;
      messageService.broadcast('mousemove', {mx, my});

    }, false);
    // this.mouseActive = () => {
    //   canvas.addEventListener('mousedown', this.myDown, false);
    //   canvas.addEventListener('mousemove', this.myMove, false);
    //   canvas.addEventListener('mouseup', this.myUp, false);
    // };
    // this.mouseInactive = () => {
    //   canvas.removeEventListener('mousedown', this.myDown);
    //   canvas.removeEventListener('mousemove', this.myMove);
    //   canvas.removeEventListener('mouseup', this.myUp);
    // };
    //
    // this.myMove = function myMove(e) {
    //   e.preventDefault();
    //   const mx = e.pageX - canvas.offsetLeft;
    //   const my = e.pageY - canvas.offsetTop;
    //   return {mx, my};
    // };
    //
    // this.myDown = function myDown(e) {
    //   e.preventDefault();
    //   const newX = e.pageX - canvas.offsetLeft;
    //   const newY = e.pageY - canvas.offsetTop;
    //   return {newX, newY};
    // };
    //
    // this.myUp = function myUp(e) {
    //   e.preventDefault();
    //   const cx = e.pageX - canvas.offsetLeft;
    //   const cy = e.pageY - canvas.offsetTop;
    //   return {cx, cy};
    // };
  }
}
