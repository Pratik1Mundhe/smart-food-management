import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import dayjs from "dayjs";

import {
  mealContainer,
  mealsCustomContainer,
  mealsContainer,
  mealItem,
  mealQuantity,
} from "./styles";
import { MealFoodItemResponseType, MealTypeEnum } from "../../types";
import useGetCustomUserMeal from "../../apis/queries/GetUserMeal/useGetCustomUserMeal";
import CustomMealStore from "../../store/CustomMealStore";
import CustomMeal from "./CustomMeal";
import ModalStore from "../../store/ModalStore";
import { DATE_FORMAT } from "../../constants";

interface MealsPropsType {
  meals: {
    date: string;
    mealType: string;
    items: MealFoodItemResponseType[];
  };
  activeTab: string;
}

const Meals: React.FC<MealsPropsType> = ({ meals, activeTab }) => {
  const { triggerFetchCustomUser } = useGetCustomUserMeal();
  useEffect(() => {
    triggerFetchCustomUser(dayjs(new Date()).format(DATE_FORMAT));
  }, []);
  const type = ModalStore.typeOfMeal.toLocaleLowerCase();

  if (activeTab === "custom") {
    let index;
    if (type === MealTypeEnum.BREAKFAST) {
      index = 0;
    } else if (type === MealTypeEnum.LUNCH) {
      index = 1;
    } else if (type === MealTypeEnum.DINNER) {
      index = 2;
    }

    if (index) {
      return (
        <ul className={mealsCustomContainer}>
          {CustomMealStore.meals[index].items.map((eachMeal) => (
            <CustomMeal eachMeal={eachMeal} />
          ))}
        </ul>
      );
    }
  }
  return (
    <ul className={mealsContainer}>
      {meals.items.map((eachMeal) => {
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
            <p className={mealQuantity}>{quantity} quantity</p>
          </li>
        );
      })}
    </ul>
  );
};
export default observer(Meals);
