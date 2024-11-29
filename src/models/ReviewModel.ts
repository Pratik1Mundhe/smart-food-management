import { ReviewModelType } from "../types";

class ReviewModal {
  profilePic: string;
  name: string;
  review: string;
  constructor(reviews: ReviewModelType) {
    this.profilePic = reviews.profilePic;
    this.name = reviews.name;
    this.review = reviews.review;
  }
}

export default ReviewModal;
