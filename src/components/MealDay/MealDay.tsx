import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { VoidFunctionType } from "../../types";

interface MealDayPropsType {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}

const MealDay: React.FC<MealDayPropsType> = ({
  currentDate,
  setCurrentDate,
}) => {
  const [showCalender, setShowCalender] = useState(false);

  const handleNextDate: VoidFunctionType = () => {
    if (currentDate.getDay() === 6) {
      return;
    }
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(nextDate);
  };
  const handelOnChangeCalenderDate = (date: Date | null) => {
    if (date) {
      setCurrentDate(date);
      setShowCalender(false);
      return;
    }
  };

  const showDatePicker = () => {
    if (showCalender) {
      return (
        <div className="absolute  top-0 left-[120px] transform -translate-x-1/2 z-10">
          <DatePicker
            selected={currentDate}
            onChange={(date: Date | null) => handelOnChangeCalenderDate(date)}
            inline
          />
        </div>
      );
    }
  };

  const handlePreviousDate: VoidFunctionType = () => {
    if (currentDate.getDay() === 0) {
      return;
    }
    const prevDate = new Date(currentDate);
    prevDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(prevDate);
  };

  const renderDayText = (): string => {
    switch (currentDate.getDay()) {
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
        return "Sunday";
    }
  };
  const isNextDayDisable = renderDayText() === "Saturday";
  const isPreviousDayDisable = renderDayText() === "Sunday";
  return (
    <div className="flex items-center">
      <button
        onClick={handlePreviousDate}
        className={`p-3 border-2 border-r-0 rounded-l ${
          isPreviousDayDisable ? "cursor-not-allowed text-gray-300" : ""
        }`}
        disabled={isPreviousDayDisable}
      >
        <FaChevronLeft className={`h-3 w-3`} />
      </button>

      <div className="relative py-2 border-2 w-[140px]">
        <p
          className="text-sm text-secondary text-center cursor-pointer"
          onClick={() => setShowCalender(!showCalender)}
        >
          {renderDayText()}
        </p>

        {showDatePicker()}
      </div>

      <button
        onClick={handleNextDate}
        className={`p-3 border-2 border-l-0 rounded-r ${
          isNextDayDisable ? "cursor-not-allowed text-gray-300" : ""
        }`}
        disabled={isNextDayDisable}
      >
        <FaChevronRight className="h-3 w-3" />
      </button>
    </div>
  );
};

export default MealDay;
