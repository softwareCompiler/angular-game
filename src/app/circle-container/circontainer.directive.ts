import {Directive, ElementRef, Renderer2, ViewChild} from '@angular/core';

@Directive({
  // selector: '[appCircontainer]'
  selector: 'canvas[id="myCanvas"]'
})
export class CircontainerDirective {

    // constructor(elem: ElementRef, renderer: Renderer2) {
    //   const width = 60;
    //   const height = 60;
    //   let color = 'red';
    //   const defaultX = 55;
    //   const defaultY = 75;
    //   let oldX = defaultX;
    //   let oldY = defaultY;
    //   let _x = defaultX, _y = defaultY;
    //   const ctx = elem.nativeElement.getContext('2d');
    //   let paint = (x, y) => {
    //     ctx.fillStyle = color;
    //     ctx.fillRect(x, y, width, height);
    //   }
    //   paint(oldX, oldY);
    // }


}
