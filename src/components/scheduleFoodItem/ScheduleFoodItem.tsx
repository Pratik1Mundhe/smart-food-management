import React from "react";
import { observer } from "mobx-react-lite";
import { IoIosCloseCircle } from "react-icons/io";

import { ScheduleFoodItemPropsType, VoidFunctionType } from "../../types";
import QuantityCounter from "../quantityCounter/QuantityCounter";

const ScheduleFoodItem: React.FC<ScheduleFoodItemPropsType> = ({
  food,

  handleOpenConfirmModal,
}) => {
  const { name, id } = food;

  const handleClickCloseButton: VoidFunctionType = () => {
    handleOpenConfirmModal(id);
  };

  const handleFullMealQuantity = (quantity: number): void => {
    food.updateFullMealQuantity(quantity);
  };

  const handleHalfMealQuantity = (quantity: number): void => {
    food.updateHalfMealQuantity(quantity);
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
