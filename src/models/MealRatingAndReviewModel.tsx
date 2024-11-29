import { makeAutoObservable } from "mobx";
import RatingModel from "./ratingModel";
import { MealRatingAndReviewType } from "../types";
import AdminReviewModel from "./AdminReviewModel";

class MealRatingAndReviewModel {
  mealId: string;
  mealName: string;
  qualityRatings: RatingModel;
  tasteRatings: RatingModel;
  reviews: AdminReviewModel[];
  constructor(data: MealRatingAndReviewType) {
    this.mealId = data.mealId;
    this.mealName = data.mealName;
    this.qualityRatings = data.qualityRatings;
    this.tasteRatings = data.tasteRatings;
    this.reviews = data.reviews;
    makeAutoObservable(this, {}, { autoBind: true });
  }
}
export default MealRatingAndReviewModel;
