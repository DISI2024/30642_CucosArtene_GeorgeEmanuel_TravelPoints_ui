import {TouristAttraction} from "./TouristAttraction";

export class TouristAttractionInWishlist {
  wishlistId: number | undefined;
  userId: number | undefined;
  attractionDetailDTOList: TouristAttraction[] = [];
  addedAt: string | undefined;
}
