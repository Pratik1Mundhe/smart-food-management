import { makeAutoObservable } from "mobx";

class _UserMealStore {
  userId: string;
  data: string;

  constructor() {
    this.data = "Today";
    this.userId = "";

    makeAutoObservable(this, {}, { autoBind: true });
  }

  setDate(newDate: string) {
    this.data = newDate;
  }
  setUserId(user: string) {
    this.userId = user;
  }
}

const UserMealStore = new _UserMealStore();
export default UserMealStore;
