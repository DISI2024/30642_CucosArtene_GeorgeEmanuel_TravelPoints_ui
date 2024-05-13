import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatError} from "@angular/material/form-field";
import {MatIconButton} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";
import {MatTooltip} from "@angular/material/tooltip";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [
    MatIcon,
    MatError,
    MatIconButton,
    NgIf,
    NgForOf,
    MatTooltip,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css'
})
export class RatingComponent {
  @Input() rating: number = 0;
  @Output() ratingChange = new EventEmitter<number>();
  stars: number[] = [1, 2, 3, 4, 5];

  constructor() {
  }

  rate(index: number): void {
    this.rating = index;
    this.ratingChange.emit(this.rating);
  }
}
