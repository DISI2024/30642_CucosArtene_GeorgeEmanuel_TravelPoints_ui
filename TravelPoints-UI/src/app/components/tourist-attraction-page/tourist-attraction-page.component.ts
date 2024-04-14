import {Component, OnInit} from '@angular/core';
import {NavigationBarComponent} from "../navigation-bar/navigation-bar.component";
import {NgForOf, NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {TouristAttraction} from "../../models/TouristAttraction";
import {
  TouristAttractionDetailsDialogComponent
} from "../tourist-attraction-details-dialog/tourist-attraction-details-dialog.component";
import {HttpClientModule} from "@angular/common/http";
import {TouristAttractionService} from "../../services/tourist-attraction.service";

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
    HttpClientModule
  ],
  providers: [TouristAttractionService],
  templateUrl: './tourist-attraction-page.component.html',
  styleUrl: './tourist-attraction-page.component.css'
})
export class TouristAttractionPageComponent implements OnInit {
  touristAttractions: TouristAttraction[] = [];

  constructor(private dialog: MatDialog,
              private touristAttractionService: TouristAttractionService) {
  }

  ngOnInit() {
    this.touristAttractionService.getAll().subscribe({
      next: data => this.touristAttractions = data
    })
  }

  openDetailsDialog(details: string) {
    this.dialog.open(TouristAttractionDetailsDialogComponent, {
      width: '100vh',
      data: details,
    });
  }
}