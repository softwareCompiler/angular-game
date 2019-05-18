import {Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[circle]'
})
export class CircleDirective {

  constructor(elem: ElementRef, renderer: Renderer2) {
    const ctx = elem.nativeElement.getContext('2d');
    let randomNumber;
    let radius = 35;
    let color = 'blue';
    let defaultX = 600;
    let defaultY = 60;
    let draggable = false;
    let width = 2 * radius;
    let height = 2 * radius;
    let startAngle = 0;
    let endAngle = 2 * Math.PI;
    let oldX = defaultX;
    let oldY = defaultY;
    let timer = null;

    let paint = (x, y) => {
      ctx.beginPath();
      ctx.arc(x, y, radius, startAngle, endAngle);
      ctx.fillStyle = color;
      ctx.fill();
    }

    paint(oldX, oldY);

  }

}
