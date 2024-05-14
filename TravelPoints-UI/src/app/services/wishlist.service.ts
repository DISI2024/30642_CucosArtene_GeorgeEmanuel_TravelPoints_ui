import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Wishlist} from "../models/Wishlist";
import {TouristAttractionsInWishlist} from "../models/TouristAttractionsInWishlist";

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  readonly baseURL: string = "http://localhost:8888/wishlist";

  constructor(private httpClient: HttpClient) {
  }

  getWishlistByUserId(userId: number): Observable<Wishlist> {
    return this.httpClient.get<Wishlist>(this.baseURL + "/getWishlist/" + userId);
  }

  addTouristAttractionToWishlist(userId: number, attractionId: number): Observable<any> {
    return this.httpClient.post<any>(this.baseURL + "/addTouristAttraction/" + userId + "/" + attractionId, {});
  }

  getWishlistTouristAttractionsByUserId(userId: number): Observable<TouristAttractionsInWishlist> {
    return this.httpClient.get<TouristAttractionsInWishlist>(this.baseURL + "/getWishlistAndAttraction/" + userId);
  }

  deleteTouristAttractionFromWishlist(userId: number, attractionId: number): Observable<any> {
    return this.httpClient.put<any>(this.baseURL + "/removeTouristAttraction/" + userId + "/" + attractionId, {});
  }
}
