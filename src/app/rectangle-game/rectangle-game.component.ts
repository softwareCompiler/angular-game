import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RectangleService} from '../rectangle.service';

@Component({
  selector: 'app-rectangle-game',
  templateUrl: './rectangle-game.component.html',
  styleUrls: ['./rectangle-game.component.css']
})
export class RectangleGameComponent implements OnInit {

  constructor(private rectangleService: RectangleService) {

    // rectangleService.paint(25,35);


  }

  ngOnInit() {
  }


}
