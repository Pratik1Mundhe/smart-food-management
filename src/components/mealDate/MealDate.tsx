import dayjs from "dayjs";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Calendar, { CalendarProps } from "react-calendar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { DATE_FORMAT } from "../../constants";
import {
  MealDatePropsType,
  ReactElementType,
  VoidFunctionType,
} from "../../types";
import { failureToast } from "../../utils/toastUtils/failureToast";

const MealDate: React.FC<MealDatePropsType> = ({
  currentDate,
  setCurrentDate,
}) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false);
  const { t } = useTranslation();

  const tPath = "pages.adminHome.scheduleMeal.mealDate";
  const today: boolean = currentDate.getDate() == new Date().getDate();
  const nextTomorrowDateNumber: number = new Date().getDate() + 1;
  const nextTomorrowDate = new Date();
  nextTomorrowDate.setDate(nextTomorrowDateNumber);

  const handleNextDate: VoidFunctionType = () => {
    if (currentDate >= nextTomorrowDate) {
      failureToast("Meal can't be scheduled after 2 days");
      return;
    }
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
        return t(tPath + ".today");
      case new Date().getDate() + 1:
        return t(tPath + ".tomorrow");
      default:
        return dayjs(currentDate).format(DATE_FORMAT);
    }
  };

  const handleDateClick: VoidFunctionType = () => {
    setIsCalendarVisible((prev) => !prev);
  };

  const onDateChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) {
      setCurrentDate(value);
    }
    setIsCalendarVisible(false);
  };

  const renderChevronRight: ReactElementType = () => {
    return (
      <button
        onClick={handleNextDate}
        className={`p-3 border-2 border-l-0 rounded-r ${
          currentDate >= nextTomorrowDate && "opacity-50 "
        }`}
      >
        <FaChevronRight className="h-3 w-3" />
      </button>
    );
  };
  const renderChevronLeft: ReactElementType = () => {
    return (
      <button
        onClick={handlePreviousDate}
        className={`p-3 border-2 border-r-0 rounded-l`}
      >
        <FaChevronLeft
          className={`h-3 w-3 ${today ? "opacity-50 pointer-events-none" : ""}`}
        />
      </button>
    );
  };
  const renderDate: ReactElementType = () => {
    return (
      <div
        onClick={handleDateClick}
        className="py-2 border-2 w-[140px] cursor-pointer"
      >
        <p className="text-sm text-secondary text-center">{renderDayText()}</p>
      </div>
    );
  };

  const renderCalender: ReactElementType = () => {
    if (isCalendarVisible) {
      return (
        <Calendar
          className="rounded absolute top-10 text-xs shadow-lg"
          onChange={onDateChange}
          value={currentDate}
        />
      );
    }
    return <></>;
  };

  return (
    <div className="flex items-center relative">
      {renderChevronLeft()}
      {renderDate()}
      {renderChevronRight()}
      {renderCalender()}
    </div>
  );
};

export default MealDate;
