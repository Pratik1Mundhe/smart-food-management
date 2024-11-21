import dayjs from "dayjs";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";

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
  const handleNextDate: VoidFunctionType = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(nextDate);
  };

  const handlePreviousDate: VoidFunctionType = () => {
    if (today) {
      return;
    }
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
        <FaChevronLeft
          className={`h-3 w-3 ${today ? "opacity-50 pointer-events-none" : ""}`}
        />
      </button>

      <div className="py-2 border-2 w-[140px]">
        <p className="text-sm text-secondary text-center">{renderDayText()}</p>
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
