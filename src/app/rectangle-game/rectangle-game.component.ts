import {Component, ElementRef, OnInit} from '@angular/core';
import {MessageService} from '../services/directive-messaging';
import {timer} from 'rxjs';

@Component({
  selector: 'app-rectangle-game',
  templateUrl: './rectangle-game.component.html',
  styleUrls: ['./rectangle-game.component.css']
})
export class RectangleGameComponent {
  // private messageService: MessageService;

  // let gameStatus = true;
  timer: any;
  // startTimer: any;

  constructor(private messageService: MessageService) {
    console.log('messageService ccc', messageService);
    // this.messageService = messageService;
  }
   // timer: any;

  startTimer = (duration, display) => {
    let start = Date.now();
    let diff;
    let minutes;
    let seconds;
    const mileSecondFactor = 1000;
    const secondFactor = 60;
    const minutesFactor = 60;
    // let clock = setInterval(timer, mileSecondFactor);

    console.log('publish this.messageService 000 ...', this.messageService);

    this.messageService.broadcast('GameMessage', {});

    const timer = () => {
      let gameOver = true;
      diff = duration - (((Date.now() - start) / mileSecondFactor) | 0);
      minutes = Math.floor(diff / minutesFactor);
      seconds = (diff % secondFactor) | 0;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      display.textContent = minutes + ':' + seconds;

      if (diff <= 0) {
        clearInterval(clock);
        this.messageService.broadcast('TimeOutMessage', {gameOver});
      }
    };

    timer();
    let clock = setInterval(timer, mileSecondFactor);
  }

  // let clock = setInterval(timer, mileSecondFactor);

  gameStart = () => {
    let gameStart = true;
    const oneMinutes = 30;
    const display = document.querySelector('#time');
    this.startTimer(oneMinutes, display);
    this.messageService.broadcast('GameMessage', {gameStart});
  }

}
