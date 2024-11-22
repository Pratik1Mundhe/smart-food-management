import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import ConfirmModal from "../commonComponents/ConfirmModal";
import { ReactElementType, VoidFunctionType } from "../../types";

import Loader from "../loader/Loader";

interface ConfirmModalPropsType {
  closeModal: VoidFunctionType;
  action: VoidFunctionType;
  isUserMealSave?: boolean;
  handleTriggerUserPreference?: () => void;
  saveMealPreferenceLoading?: boolean;
}

const SaveConfirmModal: React.FC<ConfirmModalPropsType> = ({
  action,
  closeModal,
  isUserMealSave,
  handleTriggerUserPreference,
  saveMealPreferenceLoading,
}) => {
  const { t } = useTranslation();
  const handleClickSave: VoidFunctionType = () => {
    const isSaveMeal = isUserMealSave && handleTriggerUserPreference;
    if (isSaveMeal) {
      handleTriggerUserPreference();
    } else {
      action();
      closeModal();
    }
  };

  const renderButtons: ReactElementType = () => {
    if (saveMealPreferenceLoading) {
      return <Loader color="blue" />;
    }
    return (
      <div className="flex items-center self-center gap-6">
        <button
          onClick={handleClickSave}
          className="bg-success text-sm text-white px-5 py-2 rounded font-semibold"
        >
          {t("save")}
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
          {t("confirmSave")}
        </h1>
        {renderButtons()}
      </div>
    </ConfirmModal>
  );
};

export default observer(SaveConfirmModal);
