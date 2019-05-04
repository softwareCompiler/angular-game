import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DragGameComponent } from './drag-game/drag-game.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';



@NgModule({
  declarations: [
    AppComponent,
    DragGameComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule

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
