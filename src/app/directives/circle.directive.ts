import {Directive, ElementRef, Renderer2} from '@angular/core';
import {MessageService} from '../services/directive-messaging';
import {Subscription} from 'rxjs';


@Directive({
  selector: '[circle]', providers: [MessageService]
})
export class CircleDirective {
  private subscription: Subscription;
  private messageService: MessageService;

  constructor(elem: ElementRef, renderer: Renderer2, messageService: MessageService) {
    this.messageService = messageService;
    const ctx = elem.nativeElement.getContext('2d');
    const canvas = elem.nativeElement
    canvas.addEventListener('mousedown', myDown, false);
    canvas.addEventListener('mousemove', myMove, false);
    canvas.addEventListener('mouseup', event => {
      const cx = event.pageX - canvas.offsetLeft;
      const cy = event.pageY - canvas.offsetTop;
      this.messageService.broadcast('CircleMouseUpEvent', {cx, cy});
    }, false);
    this.subscription = messageService.subscribe('CircleGetScore', (payload) => {
      isScore = payload.isCircleScore;
      onScore();
      // console.log('isScore', isScore);
    });
    let randomNumber;
    const radius = 35;
    const color = 'blue';
    const defaultX = 600;
    const defaultY = 60;
    let draggable = false;
    const width = 2 * radius;
    const height = 2 * radius;
    const startAngle = 0;
    const endAngle = 2 * Math.PI;
    let oldX = defaultX;
    let oldY = defaultY;
    let timer = null;
    let isScore = false;

    const paint = (x, y) => {
      ctx.beginPath();
      ctx.arc(x, y, radius, startAngle, endAngle);
      ctx.fillStyle = color;
      ctx.fill();
    };

    paint(oldX, oldY);

    function _draw(x, y) {
      ctx.clearRect(oldX - radius, oldY - radius, width, height);
      paint(x, y);
      oldY = y;
    }

    function autoDrop() {
      clearTimer();
      timer = setInterval(function () {
        _draw(oldX, oldY + 1);
      }, 50);
    }


    const onTarget = (x, y) => {
      return Math.sqrt((x - oldX) * (x - oldX) + (y - oldY) * (y - oldY)) <= radius;
    };

    const dragStart = (x, y) => {
      if (onTarget(x, y)) {
        draggable = true;
      }
    };

    const restoreOnMove = (sx, sy) => {
      paint(oldX, oldY);
    };

    const updateOnDrag = (x, y) => {
      if (draggable) {
        _draw(x, y);
        oldX = x;
      }
    };

    const isActive = () => {
      return draggable;
    };

    function myMove(e) {
      const mx = e.pageX - canvas.offsetLeft;
      const my = e.pageY - canvas.offsetTop;
      updateOnDrag(mx, my);
      restoreOnMove(mx, my);
    }

    function myDown(e) {
      e.preventDefault();
      const newX = e.pageX - canvas.offsetLeft;
      const newY = e.pageY - canvas.offsetTop;
      dragStart(newX, newY);
    }

    const endGame = () => {
      clearTimer();
    }

    const clearTimer = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const onScore = () => {
      clearTimer();
      draggable = false;
      oldX = defaultX;
      oldY = defaultY;
      paint(oldX, oldY);
      randomNumber = Math.random();
      if (randomNumber >= 0.5) {
        autoDrop();
      }
    }
  }
}
