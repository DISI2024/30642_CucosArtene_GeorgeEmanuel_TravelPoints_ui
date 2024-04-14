import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TouristAttraction} from "../models/TouristAttraction";

@Injectable({
  providedIn: 'root'
})
export class TouristAttractionService {
  baseURL: string = "http://localhost:8080/attractions";

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<TouristAttraction[]> {
    const token = localStorage.getItem('token')
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
    return this.httpClient.post<TouristAttraction[]>(this.baseURL + "/getAll", {headers});
  }
}
