import React from "react";
import { LuUserCircle } from "react-icons/lu";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import globalLogo from "../../assets/global-logo.png";
import ToggleSwitch from "../toggleButton/ToggleButton";
import LogoutConfirmModal from "../confirmModal/LogoutConfirmModal";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;
  const [showLogout, setShowLogout] = useState(false);

  const renderCampusToggleButton = () => {
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
            <button className="bg-red-500 text-white text-[12px] hover:bg-red-600 p-2 rounded-md">
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
        onClick={() => navigate("/")}
        src={globalLogo}
        className="h-[60px] w-[60px] cursor-pointer"
      />

      <ul className="flex justify-between items-center gap-4 w-[40%]">
        {renderCampusToggleButton()}
        <li
          onClick={() => navigate("/")}
          className={`text-general text-sm font-medium cursor-pointer ${
            path === "/" ? "text-primary" : "text-general"
          }`}
        >
          Home
        </li>
        <li
          onClick={() => navigate("/weekly-menu")}
          className={`text-general text-sm font-medium cursor-pointer ${
            path === "/weekly-menu" ? "text-primary" : "text-general"
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
