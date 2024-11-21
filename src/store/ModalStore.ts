import { makeAutoObservable } from "mobx";
import { MealTypeEnum } from "../types";

class _ModalStore {
  isModalOpen: boolean;
  typeOfMeal: MealTypeEnum;
  isConfirmModalOpen: boolean;

  constructor() {
    this.isModalOpen = false;
    this.typeOfMeal = MealTypeEnum.BREAKFAST;
    this.isConfirmModalOpen = false;
    makeAutoObservable(this, {}, { autoBind: true });
  }
  openModal(type?: MealTypeEnum): void {
    if (type) {
      this.typeOfMeal = type;
    }
    this.isModalOpen = true;
  }
  closeModal(): void {
    this.isModalOpen = false;
  }

  openConfirmModal(): void {
    this.isConfirmModalOpen = true;
  }

  closeConfirmModal(): void {
    this.isConfirmModalOpen = false;
  }
}

const ModalStore = new _ModalStore();
export default ModalStore;
