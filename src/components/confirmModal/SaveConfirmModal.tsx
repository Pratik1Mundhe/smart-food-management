import React from "react";
import { observer } from "mobx-react-lite";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import ConfirmModal from "../commonComponents/ConfirmModal";
import {
  MealStatusEnum,
  ReactElementType,
  VoidFunctionType,
} from "../../types";
import scheduledMealStore from "../../store/ScheduledMealStore";
import { MEAL_DAY_KEY_FORMAT } from "../../constants";
import useMutateUserPreference from "../../apis/mutations/userPreferenceMeal/useMutateUserPreferenceMeal";
import ModalStore from "../../store/ModalStore";
import formatQuantityData from "../../utils/formatQuantityData";
import UserMealStore from "../../store/UserMealStore";
import Loader from "../loader/Loader";
import { formatDate } from "../../utils/formatDate";

interface ConfirmModalPropsType {
  closeModal: VoidFunctionType;
  action: VoidFunctionType;
  activeTab: string;
  mealSave?: boolean;
}

const SaveConfirmModal: React.FC<ConfirmModalPropsType> = ({
  action,
  closeModal,
  activeTab,
  mealSave,
}) => {
  const { triggerUserPreference, loading } = useMutateUserPreference(
    ModalStore.typeOfMeal!,
    action
  );
  const { t } = useTranslation();
  const handleClickSave: VoidFunctionType = () => {
    if (!mealSave) {
      action();
      closeModal();
    } else {
      const variables = {
        date: formatDate(UserMealStore.data!),
        mealId: scheduledMealStore.getMealId(
          dayjs(formatDate(UserMealStore.data!)).format(MEAL_DAY_KEY_FORMAT),
          ModalStore.typeOfMeal!
        ),
        mealItems: formatQuantityData(
          scheduledMealStore.getMealItems(
            dayjs(formatDate(UserMealStore.data!)).format(MEAL_DAY_KEY_FORMAT),
            ModalStore.typeOfMeal!
          ),
          activeTab,
          ModalStore.typeOfMeal
        ),
        mealPreference: activeTab.toUpperCase(),
        mealStatus: MealStatusEnum.NULL.toUpperCase(),
        mealType: ModalStore.typeOfMeal.toUpperCase(),
      };
      triggerUserPreference(variables);
      UserMealStore.setUserPreference(activeTab, ModalStore.typeOfMeal);
    }
  };

  const renderButtons: ReactElementType = () => {
    if (loading) {
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
