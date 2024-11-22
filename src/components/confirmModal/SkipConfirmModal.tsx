import React from "react";
import { useTranslation } from "react-i18next";

import ConfirmModal from "../commonComponents/ConfirmModal";
import { ReactElementType, VoidFunctionType } from "../../types";
import { observer } from "mobx-react-lite";
import Loader from "../loader/Loader";

interface ConfirmModalPropsType {
  closeModal: VoidFunctionType;
  handelSkipStatus: () => void;
  saveStatusLoading: boolean;
}

const SkipConfirmModal: React.FC<ConfirmModalPropsType> = ({
  closeModal,
  handelSkipStatus,
  saveStatusLoading,
}) => {
  const { t } = useTranslation();
  const renderButtons: ReactElementType = () => {
    return (
      <div className="flex items-center self-center gap-6">
        <button
          onClick={handelSkipStatus}
          className="bg-error text-sm text-white px-5 py-2 rounded font-semibold"
        >
          {saveStatusLoading ? <Loader /> : t("skip")}
        </button>
        <button
          onClick={closeModal}
          className="rounded text-sm py-2 px-5 text-general font-semibold border-2"
        >
          {t("cancel")}
        </button>
      </div>
    );
  };

  return (
    <ConfirmModal>
      <div className="flex flex-col gap-12 py-16 px-14">
        <h1 className="text-black font-medium text-2xl text-center max-w-[400px]">
          {t("confirmSkip")}
        </h1>
        {renderButtons()}
      </div>
    </ConfirmModal>
  );
};

export default observer(SkipConfirmModal);
