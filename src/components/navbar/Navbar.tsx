import React from "react";
import { LuUserCircle } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa";

import globalLogo from "../../assets/global-logo.png";
import ToggleSwitch from "../toggleButton/ToggleButton";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;

  const renderCampusToggleButton = () => {
    return (
      <li className="flex items-center gap-6">
        <p className="text-general text-sm font-medium">In Campus</p>
        <ToggleSwitch />
      </li>
    );
  };

  const renderUserProfile = () => {
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
    </div>
  );
};

export default Navbar;
