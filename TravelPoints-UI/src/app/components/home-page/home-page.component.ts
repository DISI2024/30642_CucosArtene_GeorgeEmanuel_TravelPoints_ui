import { Component } from '@angular/core';
import {NavigationBarComponent} from "../navigation-bar/navigation-bar.component";
import {MatDialog} from "@angular/material/dialog";
import {MailDialogComponent} from "../mail-dialog/mail-dialog.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NavigationBarComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private dialog: MatDialog) {
  }
  openMailDialog() {
    this.dialog.open(MailDialogComponent, {
      width: '40vw'
    });
  }

}
