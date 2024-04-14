import {Component} from '@angular/core';
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
export class NavigationBarComponent {
    token: any

    constructor(private dialog: MatDialog, private authService: AuthService, private router: Router) {
        this.token = localStorage.getItem('token')
    }

    openLoginDialog() {
        this.dialog.open(LoginDialogComponent, {
            width: '100vh'
        });
    }

    logOut() {
        let tokenPayload: any = jwtDecode(this.token);
        let id = tokenPayload.id;
        this.authService.logOut(id).subscribe({
            next: () => {
                alert("LogOut successful!")
                this.router.navigate(['/home-page'])
            },
            error: () => alert("LogOut failed")
        })
    }
}
