import { makeAutoObservable } from "mobx";
import RatingModel from "./ratingModel";
import ReviewModel from "./ReviewModel";
import {
  MealRatingAndReviewModelType,
  MealRatingAndReviewType,
} from "../types";

class MealRatingAndReviewModel {
  mealId: string;
  mealName: string;
  qualityRatings: RatingModel;
  tasteRatings: RatingModel;
  reviews: ReviewModel[];
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
