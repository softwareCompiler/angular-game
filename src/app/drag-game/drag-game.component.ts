import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';

@Component({
  selector: 'app-drag-game',
  templateUrl: './drag-game.component.html',
  styleUrls: ['./drag-game.component.css']
})
export class DragGameComponent implements OnInit {
  @ViewChild('myCanvas') canvasRef: ElementRef;
  constructor() { }

  ngOnInit() {
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    ctx.fillStyle = 'red';
    ctx.fillRect(100, 75, 50, 50);
    // ctx.fillStyle = 'red';
    // ctx.fill();
    ctx.beginPath();
    ctx.arc(550, 100, 25, 0, 360);
    ctx.fillStyle = 'blue';
    ctx.fill();
  }
}

