import React from "react";

import ConfirmModal from "../commonComponents/ConfirmModal";
import { ReactElementType, VoidFunctionType } from "../../types";

interface ConfirmModalPropsType {
  closeModal: VoidFunctionType;
  action: VoidFunctionType;
}

const SaveConfirmModal: React.FC<ConfirmModalPropsType> = ({
  action,
  closeModal,
}) => {
  const handleClickSave: VoidFunctionType = () => {
    action();
  };

  const renderButtons: ReactElementType = () => {
    return (
      <div className="flex items-center self-center gap-6">
        <button
          onClick={handleClickSave}
          className="bg-success text-sm text-white px-5 py-2 rounded font-semibold"
        >
          Save
        </button>
        <button
          onClick={closeModal}
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
          Are you sure you want to save?
        </h1>
        {renderButtons()}
      </div>
    </ConfirmModal>
  );
};

export default SaveConfirmModal;
