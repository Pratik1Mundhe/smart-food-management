import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import useGetUserCustomMeal from "../../apis/queries/getCustomUserMeal/useGetCustomUserMeal";
import CustomMealStore from "../../store/CustomMealStore";
import CustomMeal from "./CustomMeal";
import ModalStore from "../../store/ModalStore";
import MealFoodItemModel from "../../models/MealFoodItemModel";
import Loader from "../loader/Loader";
import { formatDate } from "../../utils/formatDate";
import UserMealStore from "../../store/UserMealStore";
import CustomMealModel from "../../models/CustomMealModel";
import { MealPreferenceEnum } from "../../types";
import { mealErrorMsgContainer, retryButton } from "../userMealCard/styles";
import {
  mealContainer,
  mealsCustomContainer,
  mealsContainer,
  mealItem,
  mealQuantity,
} from "./styles";

interface MealsPropsType {
  meals: MealFoodItemModel[];
  activeTab: string;
}

const Meals: React.FC<MealsPropsType> = (props) => {
  const { meals, activeTab } = props;
  const date = formatDate(UserMealStore.data!);

  const { t } = useTranslation();
  const { loading, error, triggerFetchUserCustomMeal, triggerRefetchFunction } =
    useGetUserCustomMeal();
  useEffect(() => {
    if (activeTab === MealPreferenceEnum.CUSTOM) {
      triggerFetchUserCustomMeal(date);
    }
  }, [date, activeTab]);

  function handleRefetchCustomMeal() {
    triggerRefetchFunction(date);
  }

  const scheduledCustomMeal = (customMeals: CustomMealModel): JSX.Element => {
    return (
      <ul className={mealsCustomContainer}>
        {customMeals.items.map((eachMeal) => (
          <CustomMeal eachMeal={eachMeal} />
        ))}
      </ul>
    );
  };
  const initialCustomMeal = (): JSX.Element => {
    return (
      <ul className={mealsCustomContainer}>
        {meals.map((eachMeal) => (
          <CustomMeal eachMeal={eachMeal} />
        ))}
      </ul>
    );
  };
  const customMealsContainer = () => {
    const customMeals = CustomMealStore.meals.find(
      (eachMeal) => eachMeal.mealType === ModalStore.typeOfMeal!.toUpperCase()
    );
    if (customMeals) {
      return scheduledCustomMeal(customMeals);
    }
    return initialCustomMeal();
  };

  const fullOrHalfMeals = () => {
    return (
      <ul className={mealsContainer}>
        {meals.map((eachMeal) => {
          const quantity =
            activeTab === MealPreferenceEnum.FULL
              ? eachMeal.fullMealQuantity
              : eachMeal.halfMealQuantity;
          return (
            <li key={eachMeal.id} className={mealContainer}>
              <p className={mealItem}>
                {eachMeal.name}
                <br />
              </p>
              <p className={mealQuantity}>
                {quantity} {t("quantity")}
              </p>
            </li>
          );
        })}
      </ul>
    );
  };
  const customMealErrorMessage = (): JSX.Element => {
    return (
      <div className={mealErrorMsgContainer}>
        <h1 className="text-xl font-semibold ">{t("somethingWentWrong")}</h1>
        <button onClick={handleRefetchCustomMeal} className={retryButton}>
          {t("retry")}
        </button>
      </div>
    );
  };

  switch (true) {
    case loading: {
      return (
        <div className="relative top-[50%] left-[35%]">
          <Loader color="blue" height={50} width={50} radius={5} />
        </div>
      );
    }
    // case error !== undefined: {
    //   return customMealErrorMessage();
    // }
    case activeTab === MealPreferenceEnum.CUSTOM: {
      return customMealsContainer();
    }
    default: {
      return fullOrHalfMeals();
    }
  }
};
export default observer(Meals);
