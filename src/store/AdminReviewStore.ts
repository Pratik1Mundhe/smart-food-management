import { makeAutoObservable } from "mobx";
import AdminReviewModel from "../models/AdminReviewModel";
import { MealTypeEnum } from "../types";
interface ReviewData {
  id: string;
  profilePic: string;
  name: string;
  review: string;
}
interface AdminReviewStoreType {
  breakfast: AdminReviewModel[];
  dinner: AdminReviewModel[];
  lunch: AdminReviewModel[];
}

class _AdminReviewStore {
  adminReviewData: AdminReviewStoreType = {
    breakfast: [],
    dinner: [],
    lunch: [],
  };
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  setAdminData(mealType: MealTypeEnum, reviewData: ReviewData[]) {
    if (!this.adminReviewData) return;
    this.adminReviewData[mealType] = reviewData.map(
      (eachReview) => new AdminReviewModel(eachReview)
    );
  }
  addReview(mealType: MealTypeEnum, reviewData: ReviewData) {
    this.adminReviewData[mealType].push(new AdminReviewModel(reviewData));
  }
}

const AdminReviewStore = new _AdminReviewStore();
export default AdminReviewStore;
