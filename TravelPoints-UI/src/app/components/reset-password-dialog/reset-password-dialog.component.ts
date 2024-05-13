import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {ResetPasswordDemand} from "../../models/ResetPasswordDemand";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LoginDialogComponent} from "../login-dialog/login-dialog.component";

@Component({
  selector: 'app-reset-password-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    NgIf,
    HttpClientModule
  ],
  providers:[AuthService],
  templateUrl: './reset-password-dialog.component.html',
  styleUrl: './reset-password-dialog.component.css'
})
export class ResetPasswordDialogComponent {
  username!: string
  oldPassword!: string
  newPassword!: string

  constructor(private authService: AuthService, private dialog: MatDialog, private dialogRef: MatDialogRef<ResetPasswordDialogComponent>) {
  }

  onClickResetPassword() {
    let resetPasswordDemand: ResetPasswordDemand = new ResetPasswordDemand()
    resetPasswordDemand.email = this.username
    resetPasswordDemand.oldPassword = this.oldPassword
    resetPasswordDemand.newPassword = this.newPassword
    this.authService.resetPassword(resetPasswordDemand).subscribe({
      next: () => {
        window.alert("Password reset success");
        this.dialogRef.close();
        this.openLoginDialog();
      },
      error: () => {
        window.alert("Password reset failure");
      }
    });
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent, {
      width: '100vh'
    });
  }
}
