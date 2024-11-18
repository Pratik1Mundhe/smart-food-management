import React from "react";
import { observer } from "mobx-react-lite";
import { IoIosCloseCircle } from "react-icons/io";

import { FoodItemType, VoidFunctionType } from "../../types";
import QuantityCounter from "../quantityCounter/QuantityCounter";

interface ScheduleFoodItemPropsType {
  food: FoodItemType;
  updateFullMealQuantity: (id: string, quantity: number) => void;
  updateHalfMealQuantity: (id: string, quantity: number) => void;
  removeFoodItem: (id: string) => void;
  handleOpenConfirmModal: (id: string) => void;
}

const ScheduleFoodItem: React.FC<ScheduleFoodItemPropsType> = ({
  food,
  updateFullMealQuantity,
  handleOpenConfirmModal,
  updateHalfMealQuantity,
}) => {
  const { name, id } = food;

  const handleClickCloseButton: VoidFunctionType = () => {
    handleOpenConfirmModal(id);
  };

  const handleFullMealQuantity = (quantity: number): void => {
    updateFullMealQuantity(id, quantity);
  };

  const handleHalfMealQuantity = (quantity: number): void => {
    updateHalfMealQuantity(id, quantity);
  };

  return (
    <div className="flex items-center gap-4">
      <p className="w-1/4 text-secondary font-medium text-lg">{name}</p>

      <QuantityCounter
        quantity={food.fullMealQuantity}
        setQuantity={handleFullMealQuantity}
      />
      <QuantityCounter
        quantity={food.halfMealQuantity}
        setQuantity={handleHalfMealQuantity}
      />

      <button onClick={handleClickCloseButton} className="">
        <IoIosCloseCircle color="lightGray" className="text-xl" />
      </button>
    </div>
  );
};

export default observer(ScheduleFoodItem);
