import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AdminAuthGuard implements CanActivate {
  constructor(
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const token = localStorage.getItem('token');
    if(token) {
      let tokenPayload: any = jwtDecode(token)
      if (tokenPayload.userType === 'ADMINISTRATOR') {
        return true;
      }
    }
    this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
