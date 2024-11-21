import React from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import ConfirmModal from "../commonComponents/ConfirmModal";
import {
  MealStatusEnum,
  ReactElementType,
  VoidFunctionType,
} from "../../types";
import { observer } from "mobx-react-lite";
import useSaveMealStatus from "../../apis/mutations/saveMealStatus/useSaveMealStatus";
import Loader from "../loader/Loader";
import scheduledMealStore from "../../store/ScheduledMealStore";
import { MEAL_DAY_KEY_FORMAT } from "../../constants";
import ModalStore from "../../store/ModalStore";

interface ConfirmModalPropsType {
  closeModal: VoidFunctionType;
  action: VoidFunctionType;
}

const SkipConfirmModal: React.FC<ConfirmModalPropsType> = ({
  closeModal,
  action,
}) => {
  const { triggerSaveMealStatue, loading, error } = useSaveMealStatus(action);
  const { t } = useTranslation();
  function handelSkipButton() {
    triggerSaveMealStatue({
      mealId: scheduledMealStore.getMealId(
        dayjs(new Date()).format(MEAL_DAY_KEY_FORMAT),
        ModalStore.typeOfMeal!
      ),
      status: MealStatusEnum.SKIP,
    });
  }
  const renderButtons: ReactElementType = () => {
    return (
      <div className="flex items-center self-center gap-6">
        <button
          onClick={handelSkipButton}
          className="bg-error text-sm text-white px-5 py-2 rounded font-semibold"
        >
          {loading ? <Loader /> : t("skip")}
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
