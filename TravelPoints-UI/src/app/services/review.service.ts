import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NewReview} from "../models/NewReview";
import {CreatedReview} from "../models/CreatedReview";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  readonly baseURL: string = "http://localhost:8888/reviews";

  constructor(private httpClient: HttpClient) {
  }

  addReview(review: NewReview): Observable<NewReview> {
    return this.httpClient.post<NewReview>(this.baseURL + "/create", review);
  }

  getAllReviewsById(id: number): Observable<CreatedReview[]> {
    return this.httpClient.get<CreatedReview[]>(this.baseURL + "/getAllByAttractionId/" + id);
  }
}
