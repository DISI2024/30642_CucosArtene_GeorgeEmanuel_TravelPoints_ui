import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {RegisterDialogComponent} from "../register-dialog/register-dialog.component";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    HttpClientModule
  ],
  providers: [AuthService],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.css'
})
export class LoginDialogComponent {
  username!: string
  password!: string

  constructor(private dialogRef: MatDialogRef<LoginDialogComponent>,
              private authService: AuthService,
              private dialog: MatDialog,
              private router: Router) {
  }

  onClickLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next:(response: any) => {
        localStorage.setItem('token', response.token)
        this.dialogRef.close();
        alert("Login successful!")
        let tokenPayload: any = jwtDecode(response.token)
        if(tokenPayload.userType === 'ADMINISTRATOR') {
          this.router.navigate(['/admin-dashboard'])
        } else {
          this.router.navigate(['/tourist-attractions'])
          window.location.reload()
        }
      },
      error: () => alert("Login failed")
    })
  }

  openRegisterDialog() {
    this.dialog.open(RegisterDialogComponent, {
      width: '100vh'
    });
  }
}
