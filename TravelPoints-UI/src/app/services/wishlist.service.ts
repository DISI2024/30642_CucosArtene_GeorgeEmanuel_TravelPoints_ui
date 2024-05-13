import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Wishlist} from "../models/Wishlist";

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  readonly baseURL: string = "http://localhost:8888/wishlist";

  constructor(private httpClient: HttpClient) {
  }

  getWishlistByUserId(userId: number): Observable<Wishlist> {
    let token = localStorage.getItem("token")
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
    return this.httpClient.get<Wishlist>(this.baseURL + "/getWishlist/" + userId, {headers: headers});
  }

  addTouristAttractionToWishlist(userId: number, attractionId: number): Observable<any> {
    let token = localStorage.getItem("token")
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
    return this.httpClient.post<any>(this.baseURL + "/addTouristAttraction/" + userId + "/" + attractionId, {}, {headers: headers});
  }
}
