import {TouristAttraction} from "./TouristAttraction";

export class TouristAttractionsInWishlist {
  wishlistId: number | undefined;
  userId: number | undefined;
  attractionDetailDTOList: TouristAttraction[] = [];
  addedAt: string | undefined;
}
