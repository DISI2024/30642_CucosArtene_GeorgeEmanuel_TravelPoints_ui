import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";

import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly baseURL: string = "http://localhost:8888/auth";

  constructor(private httpClient: HttpClient) {
  }

  login(email: any, password: any): Observable<string> {
    const body = JSON.stringify({
        email: email,
        password: password
      }
    )
    return this.httpClient.post<string>(this.baseURL + "/login", body);
  }
  register(user: User): Observable<User> {
    return this.httpClient.post<User>(this.baseURL + "/register", user);
  }

  logOut(userId: number) {
    return this.httpClient.put<string>(this.baseURL + "/logout/" + userId, null);
  }
}
