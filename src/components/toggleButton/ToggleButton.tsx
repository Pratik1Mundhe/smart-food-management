import React from "react";
import { VoidFunctionType } from "../../types";
import { observer } from "mobx-react-lite";
import useInCampusStatus from "../../apis/mutations/InCampusStatus/useInCampusStatus";
import Loader from "../loader/Loader";
import { USER_TOKEN } from "../../constants";
<<<<<<< HEAD
import UserMealStore from "../../store/UserMealStore";
=======
import { button, container } from "./styles";
>>>>>>> 74054534a5307bbf7cb696797b3cd7bdd5ba485d

const ToggleSwitch: React.FC = observer(() => {
  const { triggerCampusStatus, loading } = useInCampusStatus();
  const handleToggle: VoidFunctionType = () => {
    const userId = JSON.parse(localStorage.getItem(USER_TOKEN)!);
    triggerCampusStatus({
      userId: userId,
      inCampus: !UserMealStore.inCampusStatus,
    });
  };
  if (loading) {
    return <Loader color="blue" />;
  }
  return (
    <div
      onClick={handleToggle}
<<<<<<< HEAD
      className={` w-[44px] p-1 rounded-3xl transition-all cursor-pointer duration-300 ease-in-out ${
        UserMealStore.inCampusStatus ? "bg-blue-600" : "bg-slate-200"
      }`}
    >
      <div
        className={`h-[16px] w-[16px] bg-white shadow-md rounded-full transition-all duration-300 ease-in-out
        ${UserMealStore.inCampusStatus ? "translate-x-5" : ""}`}
=======
      className={`${container} ${
        foodItemsStore.inCampusStatus ? "bg-blue-600" : "bg-slate-200"
      }`}
    >
      <div
        className={`${button}
        ${foodItemsStore.inCampusStatus ? "translate-x-5" : ""}`}
>>>>>>> 74054534a5307bbf7cb696797b3cd7bdd5ba485d
      ></div>
    </div>
  );
});

export default ToggleSwitch;
