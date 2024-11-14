import React from "react";
import { IoAdd } from "react-icons/io5";
import { FiMinus } from "react-icons/fi";
import { observer } from "mobx-react-lite";
import { VoidFunctionType } from "../../types";

interface QuantityCounterPropsType {
  setQuantity: (quantity: number) => void;
  quantity: number;
}

const QuantityCounter: React.FC<QuantityCounterPropsType> = ({
  setQuantity,
  quantity,
}) => {
  const handleIncreaseCount: VoidFunctionType = () => {
    if (quantity >= 100) {
      return;
    }
    setQuantity(quantity + 1);
  };

  const handleDecreaseCount: VoidFunctionType = () => {
    if (quantity === 0) {
      return;
    }
    setQuantity(quantity - 1);
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleDecreaseCount}
        className="p-2 border-2 border-r-0 rounded-l text-secondary"
      >
        <FiMinus
          fontSize={20}
          className={`${quantity === 0 ? "opacity-50" : ""}`}
        />
      </button>
      <div className="py-2 px-4 border-2 ">
        <p className="text-center text-sm text-secondary">{quantity}</p>
      </div>
      <button
        onClick={handleIncreaseCount}
        className="p-2 border-2 border-l-0 rounded-r text-secondary"
      >
        <IoAdd fontSize={20} />
      </button>
    </div>
  );
};

export default observer(QuantityCounter);
