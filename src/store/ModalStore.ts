import { makeAutoObservable } from "mobx";
class _ModalStore {
  isModalOpen: boolean;
  typeOfMeal: string;
  constructor() {
    this.isModalOpen = false;
    this.typeOfMeal = "";
    makeAutoObservable(this, {}, { autoBind: true });
  }
  openModal(type: string) {
    this.typeOfMeal = type;
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }
}

const ModalStore = new _ModalStore();
export default ModalStore;
