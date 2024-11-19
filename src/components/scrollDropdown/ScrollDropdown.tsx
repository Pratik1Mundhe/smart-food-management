import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

import foodItemsStore from "../../store/FoodItemsStore";
import { FoodItemsSelectPropsType } from "../../types";

const InfiniteScrollDropdown: React.FC<FoodItemsSelectPropsType> = ({
  setSelectedFoodItem,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleClickOption = (name: string, id: string) => {
    setSelectedOption(name);
    setSelectedFoodItem({
      id,
      name,
      fullMealQuantity: 0,
      halfMealQuantity: 0,
    });
  };

  const handleClickSelect = () => {
    setShowOptions(true);
  };

  const renderOptions = () => {
    if (showOptions) {
      return (
        <ul className="border-2 text-sm px-2 appearance-none rounded-lg h-[46px] text-slate-800 outline-none w-full mt-4">
          {foodItemsStore.getFoodItems().map((food) => {
            const { id, name } = food;
            return (
              <li onClick={() => handleClickOption(name, id)} key={id}>
                {name}
              </li>
            );
          })}
        </ul>
      );
    }
    return <></>;
  };

  return (
    <div>
      <div className="relative flex flex-col gap-1">
        <button
          disabled={foodItemsStore.getFoodItems().length === 0}
          onClick={handleClickSelect}
          className="border-2 text-sm px-2 appearance-none rounded-lg h-[46px] text-slate-800 text-left outline-none w-full"
        >
          {selectedOption || "Select an option"}
        </button>
        <div className="pointer-events-none absolute top-4 right-3 flex items-center text-slate-600">
          <FiChevronDown className="w-5 h-5" />
        </div>
      </div>
      {renderOptions()}
    </div>
  );
};

export default InfiniteScrollDropdown;
