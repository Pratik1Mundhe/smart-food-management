import React from "react";
import { useState } from "react";
import { LuUserCircle } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

import globalLogo from "../../assets/global-logo.png";
import { PageRoutesEnum } from "../../types";
import { observer } from "mobx-react-lite";
import ModalStore from "../../store/ModalStore";
import LogoutConfirmModal from "../confirmModal/LogoutConfirmModal";

const AdminNavbar: React.FC = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const path = window.location.pathname;

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
      <LogoutConfirmModal />
    </div>
  );
};

export default observer(AdminNavbar);
