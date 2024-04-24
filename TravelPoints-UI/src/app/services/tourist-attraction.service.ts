import {Injectable} from '@angular/core';
import {TouristAttraction} from "../models/TouristAttraction";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TouristAttractionService {
  baseURL: string = "http://localhost:8888/attractions";

  constructor(private httpClient: HttpClient) {
  }

  getAllTouristAttractions(): Observable<TouristAttraction[]> {
    const token = localStorage.getItem('token')
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.httpClient.get<TouristAttraction[]>(this.baseURL + "/getAll", {headers});
  }

  addTouristAttraction(touristAttraction: TouristAttraction): Observable<TouristAttraction> {
    let token = localStorage.getItem("token")
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
    return this.httpClient.post<TouristAttraction>(this.baseURL + "/create", touristAttraction, {headers: headers});
  }

  deleteTouristAttractionById(id: any): Observable<Response> {
    let token = localStorage.getItem("token")
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
    return this.httpClient.delete<Response>(this.baseURL + "/delete/" + id, {headers: headers});
  }

  updateTouristAttraction(touristAttraction: TouristAttraction): Observable<TouristAttraction> {
    let token = localStorage.getItem("token")
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
    return this.httpClient.put<TouristAttraction>(this.baseURL + "/update/" + touristAttraction.attractionId, touristAttraction, {headers: headers});
  }
}
