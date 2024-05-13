import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Mail} from "../models/Mail";

@Injectable({
  providedIn: 'root'
})
export class MailService {
  readonly baseURL: string = "http://localhost:8888/mail";

  constructor(private httpClient: HttpClient) {
  }

  send(mail: Mail): Observable<string> {
    return this.httpClient.post<string>(this.baseURL + "/send", mail);
  }

}
