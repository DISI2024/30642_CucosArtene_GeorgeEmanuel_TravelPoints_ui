import {Component} from '@angular/core';
import {LoginDialogComponent} from "../login-dialog/login-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {
  token: any

  constructor(private dialog: MatDialog) {
    this.token = localStorage.getItem('token')
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent, {
      width: '100vh'
    });
  }
}
