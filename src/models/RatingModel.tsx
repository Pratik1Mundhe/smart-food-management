import { makeAutoObservable } from "mobx";
import { RatingModelTypes } from "../types";

class RatingModel {
  totalMembers: number;
  fiveStarRating: number;
  fourStarRating: number;
  threeStarRating: number;
  twoStarRating: number;
  oneStarRating: number;
  constructor(rating: RatingModelTypes) {
    this.totalMembers = rating.totalMembers;
    this.fiveStarRating = rating.fiveStarRating;
    this.fourStarRating = rating.fourStarRating;
    this.threeStarRating = rating.threeStarRating;
    this.twoStarRating = rating.twoStarRating;
    this.oneStarRating = rating.oneStarRating;
    makeAutoObservable(this, {}, { autoBind: true });
  }
}
export default RatingModel;
