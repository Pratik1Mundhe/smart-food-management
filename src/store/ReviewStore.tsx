import { makeAutoObservable } from "mobx";
import { MealTypeEnum } from "../types";
import ReviewModel from "../models/ReviewModel";

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
  review = new Map();
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
  setReviewOnDate(
    date: string,
    mealType: MealTypeEnum,
    reviewItems: ReviewItems[]
  ) {
    this.reviewsOfMealType[mealType] = reviewItems.map(
      (each) => new ReviewModel(each)
    );
    this.review.set(date, this.reviewsOfMealType);
  }
  getReviewMealsOnDate(date: string) {
    return this.review.get(date);
  }
}

const ReviewStore = new _ReviewStore();
export default ReviewStore;
