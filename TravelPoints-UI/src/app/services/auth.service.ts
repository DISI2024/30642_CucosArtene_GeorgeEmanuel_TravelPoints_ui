import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL: string = "http://localhost:8080";

  constructor(private httpClient: HttpClient) {
  }

  register(user: User): Observable<User> {
    const headers = {'Content-Type': 'application/json'};
    return this.httpClient.post<User>(this.baseURL + "/register", user, {headers});
  }
}
