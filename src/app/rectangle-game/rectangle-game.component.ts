import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-rectangle-game',
  templateUrl: './rectangle-game.component.html',
  styleUrls: ['./rectangle-game.component.css']
})
export class RectangleGameComponent implements OnInit {

  myDown: () => {};
  myMove: () => {};
  myUp: () => {};
  gameStart: any;


  constructor(elem: ElementRef) {
    const canvas = elem.nativeElement;
    this.gameStart = function(){
      canvas.addEventListener('mousedown', this.myDown, false);
      canvas.addEventListener('mousemove', this.myMove, false);
      canvas.addEventListener('mouseup', this.myUp, false);
    }
  }

  // gameStart() {
  //   this.canvas.addEventListener('mousedown', this.myDown, false);
  //   this.canvas.addEventListener('mousemove', this.myMove, false);
  //   this.canvas.addEventListener('mouseup', this.myUp, false);
  // }

  ngOnInit() {
  }
}
