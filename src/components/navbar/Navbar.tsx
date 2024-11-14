import React from "react";
import { useNavigate } from "react-router-dom";
import { LuUserCircle } from "react-icons/lu";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";

import globalLogo from "../../assets/global-logo.png";
import ToggleSwitch from "../toggleButton/ToggleButton";
import LogoutConfirmModal from "../confirmModal/LogoutConfirmModal";
import { PageRoutesEnum, ReactElementType } from "../../types";
import ModalStore from "../../store/ModalStore";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;
  const [showLogout, setShowLogout] = useState(false);

  const renderCampusToggleButton: ReactElementType = () => {
    return (
      <li className="flex items-center gap-6">
        <p className="text-general text-sm font-medium">In Campus</p>
        <ToggleSwitch />
      </li>
    );
  };

  const renderLogout = () => {
    if (showLogout) {
      return (
        <>
          <FaChevronUp
            className="text-sm cursor-pointer"
            onClick={() => setShowLogout((preVal) => !preVal)}
          />
          <div className="absolute top-12 right-10">
            <button
              className="bg-red-500 text-white text-[12px] hover:bg-red-600 p-2 rounded-md"
              onClick={ModalStore.openConfirmModal}
            >
              Logout
            </button>
          </div>
        </>
      );
    }
    return (
      <FaChevronDown
        className="text-sm cursor-pointer"
        onClick={() => setShowLogout((preVal) => !preVal)}
      />
    );
  };

  const renderUserProfile = () => {
    return (
      <li className="flex items-center gap-2">
        <LuUserCircle className="h-5 w-5" />
        <h1 className="text-general text-sm font-medium">Sai</h1>
        {renderLogout()}
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
      <LogoutConfirmModal />
    </div>
  );
};

export default Navbar;
