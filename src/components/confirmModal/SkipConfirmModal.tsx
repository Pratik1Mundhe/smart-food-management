import React from "react";

import Modal from "../modal/Modal";
import { ReactElementType, VoidFunctionType } from "../../types";

interface ConfirmModalPropsType {
  closeModal: VoidFunctionType;
  action: VoidFunctionType;
}

const SkipConfirmModal: React.FC<ConfirmModalPropsType> = ({
  closeModal,
  action,
}) => {
  const renderButtons: ReactElementType = () => {
    return (
      <div className="flex items-center self-center gap-6">
        <button
          onClick={action}
          className="bg-error text-sm text-white px-5 py-2 rounded font-semibold"
        >
          Skip
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
    <Modal close={closeModal}>
      <div className="flex flex-col gap-12">
        <h1 className="text-black font-medium text-2xl text-center max-w-[400px]">
          Are you sure you want to skip?
        </h1>
        {renderButtons()}
      </div>
    </Modal>
  );
};

export default SkipConfirmModal;
