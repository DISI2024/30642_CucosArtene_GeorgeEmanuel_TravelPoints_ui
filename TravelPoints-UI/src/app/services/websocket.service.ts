import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {Observable} from 'rxjs';
import {Notification} from "../models/Notification";

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  readonly baseUrl: string = 'http://localhost:8888/websocket'
  stompClient: any;

  constructor() {
  }

  subscribeToNotifications(userId: number): Observable<Notification> {
    return new Observable((observer) => {
      const socket = new SockJS(this.baseUrl);
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, () => {
        this.stompClient.subscribe(`/topic/${userId}`, (message: { body: string; }) => {
          const data = JSON.parse(message.body);
          const notification = new Notification();
          notification.userId = data.userId
          notification.nameAttraction = data.nameAttraction
          notification.offers = data.offers
          observer.next(notification);
        });
      });
    });
  }

  unsubscribeAndDisconnect(userId: number) {
    this.stompClient.unsubscribe(`/topic/${userId}`)
    this.stompClient.disconnect()
  }
}
