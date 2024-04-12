import {Component} from '@angular/core';
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
import {Category} from "../../models/Category";
import {
  TouristAttractionDetailsDialogComponent
} from "../tourist-attraction-details-dialog/tourist-attraction-details-dialog.component";

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
    MatRadioGroup
  ],
  templateUrl: './tourist-attraction-page.component.html',
  styleUrl: './tourist-attraction-page.component.css'
})
export class TouristAttractionPageComponent {
  touristAttractions: TouristAttraction[] = [
    {
      attractionId: 1,
      name: "Neuschwanstein Castle",
      location: "Germany",
      category: Category.CULTURE,
      createdAt: "2024-04-01",
      descriptionText: "A nineteenth-century hilltop fairytale castle in Bavaria, Germany.",
      entryPrice: 13,
      offers: "Free entry for children under 18",
      imagePath: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Schloss_Neuschwanstein_2013.jpg/800px-Schloss_Neuschwanstein_2013.jpg"
    },
    {
      attractionId: 2,
      name: "Louvre Museum",
      location: "France",
      category: Category.CULTURE,
      createdAt: "2024-04-02",
      descriptionText: "The world's largest art museum and a historic monument in Paris, France.",
      entryPrice: 15,
      offers: "Reduced price for students",
      imagePath: "https://media.cntraveler.com/photos/638f9e37498ffb9bd83a9bb7/16:9/w_2580,c_limit/Louvre,%20Paris_mika-baumeister-GCfE4fl7tIQ-unsplash.jpg"
    },
    {
      attractionId: 3,
      name: "Historic Centre of Rome",
      location: "Italy",
      category: Category.URBAN,
      createdAt: "2024-04-03",
      descriptionText: "Iconic city with centuries of artistic and cultural heritage.",
      entryPrice: 0,
      offers: "Various city card discounts",
      imagePath: "https://media.timeout.com/images/105211701/750/422/image.jpg"
    },
    {
      attractionId: 4,
      name: "The British Museum",
      location: "United Kingdom",
      category: Category.CULTURE,
      createdAt: "2024-04-04",
      descriptionText: "A museum in London known for its comprehensive collection of human history, art, and culture.",
      entryPrice: 0,
      offers: "Free entry, donations welcome",
      imagePath: "https://travel.usnews.com/images/2017_01_18_London-77.jpg"
    },
    {
      attractionId: 5,
      name: "Edinburgh Castle",
      location: "Scotland",
      category: Category.CULTURE,
      createdAt: "2024-04-05",
      descriptionText: "Historic fortress which dominates the skyline of Edinburgh, Scotland from its position on the Castle Rock.",
      entryPrice: 17.50,
      offers: "Discount for booking online",
      imagePath: "https://www.historic-uk.com/wp-content/uploads/2017/01/edinburgh-castle.jpg"
    }
  ];

  constructor(private dialog: MatDialog) {
  }

  openDetailsDialog(details: string) {
    this.dialog.open(TouristAttractionDetailsDialogComponent, {
      width: '100vh',
      data: details,
    });
  }
}
