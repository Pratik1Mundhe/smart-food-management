import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import CreateFoodItem from "../pages/createFoodItem/CreateFoodItem";
import handleValidateFoodItemField from "../utils/validationUtils/createFoodItemValidation";
import {
  BaseSizeUnitEnum,
  FoodItemCategoryEnum,
  FoodItemDataErrorsType,
  FoodItemDataType,
  ServingSizeUnitEnum,
} from "../types";

interface ValidateUpdatedFoodItemFieldType {
  (
    name: string,
    value:
      | string
      | FoodItemCategoryEnum
      | BaseSizeUnitEnum
      | ServingSizeUnitEnum
  ): void;
}

const CreateFoodItemController: React.FC = () => {
  const [foodItemData, setFoodItemData] = useState<FoodItemDataType>({
    name: "",
    category: "",
    baseSize: "",
    servingSize: "",
  });

  const [errors, setErrors] = useState<FoodItemDataErrorsType>({
    name: null,
    category: null,
    baseSize: null,
    servingSize: null,
  });

  const { t } = useTranslation();

  const handleValidateUpdatedFoodItemField: ValidateUpdatedFoodItemFieldType = (
    name,
    value
  ) => {
    const error = handleValidateFoodItemField(name, value, t);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFoodItemData({
      ...foodItemData,
      [name]: value,
    });
    handleValidateUpdatedFoodItemField(name, value);
  };

  const validateFoodItemForm = (): boolean => {
    const newErrors: FoodItemDataErrorsType = {
      name: null,
      category: null,
      baseSize: null,
      servingSize: null,
    };
    Object.keys(foodItemData).forEach((key) => {
      const fieldName = key as keyof FoodItemDataType;
      const value = foodItemData[fieldName];
      const error = handleValidateFoodItemField(fieldName, value, t);
      newErrors[fieldName] = error;
    });
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmitFoodItem = (e: React.FormEvent): void => {
    e.preventDefault();

    if (validateFoodItemForm()) {
      console.log("Food item data is valid:", foodItemData);
      // Submit logic
    } else {
      console.log("Validation errors:", errors);
    }
  };

  return (
    <CreateFoodItem
      foodItemData={foodItemData}
      errors={errors}
      handleInputChange={handleInputChange}
      handleSubmitFoodItem={handleSubmitFoodItem}
    />
  );
};

export default CreateFoodItemController;
