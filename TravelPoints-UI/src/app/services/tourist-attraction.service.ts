import { Injectable } from '@angular/core';
import {TouristAttraction} from "../models/TouristAttraction";
import {Observable, of} from "rxjs";
import {Category} from "../models/Category";
import {IMAGE1, IMAGE2, IMAGE3, IMAGE4, IMAGE5} from "../utils/images-links";

@Injectable({
  providedIn: 'root'
})
export class TouristAttractionService {
  baseURL: string = "http://localhost:8080/tourist-attractions";
  mockDestinations: TouristAttraction[] = []
  constructor() {
  }

  getAllTouristAttractions(): Observable<TouristAttraction[]> {
    const destinations: TouristAttraction[] = [
      {
        id: 1,
        name: "Neuschwanstein Castle",
        location: "Germany",
        category: Category.CULTURE,
        createdAt: "2023-01-15",
        description: "A 19th-century palace on a rugged hill above the village of Hohenschwangau near Füssen in southwest Bavaria, Germany.",
        entryPrice: 13,
        offers: "Guided tours available",
        imageUrl: IMAGE1
      },
      {
        id: 2,
        name: "Paris",
        location: "France",
        category: Category.CULTURE,
        createdAt: "2023-02-20",
        description: "The capital and most populous city of France, known for its art, fashion, gastronomy, and culture.",
        entryPrice: 0,
        offers: "Special discounts on museums and attractions",
        imageUrl: IMAGE2
      },
      {
        id: 3,
        name: "The British Museum",
        location: "United Kingdom",
        category: Category.CULTURE,
        createdAt: "2023-03-10",
        description: "A public institution dedicated to human history, art, and culture located in the Bloomsbury area of London.",
        entryPrice: 0,
        offers: "Free entry, donations welcome",
        imageUrl: IMAGE3
      },
      {
        id: 4,
        name: "Edinburgh Castle",
        location: "Scotland",
        category: Category.CULTURE,
        createdAt: "2023-04-05",
        description: "A historic fortress which dominates the skyline of Edinburgh, the capital city of Scotland, from its position on the Castle Rock.",
        entryPrice: 17,
        offers: "Discounts for early bookings",
        imageUrl: IMAGE4
      },
      {
        id: 5,
        name: "Tokyo",
        location: "Japan",
        category: Category.CULTURE,
        createdAt: "2023-05-08",
        description: "The bustling capital of Japan, blending the ultra-modern with traditional culture from neon-lit skyscrapers to historic temples.",
        entryPrice: 0,
        offers: "City pass for unlimited travel",
        imageUrl: IMAGE5
      }
    ];
    this.mockDestinations = destinations

    return of(destinations)
  }
}
