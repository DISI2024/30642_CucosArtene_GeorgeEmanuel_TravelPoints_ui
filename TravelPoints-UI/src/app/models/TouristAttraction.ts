import {Category} from "./Category";

export class TouristAttraction {
  attractionId: number | undefined;
  name: string | undefined;
  location: string | undefined;
  category: Category | undefined;
  createdAt: string | undefined;
  descriptionText: string | undefined;
  imagePath: string | undefined;
  entryPrice: number | undefined;
  offers: string | undefined;
}
