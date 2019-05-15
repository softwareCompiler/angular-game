import { Component, OnInit } from '@angular/core';
// import { ContainerDirective } from 'container.directive';
// import { DateInputDirective } from 'date-input.directive';


@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {
  show: boolean;
  constructor() { }

  ngOnInit() {
  }

}
