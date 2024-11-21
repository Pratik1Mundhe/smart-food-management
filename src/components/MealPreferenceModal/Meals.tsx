import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import useGetCustomUserMeal from "../../apis/queries/getCustomUserMeal/useGetCustomUserMeal";
import CustomMealStore from "../../store/CustomMealStore";
import CustomMeal from "./CustomMeal";
import ModalStore from "../../store/ModalStore";
import MealFoodItemModel from "../../models/MealFoodItemModel";
import Loader from "../loader/Loader";
import calculateCustomIndex from "../../utils/calculateCustomIndex";
import {
  mealContainer,
  mealsCustomContainer,
  mealsContainer,
  mealItem,
  mealQuantity,
} from "./styles";
import { formatDate } from "../../utils/formatDate";
import UserMealStore from "../../store/UserMealStore";

interface MealsPropsType {
  meals: MealFoodItemModel[];
  activeTab: string;
}

const Meals: React.FC<MealsPropsType> = ({ meals, activeTab }) => {
  const { t } = useTranslation();
  const { loading, error, triggerFetchCustomUser } = useGetCustomUserMeal();
  const date = formatDate(UserMealStore.data!);
  useEffect(() => {
    if (activeTab === "custom") {
      triggerFetchCustomUser(date);
    }
  }, [date, activeTab]);

  if (loading) {
    return (
      <div className="relative top-[50%] left-[35%]">
        <Loader color="blue" height={50} width={50} radius={5} />
      </div>
    );
  }

  const customMealsContainer = () => {
    const index = calculateCustomIndex(ModalStore.typeOfMeal!);
    if (CustomMealStore.meals.length > 0) {
      return (
        <ul className={mealsCustomContainer}>
          {CustomMealStore.meals[index].items.map((eachMeal) => (
            <CustomMeal eachMeal={eachMeal} />
          ))}
        </ul>
      );
    }
    return (
      <ul className={mealsCustomContainer}>
        {meals.map((eachMeal) => (
          <CustomMeal eachMeal={eachMeal} />
        ))}
      </ul>
    );
  };

  if (activeTab === "custom") {
    return customMealsContainer();
  }
  return (
    <ul className={mealsContainer}>
      {meals.map((eachMeal) => {
        const quantity =
          activeTab === "full"
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
export default observer(Meals);
