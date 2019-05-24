import {Directive, ElementRef, Renderer2} from '@angular/core';
import {MessageService} from '../services/directive-messaging';


@Directive({
  selector: '[circle]', providers: [MessageService]
})
export class CircleDirective {
  private  messageService: MessageService;

  constructor(elem: ElementRef, renderer: Renderer2, messageService: MessageService) {
    this.messageService = messageService;

    const ctx = elem.nativeElement.getContext('2d');
    const canvas = elem.nativeElement
    canvas.addEventListener('mousedown', myDown, false);
    canvas.addEventListener('mousemove', myMove, false);
    canvas.addEventListener('mouseup', event => {
      let cx = event.pageX - canvas.offsetLeft;
      let cy = event.pageY - canvas.offsetTop;
      this.messageService.broadcast('CircleMouseUpEvent', {cx, cy});
    }, false);
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

      let _draw = (x, y) => {
        ctx.clearRect(oldX - radius, oldY - radius, width, height);
        paint(x, y);
        oldY = y;
      }

     let onTarget = (x, y) => {
        return Math.sqrt((x - oldX) * (x - oldX) + (y - oldY) * (y - oldY)) <= radius;
      }

      let updateOnDrag =(x, y) => {
        if (draggable) {
          _draw(x, y);
          oldX = x;
        }
      }

      let dragStart = (x, y) => {
        if (onTarget(x, y)) {
          draggable = true;
        }
      }

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

  }

}
