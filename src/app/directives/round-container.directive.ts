import {Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({selector: '[circleContainer]'})
export class RoundContainerDirective {
  constructor(elem: ElementRef, renderer: Renderer2) {
    const ctx = elem.nativeElement.getContext('2d');
    const x = 450;
    const y = 370;
    const radius = 50;
    const scoreRadius = 10;
    let width = 2 * radius;
    let height = 2 * radius;
    const startAngle = 0;
    let endAngle = 2 * Math.PI;
    let score = 0;
    let paint = () => {
      let text = ' ' + score;
      const fontHeight = 30;
      let color = 'black';
      const textX = 435;
      const textY = 370;
      ctx.beginPath();
      ctx.arc(x, y, radius, startAngle, endAngle);
      ctx.lineWidth = 4;
      ctx.strokeStyle = 'orange';
      ctx.stroke();
      ctx.font = fontHeight + 'px Arial';
      ctx.fillStyle = color;
      ctx.fillText(text, textX, textY);
    }

    paint();

  }
}
