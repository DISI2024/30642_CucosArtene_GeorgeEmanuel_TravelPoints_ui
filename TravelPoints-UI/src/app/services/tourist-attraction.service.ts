import {Injectable} from '@angular/core';
import {TouristAttraction} from "../models/TouristAttraction";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TouristAttractionService {
  readonly baseURL: string = "http://localhost:8888/attractions";

  constructor(private httpClient: HttpClient) {
  }

  getAllTouristAttractions(): Observable<TouristAttraction[]> {
    return this.httpClient.get<TouristAttraction[]>(this.baseURL + "/getAll");
  }

  addTouristAttraction(touristAttraction: TouristAttraction): Observable<TouristAttraction> {
    return this.httpClient.post<TouristAttraction>(this.baseURL + "/create", touristAttraction);
  }

  deleteTouristAttractionById(id: any): Observable<Response> {
    return this.httpClient.delete<Response>(this.baseURL + "/delete/" + id);
  }

  updateTouristAttraction(touristAttraction: TouristAttraction): Observable<TouristAttraction> {
    return this.httpClient.put<TouristAttraction>(this.baseURL + "/update/" + touristAttraction.attractionId, touristAttraction);
  }
}
