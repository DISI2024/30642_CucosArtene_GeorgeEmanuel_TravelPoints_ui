import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {NewReview} from "../models/NewReview";
import {CreatedReview} from "../models/CreatedReview";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  baseURL: string = "http://localhost:8888/reviews";

  constructor(private httpClient: HttpClient) {
  }

  addReview(review: NewReview): Observable<NewReview> {
    let token = localStorage.getItem("token")
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
    return this.httpClient.post<NewReview>(this.baseURL + "/create", review, {headers: headers});
  }

  getAllReviewsById(id: number): Observable<CreatedReview[]> {
    let token = localStorage.getItem("token")
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
    return this.httpClient.get<CreatedReview[]>(this.baseURL + "/getAllByAttractionId/" + id, {headers: headers});
  }
}
