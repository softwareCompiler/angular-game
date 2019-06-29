import {Injectable} from '@angular/core';

import {Subject} from 'rxjs';
import {Subscription} from 'rxjs';
import {filter, map} from 'rxjs/internal/operators';

interface Message {
  type: string;
  payload: {};
}

type MessageCallback = (payload: any) => void;

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  private handler = new Subject<Message>();

  broadcast(type: string, payload: any) {
    this.handler.next({type, payload});
  }

  subscribe(type: string, callback: MessageCallback): Subscription {
    return this.handler.pipe(filter(message => message.type === type)).pipe(
      map(message => message.payload))
      .subscribe(callback);
  }

  // We should also add similar events for other mouse events. See square.directive.js for an example of how to use this.
  subscribeForMouseDownEvent(callback: MessageCallback): Subscription {
    return this.subscribe('mousedown', callback);
  }
}
