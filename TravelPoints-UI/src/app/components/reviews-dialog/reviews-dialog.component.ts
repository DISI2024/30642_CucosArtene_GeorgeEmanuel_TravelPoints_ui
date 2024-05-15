import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {RatingComponent} from "../rating-component/rating.component";
import {FormsModule} from "@angular/forms";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardModule,
  MatCardTitle,
  MatCardTitleGroup,
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {NewReview} from "../../models/NewReview";
import {ReviewService} from "../../services/review.service";
import {CreatedReview} from "../../models/CreatedReview";
import {HttpClientModule} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";
import {TouristAttraction} from "../../models/TouristAttraction";

@Component({
  selector: 'app-reviews-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    RatingComponent,
    FormsModule,
    MatCard,
    MatCardContent,
    MatCardImage,
    MatCardHeader,
    MatCardTitle,
    MatCardTitleGroup,
    MatCardModule,
    MatIcon,
    HttpClientModule,
    NgForOf,
    NgIf
  ],
  providers: [ReviewService],
  templateUrl: './reviews-dialog.component.html',
  styleUrl: './reviews-dialog.component.css'
})
export class ReviewsDialogComponent implements OnInit {
  rating: number = 0;
  reviewText: string | undefined;
  valid: boolean = true;
  reviews: CreatedReview[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private reviewService: ReviewService) {
  }

  ngOnInit() {
    this.reviewService.getAllReviewsById(this.data.attraction.attractionId).subscribe(reviews => {
      this.reviews = reviews
    })
  }

  handleRateChange(newRating: number) {
    this.rating = newRating;
  }

  addReviewAndRating() {
    this.valid = !(this.rating === 0 || this.reviewText === undefined);
    if (this.valid) {
      let review: NewReview = new NewReview();
      review.userId = this.data.userId
      review.attractionId = this.data.attraction.attractionId
      review.rating = this.rating
      review.reviewText = this.reviewText
      this.reviewService.addReview(review).subscribe(() => {
        alert("Review added successfully!")
        this.reviewText = undefined
        this.reviewService.getAllReviewsById(this.data.attraction.attractionId).subscribe(reviews => {
          this.reviews = reviews
        })
      })
    } else {
      alert("Please provide rating and a review!")
    }
  }

  checkHourIntervalForReview(): boolean {
    const now = new Date();
    let hour = ("0" + now.getHours()).slice(-2);
    if (this.data.attraction.closingTime!.substring(0, 2) === '00') {
      return hour >= this.data.attraction.openingTime!.substring(0, 2) && hour <= '24'
    }
    return hour >= this.data.attraction.openingTime!.substring(0, 2) && hour <= this.data.attraction.closingTime!.substring(0, 2)
  }
}
