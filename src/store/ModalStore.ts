import { makeAutoObservable } from "mobx";
class _ModalStore {
  isModalOpen: boolean;
  typeOfMeal: string;
  isConfirmModalOpen: boolean;

  constructor() {
    this.isModalOpen = false;
    this.typeOfMeal = "";
    this.isConfirmModalOpen = false;
    makeAutoObservable(this, {}, { autoBind: true });
  }
  openModal(type: string) {
    this.typeOfMeal = type;
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }

  openConfirmModal() {
    this.isConfirmModalOpen = true;
  }

  closeConfirmModal() {
    this.isConfirmModalOpen = false;
  }
}

const ModalStore = new _ModalStore();
export default ModalStore;
