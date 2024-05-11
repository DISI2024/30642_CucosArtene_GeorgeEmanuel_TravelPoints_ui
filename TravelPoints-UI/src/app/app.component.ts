import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {WebsocketService} from "./services/websocket.service";
import {LoginDialogComponent} from "./components/login-dialog/login-dialog.component";
import {HttpClientModule} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";
import {Notification} from "./models/Notification";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginDialogComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private websocketService: WebsocketService) {
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      let token = localStorage.getItem('token')
      let tokenPayload: any;
      tokenPayload = jwtDecode(token!);
      let loggedUserId = tokenPayload.id;
      let loggedUserType = tokenPayload.userType;
      if (loggedUserType === 'TOURIST') {
        this.websocketService.subscribeToNotifications(loggedUserId).subscribe((notification: Notification) => {
          window.alert("A new offer update available for " + notification.nameAttraction + " : " + notification.offers)
        })
      }
    }
  }
}
