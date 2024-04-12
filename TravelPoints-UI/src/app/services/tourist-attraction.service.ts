import { Injectable } from '@angular/core';
import {TouristAttraction} from "../models/TouristAttraction";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TouristAttractionService {
  baseURL: string = "http://localhost:8080/tourist-attractions";
  constructor(private httpClient: HttpClient) {
  }

  addTouristAttraction(touristAttraction: TouristAttraction): Observable<TouristAttraction> {
    let token = localStorage.getItem("token")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
    return this.httpClient.post<TouristAttraction>(this.baseURL + "/create", touristAttraction, {headers: header});
  }

  getAllTouristAttractions(): Observable<TouristAttraction[]> {
    let token = localStorage.getItem("token")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
    return this.httpClient.get<TouristAttraction[]>(this.baseURL + "/get_all",{headers: header});
  }
}
