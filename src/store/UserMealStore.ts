import { makeAutoObservable } from "mobx";

class _UserMealStore {
  userId: string | null = null;
  data: string;

  constructor() {
    this.data = "Today";

    makeAutoObservable(this, {}, { autoBind: true });
  }

  setDate(newDate: string): void {
    this.data = newDate;
  }
  setUserId(user: string): void {
    this.userId = user;
  }
}

const UserMealStore = new _UserMealStore();
export default UserMealStore;
