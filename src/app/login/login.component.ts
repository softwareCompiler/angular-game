import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  title = 'Drag-Game';

  public login(user, password) {
    console.log('ussser', user)
    if (user === 'John' && password === 'abcde') {
      //routers.path = '/drag-game';

      // alert('usewwwwr' + user)

      window.location.assign('/drag-game');
    } else {
      alert('User name or password wrong');
    }

  }
}



