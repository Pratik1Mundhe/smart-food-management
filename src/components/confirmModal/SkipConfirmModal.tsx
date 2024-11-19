import React from "react";

import ConfirmModal from "../commonComponents/ConfirmModal";
import {
  MealStatusEnum,
  ReactElementType,
  VoidFunctionType,
} from "../../types";
import { observer } from "mobx-react-lite";
import useSaveMealStatus from "../../apis/mutations/SaveDayMealStatus/useSaveMealStatus";
import UserMealStore from "../../store/UserMealStore";
import { useTranslation } from "react-i18next";

interface ConfirmModalPropsType {
  closeModal: VoidFunctionType;
  action: VoidFunctionType;
}

const SkipConfirmModal: React.FC<ConfirmModalPropsType> = ({
  closeModal,
  action,
}) => {
  const { t } = useTranslation();
  const tPath = "components.confirmModal.skip";
  // const { triggerSaveMealStatue, loading, error } = useSaveMealStatus();

  function handelSkipButton() {
    action();
    // triggerSaveMealStatue({
    //   mealId: UserMealStore.mealId,
    //   status: MealStatusEnum.SKIP,
    // });
  }

  const renderButtons: ReactElementType = () => {
    return (
      <div className="flex items-center self-center gap-6">
        <button
          onClick={handelSkipButton}
          className="bg-error text-sm text-white px-5 py-2 rounded font-semibold"
        >
          {t(tPath + ".buttons.skip")}
        </button>
        <button
          onClick={closeModal}
          className="rounded text-sm py-2 px-5 text-general font-semibold border-2"
        >
          {t(tPath + ".buttons.cancel")}
        </button>
      </div>
    );
  };

  return (
    <ConfirmModal>
      <div className="flex flex-col gap-12 py-16 px-14">
        <h1 className="text-black font-medium text-2xl text-center max-w-[400px]">
          {t(tPath + ".title")}
        </h1>
        {renderButtons()}
      </div>
    </ConfirmModal>
  );
};

export default observer(SkipConfirmModal);
