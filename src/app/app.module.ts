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



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DragGameComponent,
    RectangleGameComponent
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
