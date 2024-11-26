import { useState } from "react";
import { ACCESS_TOKEN, ADMIN_TOKEN, LOGOUT_URL } from "../constants";
import { removeItemLocalStorage } from "../utils/localStorageUtils/removeItem";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { PageRoutesEnum } from "../types";
import LogoutConfirmModal from "../components/confirmModal/LogoutConfirmModal";
import CustomMealStore from "../store/CustomMealStore";
import { observer } from "mobx-react";

interface LogoutControllerType {
  handleCloseLogoutConfirmModal: () => void;
}

const LogoutController: React.FC<LogoutControllerType> = (props) => {
  const { handleCloseLogoutConfirmModal } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();

  function handleLogoutModal(): void {
    const accessToken = JSON.parse(localStorage.getItem(ACCESS_TOKEN)!);
    async function logout() {
      setLoading(true);
      const response = await fetch(LOGOUT_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        removeItemLocalStorage(ACCESS_TOKEN);
        removeItemLocalStorage(ADMIN_TOKEN);
        handleCloseLogoutConfirmModal();
        navigate(PageRoutesEnum.LOGIN_PAGE);
        CustomMealStore.clearStore();
      }
      setLoading(false);
    }
    logout();
  }
  return (
    <LogoutConfirmModal
      handleLogoutModal={handleLogoutModal}
      handleCloseLogoutConfirmModal={handleCloseLogoutConfirmModal}
      logoutLoading={loading}
    />
  );
};

export default observer(LogoutController);
