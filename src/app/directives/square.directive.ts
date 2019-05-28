import {Directive, ElementRef, Renderer2, HostListener, EventEmitter, Output} from '@angular/core';
import {MessageService} from '../services/directive-messaging';
import {Subscription} from 'rxjs';


@Directive({selector: '[square]', providers: [MessageService]})
export class SquareDirective {
  private subscription: Subscription;
  private  messageService: MessageService;

  // public cx;
  // public cy;
  // @Output() public sqPositionX = new EventEmitter();
  // @Output() public sqPositionY = new EventEmitter();


  constructor(elem: ElementRef, renderer: Renderer2, messageService: MessageService) {
    this.messageService = messageService;
    const ctx = elem.nativeElement.getContext('2d');
    const canvas = elem.nativeElement
    canvas.addEventListener('mousedown', myDown, false);
    canvas.addEventListener('mousemove', myMove, false);
    // canvas.addEventListener('mouseup', myUp, false);

    canvas.addEventListener('mouseup', event => {
      let cx = event.pageX - canvas.offsetLeft;
      let cy = event.pageY - canvas.offsetTop;
      this.messageService.broadcast('SquareMouseUpEvent', {cx, cy});
    }, false);

    this.subscription = messageService.subscribe('SquareGetScore', (payload) => {
      let isScore = payload.isSquareScore;
      onScore();
      console.log('isScore', isScore);

    });

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
    let isScore = false;

    let paint = (x, y) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, height);
    };

    paint(oldX, oldY);

    let _draw = (x, y) => {
      ctx.clearRect(oldX, oldY, width, height);
      paint(x, y);
      oldY = y;
    };

      let autoDrop = () => {
        clearTimer();
        timer = setInterval(function () {
          _draw(oldX, oldY + 1);
        }, 50);
      };

    let onTarget = (x, y) => {
      return x < oldX + width && x > oldX && y < oldY + height && y > oldY;
    };

    let dragStart = (x, y) => {
      if (onTarget(x, y)) {
        draggable = true;
      }
    };

      let restoreOnMove = (sx, sy) => {
        paint(oldX, oldY);
      };

    let updateOnDrag = (x, y) => {
      if (draggable) {
        _draw(x, y);
        oldX = x;
      }
    };

      let isActive = () => {
        return draggable;
      };

    function myMove(e) {
      let mx = e.pageX - canvas.offsetLeft;
      let my = e.pageY - canvas.offsetTop;

      updateOnDrag(mx, my);
      restoreOnMove(mx, my);
    };

    function myDown(e) {
      e.preventDefault();
      let newX = e.pageX - canvas.offsetLeft;
      let newY = e.pageY - canvas.offsetTop;
      dragStart(newX, newY);
    };

      let endGame = () => {
        clearTimer();
      };

      let clearTimer = () => {
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
      };

    let onScore = function () {
      if (isScore) {
        clearTimer();
        draggable = false;
        let oldX = defaultX;
        let oldY = defaultY;
        paint(oldX, oldY);
        let randomNumber = Math.random();
        if (0 <= randomNumber && randomNumber < 0.5) {
          this.autoDrop();
        }
      }
    };
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
