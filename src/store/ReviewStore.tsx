import { makeAutoObservable } from "mobx";
import ReviewModel from "../models/ReviewModel";
import { MealTypeEnum } from "../types";

interface ReviewItems {
  id: string;
  name: string;
  quality: number;
  taste: number;
}

interface ReviewTypes {
  breakfast: ReviewModel[];
  lunch: ReviewModel[];
  dinner: ReviewModel[];
}

class _ReviewStore {
  reviewsOfMealType: ReviewTypes;
  constructor() {
    this.reviewsOfMealType = {
      breakfast: [],
      lunch: [],
      dinner: [],
    };
    makeAutoObservable(this, {}, { autoBind: true });
  }
  setReview(mealType: MealTypeEnum, reviewItems: ReviewItems[]) {
    this.reviewsOfMealType[mealType] = reviewItems.map(
      (each) => new ReviewModel(each)
    );
  }
}

const ReviewStore = new _ReviewStore();
export default ReviewStore;
