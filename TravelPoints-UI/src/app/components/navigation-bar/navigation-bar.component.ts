import {Component, OnInit} from '@angular/core';
import {LoginDialogComponent} from "../login-dialog/login-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {NgIf} from "@angular/common";
import {AuthService} from "../../services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    NgIf,
    HttpClientModule
  ],
  providers: [AuthService],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent implements OnInit{

  token: string | null = null;

  constructor(private dialog: MatDialog, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent, {
      width: '50vw'
    });
  }

  logOut() {
    let tokenPayload: any;
    if(this.token) {
      tokenPayload = jwtDecode(this.token);
    }
    let id = tokenPayload.id;
    this.authService.logOut(id).subscribe({
      next: (response: any) => {
        alert("LogOut successful!")
        localStorage.clear()
        this.token = null
        this.router.navigate(['/home'])
      },
      error: () =>  {
        alert("LogOut failed")
      }
    })
  }
}
