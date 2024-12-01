import UserMealCard from "../components/userMealCard/UserMealCard";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
// import { useTranslation } from "react-i18next";

import useFetchScheduledMeal from "../apis/queries/getScheduledMeal/useFetchScheduledMeal";
import useSaveMealStatus from "../apis/mutations/saveMealStatus/useSaveMealStatus";
import UserMealStore from "../store/UserMealStore";
import ModalStore from "../store/ModalStore";
import { MealTypeEnum, MealStatusEnum, PreferenceTypeAction } from "../types";
import Loader from "../components/loader/Loader";
// import { VoidFunctionType } from "../types";
import calculateCutoffTime from "../utils/calculateCutoffTime";
import calculateMealCompleteTime from "../utils/calculateMealCompletedTime";
import scheduledMealStore from "../store/ScheduledMealStore";
import { MEAL_DAY_KEY_FORMAT } from "../constants";
// import { ReactElementType } from "../types";
// import {
//   mealErrorMsgContainer,
//   retryButton,
// } from "../components/userMealCard/styles";
import { observer } from "mobx-react";

interface UserMealCardControllerType {
  date: string;
  type: MealTypeEnum;
  mealTime: string;
}

const UserMealCardController: React.FC<UserMealCardControllerType> = (
  props
) => {
  const { date, type, mealTime } = props;
  const userPreference = UserMealStore.mealPreference[type];

  const [isEditable, setIsEditable] = useState(true);
  const [isMealAteStatus, setIsMealStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  // const { t } = useTranslation();

  const fetchScheduleMealAPI = useFetchScheduledMeal(date, type.toUpperCase());
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
  const mealItems = scheduledMealStore.getMealDayData(date)[type];

  // const handleRefetchMeal: VoidFunctionType = () => {
  //   fetchScheduleMealAPI.refetch({
  //     params: {
  //       date: date,
  //       mealType: type.toUpperCase(),
  //     },
  //   });
  // };
  // const mealErrorMessage: ReactElementType = () => {
  //   return (
  //     <div className={mealErrorMsgContainer}>
  //       <h1 className="text-xl font-semibold ">{t("somethingWentWrong")}</h1>
  //       <button onClick={handleRefetchMeal} className={retryButton}>
  //         {t("retry")}
  //       </button>
  //     </div>
  //   );
  // };
  const fetchScheduleMealStatus = (renderSuccessView: () => JSX.Element) => {
    const loadingState =
      fetchScheduleMealAPI.mealsLoading ||
      fetchScheduleMealAPI.refetchLoading ||
      loading;
    switch (true) {
      // case fetchScheduleMealAPI.error !== undefined: {
      //   return mealErrorMessage();
      // }
      case loadingState: {
        return <Loader color="blue" height={40} width={40} radius={4} />;
      }
      default:
        return renderSuccessView();
    }
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
        dayjs(date).format(MEAL_DAY_KEY_FORMAT),
        type
      ),
    });
  }

  const actions: PreferenceTypeAction = {
    edit: {
      type: "EDIT",
      isDisable: isEditable,
      isMealTimeCompleted: isMealAteStatus,
      onClick: handelEditButton,
    },
    ate: {
      type: "I_ATE",
      isDisable: saveMealStatusAPI.loading,
      isMealTimeCompleted: isMealAteStatus,
      onClick: () => handelTriggerSaveMealStatus(MealStatusEnum.ATE),
    },
    skip: {
      type: "I_SKIP",
      isDisable: saveMealStatusAPI.loading,
      isMealTimeCompleted: isMealAteStatus,
      onClick: () => handelTriggerSaveMealStatus(MealStatusEnum.ATE),
    },
  };

  return (
    <UserMealCard
      mealType={type}
      mealTime={mealTime}
      mealItems={mealItems}
      actions={actions}
      userPreference={userPreference}
      fetchScheduleMealStatus={fetchScheduleMealStatus}
    />
  );
};

export default observer(UserMealCardController);
