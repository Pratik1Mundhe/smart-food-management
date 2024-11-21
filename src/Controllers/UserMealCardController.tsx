import UserMealCard from "../components/userMealCard/UserMealCard";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import useFetchScheduledMeal from "../apis/queries/getScheduledMeal/useFetchScheduledMeal";
import useSaveMealStatus from "../apis/mutations/saveMealStatus/useSaveMealStatus";
import UserMealStore from "../store/UserMealStore";
import ModalStore from "../store/ModalStore";
import { MealTypeEnum, MealStatusEnum } from "../types";
import { formatDate } from "../utils/formatDate";
import Loader from "../components/loader/Loader";
import { VoidFunctionType } from "../types";
import calculateCutoffTime from "../utils/calculateCutoffTime";
import calculateMealCompleteTime from "../utils/calculateMealCompletedTime";
import scheduledMealStore from "../store/ScheduledMealStore";
import { MEAL_DAY_KEY_FORMAT } from "../constants";
import {
  mealErrorMsgContainer,
  retryButton,
} from "../components/userMealCard/styles";
import { ReactElementType } from "../types";

interface UserMealCardControllerType {
  currentDate: Date;
  type: MealTypeEnum;
  mealTime: string;
}

const UserMealCardController: React.FC<UserMealCardControllerType> = (
  props
) => {
  const { type, mealTime } = props;

  const [isEditable, setIsEditable] = useState(true);
  const [isMealAteStatus, setIsMealStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const fetchScheduleMealAPI = useFetchScheduledMeal(
    formatDate(UserMealStore.data!),
    type.toUpperCase()
  );
  const saveMealStatusAPI = useSaveMealStatus();
  fetchScheduleMealAPI;
  saveMealStatusAPI;

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const cutoff = calculateCutoffTime(mealTime.split("-")[0].trim());
      const mealCompleteTime = calculateMealCompleteTime(
        mealTime.split("-")[1].trim()
      );
      setIsEditable(now < cutoff);
      setIsMealStatus(now > mealCompleteTime);
      setLoading(false);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const mealItems = scheduledMealStore.getMealDayData(
    formatDate(UserMealStore.data!)
  )[type];
  const handleRefetchMeal: VoidFunctionType = () => {
    fetchScheduleMealAPI.refetch({
      params: {
        date: formatDate(UserMealStore.data!),
        mealType: type.toUpperCase(),
      },
    });
  };
  const mealErrorMessage: ReactElementType = () => {
    return (
      <div className={mealErrorMsgContainer}>
        <h1 className="text-xl font-semibold ">{t("somethingWentWrong")}</h1>
        <button onClick={handleRefetchMeal} className={retryButton}>
          {t("retry")}
        </button>
      </div>
    );
  };
  const fetchScheduleMealStatus = (): JSX.Element | null => {
    const loadingState =
      fetchScheduleMealAPI.mealsLoading || fetchScheduleMealAPI.refetchLoading;
    if (fetchScheduleMealAPI.error !== undefined) {
      return mealErrorMessage();
    }
    if (loadingState || loading) {
      return <Loader color="blue" height={40} width={40} radius={4} />;
    }
    return null;
  };

  function handelEditButton(): void {
    if (UserMealStore.inCampusStatus) {
      ModalStore.openModal(type);
    }
  }
  function handelTriggerSaveMealStatus(mealStatus: MealStatusEnum): void {
    saveMealStatusAPI.triggerSaveMealStatue({
      status: mealStatus,
      mealId: scheduledMealStore.getMealId(
        dayjs(formatDate(UserMealStore.data!)).format(MEAL_DAY_KEY_FORMAT),
        type
      ),
    });
  }

  const action: Action[] = [
    {
      type: "EDIT",
      isDisable: isEditable,
      isHidden: isMealAteStatus,
      onClick: handelEditButton,
    },
    {
      type: "I_ATE",
      isDisable: saveMealStatusAPI.loading,
      isHidden: isMealAteStatus,
      onClick: () => handelTriggerSaveMealStatus(MealStatusEnum.ATE),
    },
    {
      type: "I_SKIP",
      isDisable: saveMealStatusAPI.loading,
      isHidden: isMealAteStatus,
      onClick: () => handelTriggerSaveMealStatus(MealStatusEnum.ATE),
    },
  ];

  return (
    <UserMealCard
      mealType={type}
      mealTime={mealTime}
      mealItems={mealItems}
      action={action}
      fetchScheduleMealStatus={fetchScheduleMealStatus()}
    />
  );
};

export default UserMealCardController;

interface Action {
  type: "I_ATE" | "I_SKIP" | "EDIT";
  isDisable: boolean;
  isHidden: boolean;
  onClick: () => void;
}
