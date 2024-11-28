import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 } from "uuid";
import { observer } from "mobx-react-lite";

import CreateFoodItem from "../pages/createFoodItem/CreateFoodItem";
import handleValidateFoodItemField from "../utils/validationUtils/createFoodItemValidation";
import {
  CreateFoodItemControllerPropsType,
  FoodItemActionEnum,
  FoodItemDataErrorsType,
  FoodItemDataType,
  ValidateUpdatedFoodItemFieldType,
  VoidFunctionType,
} from "../types";

const CreateFoodItemController: React.FC<CreateFoodItemControllerPropsType> = ({
  toggleModal,
  foodItemAction,
  actionType,
  initialFoodItemData,
}) => {
  const { name, category, baseSizeUnit, servingSizeUnit } =
    initialFoodItemData!;
  const [foodItemData, setFoodItemData] = useState<FoodItemDataType>({
    name: name,
    category: category,
    baseSize: baseSizeUnit,
    servingSize: servingSizeUnit,
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
    let hasError = false;
    Object.keys(foodItemData).forEach((key) => {
      const fieldName = key as keyof FoodItemDataType;
      const value = foodItemData[fieldName];
      const error = handleValidateFoodItemField(fieldName, value, t);
      if (error) {
        hasError = true;
      }
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error }));
    });
    return hasError;
  };

  const handleCreateFoodItem: VoidFunctionType = () => {
    const { name, category, baseSize, servingSize } = foodItemData;
    const foodItem = {
      id: v4(),
      name: name,
      category: category,
      baseSizeUnit: baseSize,
      servingSizeUnit: servingSize,
    };
    foodItemAction(foodItem);
    //handle mutation of add food item
  };

  const handleUpdateFoodItem: VoidFunctionType = () => {
    const { id } = initialFoodItemData!;
    const { name, category, baseSize, servingSize } = foodItemData;
    const updatedFoodItem = {
      id,
      name,
      category,
      baseSizeUnit: baseSize,
      servingSizeUnit: servingSize,
    };
    foodItemAction(updatedFoodItem);
  };

  const handleSubmitFoodItem = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!validateFoodItemForm()) {
      switch (actionType) {
        case FoodItemActionEnum.CREATE:
          handleCreateFoodItem();
          break;
        case FoodItemActionEnum.UPDATE:
          handleUpdateFoodItem();
          break;
        default:
          break;
      }
      toggleModal(false);
    } else {
      console.log("Validation errors:", errors);
    }
  };

  return (
    <CreateFoodItem
      actionType={actionType}
      foodItemData={foodItemData}
      errors={errors}
      handleInputChange={handleInputChange}
      handleSubmitFoodItem={handleSubmitFoodItem}
      toggleModal={toggleModal}
    />
  );
};

export default observer(CreateFoodItemController);
