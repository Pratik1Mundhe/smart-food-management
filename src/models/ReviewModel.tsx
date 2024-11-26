import { makeAutoObservable } from "mobx";
interface ReviewType {
  id: string;
  name: string;
  quality: number;
  taste: number;
}

class ReviewModel {
  id: string;
  name: string;
  quality: number;
  taste: number;
  constructor(review: ReviewType) {
    this.id = review.id;
    this.name = review.name;
    this.quality = review.quality;
    this.taste = review.taste;
    makeAutoObservable(this, {}, { autoBind: true });
  }
  setQuality(newQuality: number) {
    this.quality = newQuality;
  }
  setTaste(newTaste: number) {
    this.taste = newTaste;
  }
}

export default ReviewModel;
