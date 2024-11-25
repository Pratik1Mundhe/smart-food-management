import { TFunction } from "i18next";
import { CREATE_FOOD_ITEM_NAMES } from "../../constants";
import {
  BaseSizeUnitEnum,
  FoodItemCategoryEnum,
  ServingSizeUnitEnum,
} from "../../types";

interface ValidateFoodItemFieldType {
  (
    name: string,
    value:
      | string
      | FoodItemCategoryEnum
      | BaseSizeUnitEnum
      | ServingSizeUnitEnum,
    t: TFunction<"translation", undefined>
  ): string | null;
}

const handleValidateFoodItemField: ValidateFoodItemFieldType = (
  name,
  value,
  t
) => {
  let error: string | null = null;
  const tPath = "pages.createFoodItem";
  switch (name) {
    case CREATE_FOOD_ITEM_NAMES.name:
      if (!value.trim()) {
        error = t(tPath + ".errors.name");
      }
      break;

    case CREATE_FOOD_ITEM_NAMES.category:
      if (!value.trim()) {
        error = t(tPath + ".errors.category");
      }
      break;

    case CREATE_FOOD_ITEM_NAMES.baseSize:
      if (!value.trim()) {
        error = t(tPath + ".errors.baseSize");
      }
      break;

    case CREATE_FOOD_ITEM_NAMES.servingSize:
      if (!value.trim()) {
        error = t(tPath + ".errors.servingSize");
      }
      break;

    default:
      break;
  }
  return error;
};

export default handleValidateFoodItemField;
