import {Component, ElementRef, OnInit} from '@angular/core';
import {MessageService} from '../services/directive-messaging';

@Component({
  selector: 'app-drag-game',
  templateUrl: './drag-game.component.html',
  styleUrls: ['./drag-game.component.css']
})
export class DragGameComponent {
  constructor(private messageService: MessageService) {
    console.log('messageService ccc', messageService);
  }

  startTimer = (duration, display) => {
    let start = Date.now();
    let diff;
    let minutes;
    let seconds;
    const mileSecondFactor = 1000;
    const secondFactor = 60;
    const minutesFactor = 60;
    console.log('publish this.messageService 000 ...', this.messageService);
    this.messageService.broadcast('GameMessage', {});
    const timer = () => {
      const gameRuning = false;
      diff = duration - (((Date.now() - start) / mileSecondFactor) | 0);
      minutes = Math.floor(diff / minutesFactor);
      seconds = (diff % secondFactor) | 0;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      display.textContent = minutes + ':' + seconds;

      if (diff <= 0) {
        clearInterval(clock);
        this.messageService.broadcast('TimeOutMessage', {gameRuning});
      }
    };

    timer();
    const clock = setInterval(timer, mileSecondFactor);
  }
  gameStart = () => {
    const gameRuning = true;
    const oneMinutes = 30;
    const display = document.querySelector('#time');
    this.startTimer(oneMinutes, display);
    this.messageService.broadcast('GameMessage', {gameRuning});
  }
}
