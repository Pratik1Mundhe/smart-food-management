import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ConfirmModal from "../commonComponents/ConfirmModal";
import {
  PageRoutesEnum,
  ReactElementType,
  VoidFunctionType,
} from "../../types";
import ModalStore from "../../store/ModalStore";
import { ACCESS_TOKEN } from "../../constants";
import Loader from "../loader/Loader";

interface LogoutConfirmModalType {
  handleCloseLogoutConfirmModal: VoidFunctionType;
}

const LogoutConfirmModal: React.FC<LogoutConfirmModalType> = ({
  handleCloseLogoutConfirmModal,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function handleLogoutModal() {
    const accessToken = JSON.parse(localStorage.getItem(ACCESS_TOKEN)!);
    async function logout() {
      setLoading(true);
      const response = await fetch(
        "https://cruel-emus-rule.loca.lt/api/meals/logout/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.ok) {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem("admin");
        handleCloseLogoutConfirmModal();
        navigate(PageRoutesEnum.LOGIN_PAGE);
      }
      setLoading(false);
    }
    logout();
  }
  const renderButtons: ReactElementType = () => {
    return (
      <div className="flex items-center self-center gap-6">
        <button
          onClick={handleLogoutModal}
          className="bg-error text-sm text-white px-5 py-2 rounded font-semibold"
        >
          {!loading ? "Logout" : <Loader />}
        </button>
        <button
          onClick={handleCloseLogoutConfirmModal}
          className="rounded text-sm py-2 px-5 text-general font-semibold border-2"
        >
          Cancel
        </button>
      </div>
    );
  };

  return (
    <ConfirmModal>
      <div className="flex flex-col gap-12 py-16 px-14">
        <h1 className="text-black font-medium text-2xl text-center max-w-[400px]">
          Are you sure you want to close?
        </h1>
        {renderButtons()}
      </div>
    </ConfirmModal>
  );
};

export default LogoutConfirmModal;
