import React from "react";
import { LuUserCircle } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

import globalLogo from "../../assets/global-logo.png";
import { PageRoutesEnum } from "../../types";
import { observer } from "mobx-react-lite";

const AdminNavbar: React.FC = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;

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
    <div className="flex items-center justify-between px-10 shadow-xl">
      <img
        onClick={() => navigate(PageRoutesEnum.ADMIN_HOME_PAGE)}
        src={globalLogo}
        className="h-[60px] w-[60px] cursor-pointer"
      />

      <ul className="flex justify-between items-center gap-10">
        <li
          onClick={() => navigate(PageRoutesEnum.ADMIN_HOME_PAGE)}
          className={`text-general cursor-pointer text-sm font-medium ${
            path === PageRoutesEnum.ADMIN_HOME_PAGE
              ? "text-primary"
              : "text-general"
          }`}
        >
          Home
        </li>
        {renderUserProfile()}
      </ul>
    </div>
  );
};

export default observer(AdminNavbar);
