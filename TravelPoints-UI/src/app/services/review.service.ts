import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NewReview} from "../models/NewReview";
import {CreatedReview} from "../models/CreatedReview";
import {HourStatistic} from "../models/HourStatistic";
import {MonthStatistic} from "../models/MonthStatistic";
import {TouristAttractionVisits} from "../models/TouristAttractionVisits";

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

  getDayStatistic(attractionId: number, day: string): Observable<HourStatistic[]>  {
    return this.httpClient.get<HourStatistic[]>(this.baseURL + "/getDayStatistic/" + attractionId + "/" + day);
  }

  getMonthStatistic(attractionId: number, year: number): Observable<MonthStatistic[]>  {
    return this.httpClient.get<MonthStatistic[]>(this.baseURL + "/getYearStatistic/" + attractionId + "/" + year);
  }

  getNumberOfVisitsPerAttraction() {
    return this.httpClient.get<TouristAttractionVisits[]>(this.baseURL + "/getNumberOfVisitsPerAttraction");
  }
}
