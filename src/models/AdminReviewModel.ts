import { ReviewModelType } from "../types";

class AdminReviewModel {
  id: string;
  profilePic: string;
  name: string;
  review: string;
  constructor(reviews: ReviewModelType) {
    this.id = reviews.id;
    this.profilePic = reviews.profilePic;
    this.name = reviews.name;
    this.review = reviews.review;
  }
}

export default AdminReviewModel;
