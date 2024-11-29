import { makeAutoObservable } from "mobx";
import MealRatingAndReviewModel from "../models/MealRatingAndReviewModel";
import { MealRatingAndReviewType } from "../types";

class _RatingAndReviewStore {
  date: string | null = null;
  ratingAndReviewData: Map<string, MealRatingAndReviewModel[]> = new Map();
  mealRatingAndReviewData: MealRatingAndReviewModel[] | null = null;
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  setRatingData(date: string, data: MealRatingAndReviewType[]) {
    this.date = date;
    this.mealRatingAndReviewData = data.map(
      (eachData) => new MealRatingAndReviewModel(eachData)
    );
    this.ratingAndReviewData.set(date, this.mealRatingAndReviewData);
  }
}
const RatingAndReviewStore = new _RatingAndReviewStore();
export default RatingAndReviewStore;
