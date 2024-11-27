import React from "react";
import { useTranslation } from "react-i18next";

import CreateFoodItemSelectInput from "./CreateFoodItemSelectInput";
import CreateFoodItemInput from "./CreateFoodItemInput";
import {
  BaseSizeUnitEnum,
  CreateFoodItemPropsType,
  FoodItemCategoryEnum,
  ReactElementType,
  ServingSizeUnitEnum,
} from "../../types";
import {
  BASE_SIZE_UNIT_OPTIONS,
  CREATE_FOOD_ITEM_NAMES,
  FOOD_CATEGORY_OPTIONS,
  FOOD_SERVING_UNIT_OPTIONS,
} from "../../constants";

interface CreateFoodItemSelectFieldType {
  (
    type: string,
    inputValue: string,
    error: string | null,
    options: ServingSizeUnitEnum[] | BaseSizeUnitEnum[] | FoodItemCategoryEnum[]
  ): React.ReactElement;
}

const CreateFoodItem: React.FC<CreateFoodItemPropsType> = ({
  foodItemData,
  errors,
  handleInputChange,
  handleSubmitFoodItem,
  handleCloseCreateFoodItemModal,
}) => {
  const { t } = useTranslation();
  const tPath = "pages.createFoodItem";
  const renderFoodItemSelectInput: CreateFoodItemSelectFieldType = (
    type,
    inputValue,
    error,
    options
  ) => {
    return (
      <div className="flex justify-between items-center">
        <p className="text-lg font-medium text-general">
          {t(tPath + `.labels.${type}`)} :
        </p>
        <CreateFoodItemSelectInput
          type={type}
          inputValue={inputValue}
          error={error}
          options={options}
          handleInputChange={handleInputChange}
        />
      </div>
    );
  };

  const renderFoodItemInput: ReactElementType = () => {
    const inputValue = foodItemData.name;
    const error = errors.name;
    return (
      <div className="flex justify-between items-center">
        <p className="text-lg font-medium text-general">
          {t(tPath + `.labels.name`)} :
        </p>
        <CreateFoodItemInput
          type="name"
          inputValue={inputValue}
          error={error}
          handleInputChange={handleInputChange}
          inputType="text"
          tPath={tPath}
        />
      </div>
    );
  };

  const renderFoodItemFields: ReactElementType = () => {
    return (
      <div className="flex flex-col gap-10 mt-6 max-w-2xl">
        {renderFoodItemInput()}
        {renderFoodItemSelectInput(
          CREATE_FOOD_ITEM_NAMES.category,
          foodItemData.category,
          errors.category,
          FOOD_CATEGORY_OPTIONS
        )}
        {renderFoodItemSelectInput(
          CREATE_FOOD_ITEM_NAMES.baseSize,
          foodItemData.baseSize,
          errors.baseSize,
          BASE_SIZE_UNIT_OPTIONS
        )}
        {renderFoodItemSelectInput(
          CREATE_FOOD_ITEM_NAMES.servingSize,
          foodItemData.servingSize,
          errors.servingSize,
          FOOD_SERVING_UNIT_OPTIONS
        )}
      </div>
    );
  };

  const renderCreateFoodItemButtons: ReactElementType = () => {
    return (
      <div className="flex items-center self-end gap-4 mt-20">
        <button
          onClick={handleCloseCreateFoodItemModal}
          type="button"
          className="rounded border-2 px-5 py-2 text-general bg-transparent hover:bg-slate-100"
        >
          {t(tPath + ".buttons.back")}
        </button>
        <button
          type="submit"
          className="rounded font-semibold px-5 py-2 text-white bg-primary hover:bg-blue-600"
        >
          {t(tPath + ".buttons.submit")}
        </button>
      </div>
    );
  };

  return (
    <div className="py-8">
      <form
        onSubmit={handleSubmitFoodItem}
        className="flex flex-col w-full max-w-5xl rounded border-2 mx-auto py-8 px-12"
      >
        <h1 className="text-general text-3xl font-medium border-b w-fit border-b-primary pb-2">
          {t(tPath + ".title")}
        </h1>
        {renderFoodItemFields()}
        {renderCreateFoodItemButtons()}
      </form>
    </div>
  );
};

export default CreateFoodItem;
