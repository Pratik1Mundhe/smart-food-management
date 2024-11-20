import { makeAutoObservable } from "mobx";

class ModalStore {
  isModalOpen: boolean;
  typeOfMeal: string;
  isConfirmModalOpen: boolean;

  constructor() {
    this.isModalOpen = false;
    this.typeOfMeal = "";
    this.isConfirmModalOpen = false;
    makeAutoObservable(this, {}, { autoBind: true });
  }
  openModal(type?: string): void {
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

  static createModalStore() {
    return new ModalStore();
  }
}

export default ModalStore.createModalStore();
