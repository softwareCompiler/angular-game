import {Directive, ElementRef, Renderer2, HostListener, EventEmitter, Output} from '@angular/core';

@Directive({selector: '[square]'})
export class SquareDirective {

  public cx;
  public cy;
  @Output() public sqPositionX = new EventEmitter();
  @Output() public sqPositionY = new EventEmitter();


  constructor(elem: ElementRef, renderer: Renderer2) {
    const ctx = elem.nativeElement.getContext('2d');
    const canvas = elem.nativeElement
    canvas.addEventListener('mousedown', myDown, false);
    canvas.addEventListener('mousemove', myMove, false);
    canvas.addEventListener('mouseup', myUp, false);
    const width = 60;
    const height = 60;
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

    function myUp(e) {
      this.cx = e.pageX - canvas.offsetLeft;
      this.cy = e.pageY - canvas.offsetTop;
      this.sqPositionX.emit(this.cx);
      this.sqPositionY.emit(this.cy);

      console.log('cx:', this.cx);
      console.log('cy:', this.cy);
      // getScore(cx, cy);
    }
  }
}
