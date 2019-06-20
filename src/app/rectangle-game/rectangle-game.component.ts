import {Component, ElementRef, OnInit} from '@angular/core';
import {MessageService} from '../services/directive-messaging';

@Component({
  selector: 'app-rectangle-game',
  templateUrl: './rectangle-game.component.html',
  styleUrls: ['./rectangle-game.component.css'],
  providers: [MessageService]
})
export class RectangleGameComponent {
  private messageService: MessageService;

  // let gameStatus = true;

  constructor(messageService: MessageService) {
    this.messageService = messageService;
  }

  startTimer = (duration, display) => {
    let start = Date.now();
    let diff;
    let minutes;
    let seconds;
    const mileSecondFactor = 1000;
    const secondFactor = 60;
    const minutesFactor = 60;
    let clock = setInterval(timer, mileSecondFactor);

    function timer(){
      diff = duration - (((Date.now() - start) / mileSecondFactor) | 0);
      minutes = Math.floor(diff / minutesFactor);
      seconds = (diff % secondFactor) | 0;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      display.textContent = minutes + ':' + seconds;

      if (diff <= 0) {
        clearInterval(clock);
      }
    }
    timer();
  }

  gameStart = () => {
    let gameStatus = true;
    const oneMinutes = 30;
    const display = document.querySelector('#time');
    this.startTimer(oneMinutes, display);
    this.messageService.broadcast('GameMessage', {gameStatus});
  }

}
