import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faKey} from '@fortawesome/free-solid-svg-icons';
import {LoginComponent} from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {DragGameComponent} from './drag-game/drag-game.component';
import {CircleContainerDirective} from './directives/circle-container.directive';
import {SquareContainerDirective} from './directives/square-container.directive';
import {SquareDirective} from './directives/square.directive';
import {CircleDirective} from './directives/circle.directive';
// import {CanvasDirective} from './directives/canvas.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DragGameComponent,
    CircleContainerDirective,
    SquareContainerDirective,
    SquareDirective,
    CircleDirective
    // CanvasDirective
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faUser);
    library.add(faKey);
  }
}
