import dayjs from "dayjs";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { DATE_FORMAT } from "../../constants";
import { VoidFunctionType } from "../../types";

interface MealDatePropsType {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}

const MealDate: React.FC<MealDatePropsType> = ({
  currentDate,
  setCurrentDate,
}) => {
  const today: boolean = currentDate.getDate() == new Date().getDate();
  const { t } = useTranslation();
  const [showCalender, setShowCalender] = useState(false);

  const handleNextDate: VoidFunctionType = () => {
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
    // if (today) {
    //   return;
    // }
    const prevDate = new Date(currentDate);
    prevDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(prevDate);
  };

  const renderDayText = (): string => {
    switch (currentDate.getDate()) {
      case new Date().getDate():
        return t("today");
      case new Date().getDate() + 1:
        return t("tomorrow");
      case new Date().getDate() - 1:
        return "Yesterday";
      default:
        return dayjs(currentDate).format(DATE_FORMAT);
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handlePreviousDate}
        className={`p-3 border-2 border-r-0 rounded-l`}
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
        className="p-3 border-2 border-l-0 rounded-r"
      >
        <FaChevronRight className="h-3 w-3" />
      </button>
    </div>
  );
};

export default MealDate;
