import React from "react";
import { IoIosCloseCircle } from "react-icons/io";

import { foodItemType } from "../../types";
import QuantityCounter from "../quantityCounter/QuantityCounter";
import { observer } from "mobx-react-lite";

interface ScheduleFoodItemPropsType {
  food: foodItemType;
  updateFullMealQuantity: (id: number, quantity: number) => void;
  updateHalfMealQuantity: (id: number, quantity: number) => void;
  removeFoodItem: (id: number) => void;
  handleOpenConfirmModal: (id: number) => void;
}

const ScheduleFoodItem: React.FC<ScheduleFoodItemPropsType> = ({
  food,
  updateFullMealQuantity,
  handleOpenConfirmModal,
  updateHalfMealQuantity,
}) => {
  const { name, id } = food;

  const handleClickCloseButton = () => {
    handleOpenConfirmModal(id);
  };

  const handleFullMealQuantity = (quantity: number) => {
    updateFullMealQuantity(id, quantity);
  };

  const handleHalfMealQuantity = (quantity: number) => {
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
