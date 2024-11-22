import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import CustomMealItemModel from "../../models/CustomMealItemModel";
import { MAX_QUANTITY_LIMIT, MIN_QUANTITY_LIMIT } from "../../constants";
import {
  counterStyle,
  mealContainer,
  mealItem,
  quantityTextStyle,
} from "./styles";

interface CustomProp {
  eachMeal: CustomMealItemModel;
}

const CustomMeal = (props: CustomProp) => {
  const { eachMeal } = props;
  function handelIncreaseQuantity() {
    eachMeal.increaseCustomMeal();
  }
  function handelDecreaseQuantity() {
    eachMeal.decreaseCustomMeal();
  }
  const { t } = useTranslation();

  const quantityChangeButtons = (): React.ReactElement => {
    return (
      <p>
        <button
          className={counterStyle}
          disabled={eachMeal.customMealQuantity === MIN_QUANTITY_LIMIT}
          onClick={handelDecreaseQuantity}
        >
          -
        </button>
        <span className={counterStyle}>{eachMeal.customMealQuantity}</span>
        <button
          className={counterStyle}
          disabled={eachMeal.customMealQuantity >= MAX_QUANTITY_LIMIT}
          onClick={handelIncreaseQuantity}
        >
          +
        </button>
      </p>
    );
  };

  return (
    <li key={eachMeal.id} className={mealContainer}>
      <p className={mealItem}>{eachMeal.name}</p>
      <div className="flex flex-row gap-2">
        {quantityChangeButtons()}
        <span className={quantityTextStyle}>{t("quantity")}</span>
      </div>
    </li>
  );
};

export default observer(CustomMeal);
