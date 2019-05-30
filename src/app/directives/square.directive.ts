import {Directive, ElementRef, Renderer2, HostListener, EventEmitter, Output} from '@angular/core';
import {MessageService} from '../services/directive-messaging';
import {Subscription} from 'rxjs';


@Directive({selector: '[square]', providers: [MessageService]})
export class SquareDirective {
  private subscription: Subscription;
  private messageService: MessageService;

  constructor(elem: ElementRef, renderer: Renderer2, messageService: MessageService) {
    this.messageService = messageService;
    const ctx = elem.nativeElement.getContext('2d');
    const canvas = elem.nativeElement;
    canvas.addEventListener('mousedown', myDown, false);
    canvas.addEventListener('mousemove', myMove, false);
    canvas.addEventListener('mouseup', event => {
      const cx = event.pageX - canvas.offsetLeft;
      const cy = event.pageY - canvas.offsetTop;
      this.messageService.broadcast('SquareMouseUpEvent', {cx, cy});
    }, false);

    this.subscription = messageService.subscribe('SquareGetScore', (payload) => {
      isScore = payload.isSquareScore;
      onScore();
      console.log('isScore', isScore);
    });

    const width = 60;
    const height = 60;
    const color = 'red';
    const defaultX = 25;
    const defaultY = 35;
    let oldX = defaultX;
    let oldY = defaultY;
    const _x = defaultX;
    const _y = defaultY;
    let draggable = false;
    let timer = null;
    let isScore = false;

    const paint = (x, y) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, height);
    };

    paint(oldX, oldY);

    function _draw(x, y){
      ctx.clearRect(oldX, oldY, width, height);
      paint(x, y);
      oldY = y;
    }

    function autoDrop(){
      clearTimer();
      timer = setInterval(() => {
        _draw(oldX, oldY + 1);
      }, 50);
    }

    const onTarget = (x, y) => {
      return x < oldX + width && x > oldX && y < oldY + height && y > oldY;
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
    };

    const clearTimer = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const onScore = function () {
      if (isScore) {
        clearTimer();
        draggable = false;
        oldX = defaultX;
        oldY = defaultY;
        paint(oldX, oldY);
        const randomNumber = Math.random();
        if (0 <= randomNumber && randomNumber < 0.5) {
          autoDrop();
        }
      }
    };
  }
}
