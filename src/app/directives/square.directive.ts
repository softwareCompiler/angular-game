import {Directive, ElementRef, Renderer2} from '@angular/core';
import {MessageService} from '../services/directive-messaging';
import {Subscription} from 'rxjs';
import {Shape} from './shape';

<<<<<<< HEAD
// change the select from square to appSquare, following the suggestion from WebStorm.
@Directive({selector: '[square]', providers: [MessageService]})
export class SquareDirective {

  private  messageService: MessageService;
=======

@Directive({selector: '[square]', providers: [MessageService, Shape]})
export class SquareDirective {
  private subscription: Subscription;
  private messageService: MessageService;
 // private shape: Shape;

>>>>>>> 4b426bdfd3e788f0bfc28ce3add035fb6366f1c6

  constructor(elem: ElementRef, renderer: Renderer2, messageService: MessageService) {
    this.messageService = messageService;
  //  this.shape = shape;
    const ctx = elem.nativeElement.getContext('2d');
<<<<<<< HEAD
    const canvas = elem.nativeElement
    // Similar code is present in multiple files. Use a super class to reduce duplication.
=======
    const canvas = elem.nativeElement;
>>>>>>> 4b426bdfd3e788f0bfc28ce3add035fb6366f1c6
    canvas.addEventListener('mousedown', myDown, false);
    canvas.addEventListener('mousemove', myMove, false);
    canvas.addEventListener('mouseup', event => {
      const cx = event.pageX - canvas.offsetLeft;
      const cy = event.pageY - canvas.offsetTop;
      this.messageService.broadcast('SquareMouseUpEvent', {cx, cy});
    }, false);

<<<<<<< HEAD
    const width = 60;
    const height = 60;
    // change let color to const color, following the suggestion from WebStorm.
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
=======
    this.subscription = messageService.subscribe('SquareGetScore', (payload) => {
      isScore = payload.isSquareScore;
     // onScore();
    });

    const config = {
      width: 60,
      height: 60,
      color: 'red',
      defaultX: 25,
      defaultY: 35,

    paint(x, y) {
      ctx.fillStyle = this.color;
      ctx.fillRect(x, y, this.width, this.height);
    },
>>>>>>> 4b426bdfd3e788f0bfc28ce3add035fb6366f1c6

    clear(x, y){
      ctx.clearRect(x, y, this.width, this.height);
    },

    onTarget(x, y, oldX, oldY) {
      return x < oldX + this.width && x > oldX && y < oldY + this.height && y > oldY;
    },

  };
    const shape = new Shape(config);

    function CloneObject(origianlObj, obj) {
      for (let key in origianlObj) {
        obj[key] = origianlObj[key];
      }
      return obj;
    }

    CloneObject(shape, this);
    // const width = 60;
    // const height = 60;
    // const color = 'red';
    // const defaultX = 25;
    // const defaultY = 35;
    // let oldX = defaultX;
    // let oldY = defaultY;
    // const _x = defaultX;
    // const _y = defaultY;
    // let draggable = false;
    // let timer = null;
    let isScore = false;
    //
    // const paint = (x, y) => {
    //   ctx.fillStyle = color;
    //   ctx.fillRect(x, y, width, height);
    // };
    //
    // paint(oldX, oldY);
    //
    // function _draw(x, y){
    //   ctx.clearRect(oldX, oldY, width, height);
    //   paint(x, y);
    //   oldY = y;
    // }
    //
    // function autoDrop(){
    //   clearTimer();
    //   timer = setInterval(() => {
    //     _draw(oldX, oldY + 1);
    //   }, 50);
    // }
    //
    // const onTarget = (x, y) => {
    //   return x < oldX + width && x > oldX && y < oldY + height && y > oldY;
    // };
    //
    // const dragStart = (x, y) => {
    //   if (onTarget(x, y)) {
    //     draggable = true;
    //   }
    // };
    //
    // const restoreOnMove = (sx, sy) => {
    //   paint(oldX, oldY);
    // };

    // const updateOnDrag = (x, y) => {
    //   if (draggable) {
    //     _draw(x, y);
    //     oldX = x;
    //   }
    // };

    // const isActive = () => {
    //   return draggable;
    // };

    function myMove(e) {
      const mx = e.pageX - canvas.offsetLeft;
      const my = e.pageY - canvas.offsetTop;
      this.updateOnDrag(mx, my);
      this.restoreOnMove(mx, my);
    }

    function myDown(e) {
      e.preventDefault();
      const newX = e.pageX - canvas.offsetLeft;
      const newY = e.pageY - canvas.offsetTop;
      this.dragStart(newX, newY);
    }

    // const endGame = () => {
    //   clearTimer();
    // };
    //
    // const clearTimer = () => {
    //   if (timer) {
    //     clearInterval(timer);
    //     timer = null;
    //   }
    // };
    //
    // const onScore = function () {
    //   if (isScore) {
    //     clearTimer();
    //     draggable = false;
    //     oldX = defaultX;
    //     oldY = defaultY;
    //     paint(oldX, oldY);
    //     const randomNumber = Math.random();
    //     if (0 <= randomNumber && randomNumber < 0.5) {
    //       autoDrop();
    //     }
    //   }
    // };
  }
}
