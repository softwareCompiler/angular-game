import {Directive, ElementRef, Renderer2} from '@angular/core';
import {MessageService} from '../services/directive-messaging';

// change the select from square to appSquare, following the suggestion from WebStorm.
@Directive({selector: '[square]', providers: [MessageService]})
export class SquareDirective {

  private  messageService: MessageService;

  constructor(elem: ElementRef, renderer: Renderer2, messageService: MessageService) {
    this.messageService = messageService;
    const ctx = elem.nativeElement.getContext('2d');
    const canvas = elem.nativeElement
    // Similar code is present in multiple files. Use a super class to reduce duplication.
    canvas.addEventListener('mousedown', myDown, false);
    canvas.addEventListener('mousemove', myMove, false);
    canvas.addEventListener('mouseup', event => {
      let cx = event.pageX - canvas.offsetLeft;
      let cy = event.pageY - canvas.offsetTop;
      this.messageService.broadcast('SquareMouseUpEvent', {cx, cy});
    }, false);

    const width = 60;
    const height = 60;
    // change let color to const color, following the suggestion from WebStorm.
    let color = 'red';
    const defaultX = 25;
    const defaultY = 35;
    let oldX = defaultX;
    let oldY = defaultY;
    let _x = defaultX, _y = defaultY;
    let draggable = false;
    let timer = null;
    let paint = (x, y) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, height);
    }
    paint(oldX, oldY);
    let _draw = (x, y) => {
      ctx.clearRect(oldX, oldY, width, height);
      paint(x, y);
      oldY = y;
    };

    let onTarget = (x, y) => {
      return x < oldX + width && x > oldX && y < oldY + height && y > oldY;
    };

    let dragStart = (x, y) => {
      if (onTarget(x, y)) {
        draggable = true;
      }
    };

    let updateOnDrag = (x, y) => {
      if (draggable) {
        _draw(x, y);
        oldX = x;
      }
    };

    function myMove(e) {
      let mx = e.pageX - canvas.offsetLeft;
      let my = e.pageY - canvas.offsetTop;

      updateOnDrag(mx, my);
    }

    function myDown(e) {
      e.preventDefault();
      let newX = e.pageX - canvas.offsetLeft;
      let newY = e.pageY - canvas.offsetTop;
      dragStart(newX, newY);
    }
    //
    // function myUp(e) {
    //   this.cx = e.pageX - canvas.offsetLeft;
    //   this.cy = e.pageY - canvas.offsetTop;
    //   // this.sqPositionX.emit(this.cx);
    //   // this.sqPositionY.emit(this.cy);
    //
    //   console.log('cx:', this.cx);
    //   console.log('cy:', this.cy);

    // this.messageService.broadcast('SquareMouseUpEvent', this.cx);
      // getScore(cx, cy);
    // }
  }
}
