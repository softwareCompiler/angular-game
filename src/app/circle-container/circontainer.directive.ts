import {Directive, ElementRef, ViewChild} from '@angular/core';

@Directive({
  // selector: '[appCircontainer]'
  selector: 'canvas[id="myCanvas"]'
})
export class CircontainerDirective {
  @ViewChild('myCanvas') canvasRef: ElementRef;

  public gameStart() {
    const width = 60;
    const height = 60;
    let color = 'red';
    const defaultX = 55;
    const defaultY = 75;
    let oldX = defaultX;
    let oldY = defaultY;
    let _x = defaultX, _y = defaultY;
    const canvas = document.getElementById('myCanvas');
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    //canvas.addEventListener('mousedown', myDown, false);
    canvas.addEventListener('mousemove', myMove, false);
    //canvas.addEventListener('mouseup', myUp, false);
    let paint = (x, y) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, height);
    }
    paint(oldX, oldY);
    let _draw = (x, y) => {
      ctx.clearRect(oldX, oldY, width, height);
      paint(x, y);
      oldY = y;
    }


    let update = (x, y) => {
      ctx.clearRect(_x, _y, width, height);
      paint(x, y);
      _x = x;
      _y = y;
    };

    function myMove(e) {
      let mx = e.pageX - canvas.offsetLeft;
      let my = e.pageY - canvas.offsetTop;

      update(mx, my);

    }

  }

  constructor() { }

}
