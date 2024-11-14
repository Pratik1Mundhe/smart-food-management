import React from "react";
import { useNavigate } from "react-router-dom";
import { LuUserCircle } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa";

import globalLogo from "../../assets/global-logo.png";
import ToggleSwitch from "../toggleButton/ToggleButton";
import { PageRoutesEnum, ReactElementType } from "../../types";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;

  const renderCampusToggleButton: ReactElementType = () => {
    return (
      <li className="flex items-center gap-6">
        <p className="text-general text-sm font-medium">In Campus</p>
        <ToggleSwitch />
      </li>
    );
  };

  const renderUserProfile: ReactElementType = () => {
    return (
      <li className="flex items-center gap-2">
        <LuUserCircle className="h-5 w-5" />
        <h1 className="text-general text-sm font-medium">Sai</h1>
        <FaChevronDown className="text-sm cursor-pointer" />
      </li>
    );
  };

  return (
    <div className="flex items-center justify-between px-10 border-b-[1px]">
      <img
        onClick={() => navigate(PageRoutesEnum.HOME_PAGE)}
        src={globalLogo}
        className="h-[60px] w-[60px] cursor-pointer"
      />

      <ul className="flex justify-between items-center gap-4 w-[40%]">
        {renderCampusToggleButton()}
        <li
          onClick={() => navigate(PageRoutesEnum.HOME_PAGE)}
          className={`text-general text-sm font-medium cursor-pointer ${
            path === PageRoutesEnum.HOME_PAGE ? "text-primary" : "text-general"
          }`}
        >
          Home
        </li>
        <li
          onClick={() => navigate(PageRoutesEnum.WEEKLY_MENU_PAGE)}
          className={`text-general text-sm font-medium cursor-pointer ${
            path === PageRoutesEnum.WEEKLY_MENU_PAGE
              ? "text-primary"
              : "text-general"
          }`}
        >
          Weekly Menu
        </li>
        {renderUserProfile()}
      </ul>
    </div>
  );
};

export default Navbar;
