import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
// import { DragGameComponent } from './drag-game/drag-game.component';
import {RectangleGameComponent} from './rectangle-game/rectangle-game.component';
// import {HostComponent} from './host/host.component';
// import {CircleContainerComponent} from './circle-container/circle-container.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // { path: 'drag-game', component: DragGameComponent },
  { path: 'rectangle-game', component: RectangleGameComponent },
  // { path: 'host', component: HostComponent },
  // { path: 'circle-container', component: CircleContainerComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
