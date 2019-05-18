import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import {DragGameComponent} from './drag-game/drag-game.component';
import {RectangleService} from './rectangle-game/rectangle.service';
import { RectangleGameComponent } from './rectangle-game/rectangle-game.component';
import { HostComponent } from './host/host.component';
import { ContainerDirective } from './host/container.directive';
import { DateInputDirective } from './host/date-input.directive';
import { CircleContainerComponent } from './circle-container/circle-container.component';
import { CircontainerDirective } from './circle-container/circontainer.directive';
import { RoundContainerDirective } from './directives/round-container.directive';
import { SquareContainerDirective } from './directives/square-container.directive';
import { SquareDirective } from './directives/square.directive';
import { CircleDirective } from './directives/circle.directive';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DragGameComponent,
    RectangleGameComponent,
    HostComponent,
    ContainerDirective,
    DateInputDirective,
    CircleContainerComponent,
    CircontainerDirective,
    RoundContainerDirective,
    SquareContainerDirective,
    SquareDirective,
    CircleDirective
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule

  ],
  providers: [RectangleService],
  bootstrap: [AppComponent]
})
export class AppModule {
constructor() {
    library.add(faUser);
    library.add(faKey);
  }
 }
