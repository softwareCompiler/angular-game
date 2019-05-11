import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DragGameComponent } from './drag-game/drag-game.component';
import {RectangleGameComponent} from './rectangle-game/rectangle-game.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'drag-game', component: DragGameComponent },
  { path: 'rectangle-game', component: RectangleGameComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
