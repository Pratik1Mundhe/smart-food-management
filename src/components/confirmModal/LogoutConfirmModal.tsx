import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavigateFunction, useNavigate } from "react-router-dom";

import ConfirmModal from "../commonComponents/ConfirmModal";
import {
  PageRoutesEnum,
  ReactElementType,
  VoidFunctionType,
} from "../../types";
import { ACCESS_TOKEN_KEY, ADMIN_TOKEN, LOGOUT_URL } from "../../constants";
import Loader from "../loader/Loader";
import { removeItemLocalStorage } from "../../utils/localStorageUtils/removeItem";

interface LogoutConfirmModalType {
  handleCloseLogoutConfirmModal: VoidFunctionType;
}

const LogoutConfirmModal: React.FC<LogoutConfirmModalType> = ({
  handleCloseLogoutConfirmModal,
}) => {
  const navigate: NavigateFunction = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const tPath = "components.confirmModal.logout";

  function handleLogoutModal(): void {
    const accessToken = JSON.parse(localStorage.getItem(ACCESS_TOKEN_KEY)!);
    async function logout() {
      setLoading(true);
      const response = await fetch(LOGOUT_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        removeItemLocalStorage(ACCESS_TOKEN_KEY);
        removeItemLocalStorage(ADMIN_TOKEN);
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
          {loading ? <Loader /> : t(tPath + ".buttons.logout")}
        </button>
        <button
          onClick={handleCloseLogoutConfirmModal}
          className="rounded text-sm py-2 px-5 text-general font-semibold border-2"
        >
          {t(tPath + ".buttons.cancel")}
        </button>
      </div>
    );
  };

  return (
    <ConfirmModal>
      <div className="flex flex-col gap-12 py-16 px-14">
        <h1 className="text-black font-medium text-2xl text-center max-w-[400px]">
          {t(tPath + ".title")}
        </h1>
        {renderButtons()}
      </div>
    </ConfirmModal>
  );
};

export default LogoutConfirmModal;
