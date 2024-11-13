import React from "react";

import Modal from "../modal/Modal";
import { foodItemType, ReactElementType, VoidFunctionType } from "../../types";

interface ConfirmModalPropsType {
  foodItem: foodItemType;
  handleCloseConfirmModal: VoidFunctionType;
  removeFoodItem: (id: number) => void;
}

const DeleteConfirmModal: React.FC<ConfirmModalPropsType> = ({
  foodItem,
  handleCloseConfirmModal,
  removeFoodItem,
}) => {
  const { name, id } = foodItem;

  const handleClickDelete: VoidFunctionType = () => {
    handleCloseConfirmModal();
    removeFoodItem(id);
  };

  const renderButtons: ReactElementType = () => {
    return (
      <div className="flex items-center self-center gap-6">
        <button
          onClick={handleClickDelete}
          className="bg-error text-sm text-white px-5 py-2 rounded font-semibold"
        >
          Delete
        </button>
        <button
          onClick={handleCloseConfirmModal}
          className="rounded text-sm py-2 px-5 text-general font-semibold border-2"
        >
          Cancel
        </button>
      </div>
    );
  };

  return (
    <Modal close={handleCloseConfirmModal}>
      <div className="flex flex-col gap-12">
        <h1 className="text-black font-medium text-2xl text-center max-w-[400px]">
          Are you sure you want to delete {name}
        </h1>
        {renderButtons()}
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
