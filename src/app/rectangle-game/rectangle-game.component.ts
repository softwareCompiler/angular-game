import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RectangleService} from '../rectangle.service';

@Component({
  selector: 'app-rectangle-game',
  templateUrl: './rectangle-game.component.html',
  styleUrls: ['./rectangle-game.component.css']
})
export class RectangleGameComponent implements OnInit {

  public cx = '';
  public cy = '';

  constructor(private rectangleService: RectangleService) {

    // rectangleService.paint(25,35);


  }

  ngOnInit() {

    console.log('cx2:', this.cx);
    console.log('cy2:', this.cy);
  }


}
