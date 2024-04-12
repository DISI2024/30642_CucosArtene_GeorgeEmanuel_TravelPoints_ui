import {Category} from "./Category";

export class TouristAttraction {
  id: number | undefined;
  name: string | undefined;
  location: string | undefined;
  category: Category | undefined;
  createdAt: string | undefined;
  description: string | undefined;
  entryPrice: number | undefined;
  offers: string | undefined;
  imageUrl: string | undefined;
}
