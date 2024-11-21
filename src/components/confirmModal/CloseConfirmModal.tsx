import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import ConfirmModal from "../commonComponents/Modal";
import { ReactElementType, VoidFunctionType } from "../../types";

interface ConfirmModalPropsType {
  closeModal: VoidFunctionType;
  closeConfirmModal: VoidFunctionType;
}

const CloseConfirmModal: React.FC<ConfirmModalPropsType> = ({
  closeModal,
  closeConfirmModal,
}) => {
  const renderButtons: ReactElementType = () => {
    const { t } = useTranslation();
    return (
      <div className="flex items-center self-center gap-6">
        <button
          onClick={closeModal}
          className="bg-warning text-sm text-white px-5 py-2 rounded font-semibold"
        >
          {t("back")}
        </button>
        <button
          onClick={closeConfirmModal}
          className="rounded text-sm py-2 px-5 text-general font-semibold border-2"
        >
          {t("cancel")}
        </button>
      </div>
    );
  };
  const { t } = useTranslation();
  return (
    <ConfirmModal>
      <div className="flex flex-col gap-12 py-16 px-14">
        <h1 className="text-black font-medium text-2xl text-center max-w-[400px]">
          {t("confirmClose")}
        </h1>
        {renderButtons()}
      </div>
    </ConfirmModal>
  );
};

export default observer(CloseConfirmModal);
