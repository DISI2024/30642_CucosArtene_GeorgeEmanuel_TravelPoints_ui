import {Component, OnInit} from '@angular/core';
import {NavigationBarComponent} from "../navigation-bar/navigation-bar.component";
import {NgForOf, NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {TouristAttraction} from "../../models/TouristAttraction";
import {
  TouristAttractionDetailsDialogComponent
} from "../tourist-attraction-details-dialog/tourist-attraction-details-dialog.component";
import {HttpClientModule} from "@angular/common/http";
import {TouristAttractionService} from "../../services/tourist-attraction.service";
import {WishlistService} from "../../services/wishlist.service";
import {Router} from "@angular/router";
import {ReviewsDialogComponent} from "../reviews-dialog/reviews-dialog.component";
import {jwtDecode} from "jwt-decode";
import {Wishlist} from "../../models/Wishlist";

@Component({
  selector: 'app-objectives-page',
  standalone: true,
  imports: [
    NavigationBarComponent,
    NgForOf,
    MatFormField,
    MatLabel,
    FormsModule,
    MatIconButton,
    MatIcon,
    MatInput,
    MatRadioButton,
    NgIf,
    MatRadioGroup,
    HttpClientModule,
    MatButton
  ],
  providers: [TouristAttractionService, WishlistService],
  templateUrl: './tourist-attraction-page.component.html',
  styleUrl: './tourist-attraction-page.component.css'
})
export class TouristAttractionPageComponent implements OnInit {
  touristAttractions: TouristAttraction[] = []
  touristAttractionsResult: TouristAttraction[] = []
  selectedOption: string | undefined
  searchInput: string | undefined
  token: any
  loggedUserId: number | undefined
  loggedUserType: string | undefined
  wishlist: Wishlist = new Wishlist()

  constructor(private dialog: MatDialog,
              private touristAttractionService: TouristAttractionService,
              private wishlistService: WishlistService,
              private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      window.location.reload()
    });
    this.getTokenInformation()
    this.selectedOption = 'category'
    this.touristAttractionService.getAllTouristAttractions().subscribe({
      next: data => {
        this.touristAttractions = data
        this.touristAttractionsResult = this.touristAttractions
      }
    })
    if (this.loggedUserId) {
      this.wishlistService.getWishlistByUserId(this.loggedUserId).subscribe({
        next: data => {
          this.wishlist = data
        }
      })
    }
  }

  openDetailsDialog(details: string) {
    this.dialog.open(TouristAttractionDetailsDialogComponent, {
      width: '50vw',
      data: details,
    });
  }

  openReviewsDialog(attraction: TouristAttraction) {
    this.dialog.open(ReviewsDialogComponent, {
      width: '50vw',
      data: {
        attraction: attraction,
        userId: this.loggedUserId
      }
    });
  }

  onChoice1Change(event: any) {
    this.selectedOption = (event.target as HTMLInputElement).value;
  }

  onChoice2Change(event: any) {
    this.selectedOption = (event.target as HTMLInputElement).value;
  }

  filterByCategory(category: string) {
    this.touristAttractionsResult = this.touristAttractions.filter(touristAttraction => touristAttraction.category!.valueOf().toLowerCase().includes(category.toLowerCase()))
  }

  filterByLocation(location: string) {
    this.touristAttractionsResult = this.touristAttractions.filter((touristAttraction) => touristAttraction.location?.toLowerCase().includes(location.toLowerCase()))
  }

  onInputChange() {
    if (this.searchInput === undefined || this.searchInput === '') {
      this.touristAttractionsResult = this.touristAttractions
    } else {
      if (this.selectedOption === "category") {
        this.filterByCategory(this.searchInput!)
      } else {
        this.filterByLocation(this.searchInput!)
      }
    }
  }

  getTokenInformation() {
    this.token = localStorage.getItem('token')
    let tokenPayload: any;
    if (this.token) {
      tokenPayload = jwtDecode(this.token);
      this.loggedUserId = tokenPayload.id;
      this.loggedUserType = tokenPayload.userType;
    }
  }

  checkInWishlist(attractionId: number): boolean {
    const foundItem = this.wishlist.attractionsIds.find(id => id === attractionId);
    return !!foundItem;
  }

  addToWishlist(attractionId: number) {
    this.wishlistService.addTouristAttractionToWishlist(this.loggedUserId!, attractionId).subscribe({
      next: () => {
        this.wishlist.attractionsIds.push(attractionId)
        alert("Tourist attraction added to wishlist!")
      }
    })
  }

  checkTouristRole() {
    return this.token && this.loggedUserType === 'TOURIST'
  }
}
