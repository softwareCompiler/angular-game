import {Directive, ElementRef, Renderer2} from '@angular/core';
import {MessageService} from '../services/directive-messaging';
import {Subscription} from 'rxjs';

@Directive({selector: '[circleContainer]',
  providers: [MessageService]})
export class RoundContainerDirective {
  private subscription: Subscription;
  private messageService: MessageService;
  constructor(elem: ElementRef, renderer: Renderer2, messageService: MessageService) {
    this.subscription = messageService.subscribe('CircleMouseUpEvent', (payload) => {
      let sx = payload.cx;
      let sy = payload.cy;
      getScore(sx,sy);
    });
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
    let outScore = 0;
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

      let isOnScoreBoard = (sx, sy) => {
        return Math.sqrt((sx - x) * (sx - x) + (sy - y) * (sy - y)) < scoreRadius;
      };
      
      let updateScore = () => {
        document.getElementById("scoreBoard").innerHTML = outScore;
      }

      let getScore = (sx, sy) => {
        if (isOnScoreBoard(sx, sy)) {
          score += 1;
          ctx.clearRect(x - radius, y - radius, width, height);
          paint();
          outScore = score;
          updateScore();
        }
      }

  }
}
