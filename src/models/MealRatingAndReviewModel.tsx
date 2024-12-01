import { makeAutoObservable } from "mobx";
import RatingModel from "./ratingModel";
import { MealRatingAndReviewType } from "../types";

class MealRatingAndReviewModel {
  mealId: string;
  mealName: string;
  qualityRatings: RatingModel;
  tasteRatings: RatingModel;
  constructor(data: MealRatingAndReviewType) {
    this.mealId = data.mealId;
    this.mealName = data.mealName;
    this.qualityRatings = data.qualityRatings;
    this.tasteRatings = data.tasteRatings;
    makeAutoObservable(this, {}, { autoBind: true });
  }
}
export default MealRatingAndReviewModel;
