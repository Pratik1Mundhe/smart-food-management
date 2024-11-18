import React from "react";

import ConfirmModal from "../commonComponents/ConfirmModal";
import { FoodItemType, ReactElementType, VoidFunctionType } from "../../types";
import { observer } from "mobx-react-lite";

interface ConfirmModalPropsType {
  foodItem: FoodItemType;
  handleCloseDeleteConfirmModal: VoidFunctionType;
  removeFoodItem: (id: string) => void;
}

const DeleteConfirmModal: React.FC<ConfirmModalPropsType> = ({
  foodItem,
  handleCloseDeleteConfirmModal,
  removeFoodItem,
}) => {
  const { name, id } = foodItem;

  const handleClickDelete: VoidFunctionType = () => {
    handleCloseDeleteConfirmModal();
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
          onClick={handleCloseDeleteConfirmModal}
          className="rounded text-sm py-2 px-5 text-general font-semibold border-2"
        >
          Cancel
        </button>
      </div>
    );
  };
  return (
    <ConfirmModal>
      <div className="flex flex-col gap-12 py-16 px-14">
        <h1 className="text-black font-medium text-2xl text-center max-w-[400px]">
          Are you sure you want to delete {name}
        </h1>
        {renderButtons()}
      </div>
    </ConfirmModal>
  );
};

export default observer(DeleteConfirmModal);
