import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NavigationBarComponent} from "../navigation-bar/navigation-bar.component";
import {NgForOf, NgIf} from "@angular/common";
import {WishlistService} from "../../services/wishlist.service";
import {TouristAttractionsInWishlist} from "../../models/TouristAttractionsInWishlist";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-my-wishlist-page',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatIcon,
    NavigationBarComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './my-wishlist-page.component.html',
  styleUrl: './my-wishlist-page.component.css'
})
export class MyWishlistPageComponent implements OnInit {
  token: any
  loggedUserId: number | undefined
  touristAttractionsInWishlist: TouristAttractionsInWishlist = new TouristAttractionsInWishlist()

  constructor(private wishlistService: WishlistService) {
  }

  ngOnInit() {
    this.getTokenInformation()
    if (this.loggedUserId) {
      this.wishlistService.getWishlistTouristAttractionsByUserId(this.loggedUserId).subscribe({
        next: data => {
          this.touristAttractionsInWishlist = data
        }
      })
    }
  }

  getTokenInformation() {
    this.token = localStorage.getItem('token')
    let tokenPayload: any;
    if (this.token) {
      tokenPayload = jwtDecode(this.token);
      this.loggedUserId = tokenPayload.id;
    }
  }

  deleteFromWishlist(attractionId: number) {
    this.wishlistService.deleteTouristAttractionFromWishlist(this.loggedUserId!, attractionId).subscribe()
    this.touristAttractionsInWishlist.attractionDetailDTOList = this.touristAttractionsInWishlist.attractionDetailDTOList.filter((item) => item.attractionId !== attractionId)
  }
}
