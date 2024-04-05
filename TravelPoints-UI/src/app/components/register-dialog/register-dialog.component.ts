import {Component} from '@angular/core';
import {User} from "../../models/User";
import {UserType} from "../../models/UserType";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register-dialog',
  standalone: true,
  imports: [MatDialogModule, FormsModule, MatButton, HttpClientModule],
  providers: [AuthService],
  templateUrl: './register-dialog.component.html',
  styleUrl: './register-dialog.component.css'
})
export class RegisterDialogComponent {
  user: User = new User()
  valid: boolean = true

  constructor(private dialogRef: MatDialogRef<RegisterDialogComponent>,
              private authService: AuthService) {
  }

  onClickRegister() {
    const emailRegex = new RegExp('^[A-Za-z0-9+_.-]+@[A-Za-z0-9]{2,5}\\.[A-Za-z]{2,4}$');
    const passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[!@#$%^&*.]).{7,}$');
    this.user.userType = UserType.TOURIST
    this.valid = true
    if (!emailRegex.test(<string>this.user.email)) {
      this.valid = false
      alert("Check the correct format for email")
    }
    if (!passwordRegex.test(<string>this.user.password)) {
      this.valid = false
      alert("Check the correct format for password")
    }
    this.authService.register(this.user).subscribe({
      next: () => {
        alert("Registration successful!")
        this.dialogRef.close()
      },
      error: () => alert("There is already an account with this email")
    })
  }
}
