import {Component, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Mail} from "../../models/Mail";
import {jwtDecode} from "jwt-decode";
import {MailService} from "../../services/mail.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-mail-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatIcon,
    MatIconButton,
    FormsModule,
    NgIf,
    HttpClientModule
  ],
  providers: [MailService],
  templateUrl: './mail-dialog.component.html',
  styleUrl: './mail-dialog.component.css'
})
export class MailDialogComponent implements OnInit {
  sender: string = ""
  constructor(private mailService: MailService) {
  }
  ngOnInit(): void {
    let token = localStorage.getItem('token')
    if(token != null) {
      let tokenPayload: any;
      if(token) {
        tokenPayload = jwtDecode(token);
        this.sender = tokenPayload.email
      }
    }
  }

  sendEmail(mail: Mail) {
    if(this.sender) {
      mail.sender = this.sender
    }
    this.mailService.send(mail).subscribe((response: any) => {
      if(response == true) {
        window.alert('Mail sent')
      } else {
        window.alert('Mail could not be sent')
      }
    }, error => {
      window.alert('Mail could not be sent')
    })
  }

}
