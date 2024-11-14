import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { v4 } from "uuid";

import {
  foodItemType,
  MealFoodDataType,
  MealTypeEnum,
  ReactElementType,
  SuccessTypenamesEnum,
  VoidFunctionType,
} from "../../types";
import MealDate from "../mealDate/MealDate";
import MealTabs from "../mealTabs/MealTabs";
import ScheduleFoodItem from "../scheduleFoodItem/ScheduleFoodItem";
import FoodItemsModal from "../foodItemsModal/FoodItemsModal";
import DeleteConfirmModal from "../confirmModal/DeleteConfirmModal";
import SaveConfirmModal from "../confirmModal/SaveConfirmModal";
import ModalStore from "../../store/ModalStore";
import useScheduleMeal from "../../apis/mutations/scheduleMeal/useMutateScheduleMeal";
import { formatDate } from "../../utils/formatDate";
import { successToast } from "../../utils/toastUtils/successToast";
import { failureToast } from "../../utils/toastUtils/failureToast";
import useFetchScheduledMeal from "../../apis/queries/getScheduledMeal/useFetchScheduledMeal";
import Loader from "../loader/Loader";
import scheduledMealStore from "../../store/ScheduledMealStore";

const ScheduleMeal: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [currentMealTab, setCurrentMealTab] = useState(MealTypeEnum.BREAKFAST);
  const [showFoodItemsModal, setShowFoodItemsModal] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showSaveConfirmModal, setShowSaveConfirmModal] =
    useState<boolean>(false);
  const [deleteFoodItemId, setDeleteFoodItemId] = useState<string | null>(null);
  const [foodData, setFoodData] = useState<MealFoodDataType>({
    breakfast: [],
    lunch: [],
    dinner: [],
  });
  const { mealsLoading } = useFetchScheduledMeal(
    formatDate(currentDate),
    currentMealTab
  );

  useEffect(() => {
    if (!scheduledMealStore.getMealData(currentMealTab)) {
      return;
    }
    const { date, mealType, items } =
      scheduledMealStore.getMealData(currentMealTab)!;
    foodData[currentMealTab] = items;
  }, [mealsLoading]);

  const { loading, error, setSchedule } = useScheduleMeal();

  const addFoodItem = (food: foodItemType): void => {
    const isFoodExist = foodData[currentMealTab].some(
      (item) => item.id === food.id
    );
    if (isFoodExist) {
      return;
    }
    foodData[currentMealTab].push(food);
  };

  const removeFoodItem = (id: string): void => {
    const filteredFoods = foodData[currentMealTab].filter(
      (item) => item.id !== id
    );
    setFoodData({ ...foodData, [currentMealTab]: filteredFoods });
  };

  const handleTabChange = (meal: MealTypeEnum): void => {
    setCurrentMealTab(meal);
  };

  const updateFullMealQuantity = (id: string, quantity: number): void => {
    const updatedFoods = foodData[currentMealTab].map((item) => {
      if (item.id === id) {
        return {
          ...item,
          fullMealQuantity: quantity,
        };
      }
      return item;
    });
    setFoodData({ ...foodData, [currentMealTab]: updatedFoods });
  };

  const updateHalfMealQuantity = (id: string, quantity: number): void => {
    const updatedFoods = foodData[currentMealTab].map((item) => {
      if (item.id === id) {
        return {
          ...item,
          halfMealQuantity: quantity,
        };
      }
      return item;
    });
    setFoodData({ ...foodData, [currentMealTab]: updatedFoods });
  };

  const handleOpenDeleteConfirmModal = (foodId: string): void => {
    setDeleteFoodItemId(foodId);
    setShowConfirmModal(true);
    ModalStore.openConfirmModal();
  };

  const handleCloseDeleteConfirmModal: VoidFunctionType = () => {
    setShowConfirmModal(false);
    setDeleteFoodItemId(null);
    ModalStore.closeConfirmModal();
  };

  const renderScheduleFoodItem: ReactElementType = () => {
    return (
      <>
        <ul className="flex items-center gap-4 mt-4 text-primary font-semibold">
          <li className="w-1/4">Items</li>
          <li className="w-[118px]">Full Meal</li>
          <li className="">Half Meal</li>
        </ul>
        <ul className="mt-6 flex flex-col gap-2">
          {foodData[currentMealTab].map((food) => {
            return (
              <ScheduleFoodItem
                key={v4()}
                food={food}
                updateHalfMealQuantity={updateHalfMealQuantity}
                handleOpenConfirmModal={handleOpenDeleteConfirmModal}
                removeFoodItem={removeFoodItem}
                updateFullMealQuantity={updateFullMealQuantity}
              />
            );
          })}
        </ul>
        <button
          onClick={() => setShowFoodItemsModal(true)}
          className="bg-primary self-start text-sm text-white font-medium py-2 px-5 rounded-lg mt-4"
        >
          ADD ITEM
        </button>
      </>
    );
  };

  const renderMealFoods: ReactElementType = () => {
    if (mealsLoading) {
      return (
        <div className="min-h-[300px] flex items-center justify-center">
          <Loader color="#0B69FF" height={40} width={40} radius={4} />
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex items-center justify-center min-h-[300px]">
          <h1 className="text-xl font-semibold ">Something went wrong !!!</h1>
        </div>
      );
    }
    if (foodData[currentMealTab].length === 0) {
      return (
        <div className="flex flex-col items-center justify-center  min-h-[300px]">
          <h1 className="text-general font-semibold text-xl">
            Currently there are no food item's
          </h1>
          <button
            onClick={() => setShowFoodItemsModal(true)}
            className="bg-primary text-sm text-white font-medium py-2 px-5 rounded-lg mt-4"
          >
            ADD ITEM
          </button>
        </div>
      );
    }
    return renderScheduleFoodItem();
  };

  const renderConfirmModal: ReactElementType = () => {
    if (deleteFoodItemId && showConfirmModal) {
      const getFoodItem = (): foodItemType => {
        return foodData[currentMealTab].find(
          (item) => item.id === deleteFoodItemId
        )!;
      };
      const foodItem = getFoodItem();
      return (
        <DeleteConfirmModal
          removeFoodItem={removeFoodItem}
          handleCloseDeleteConfirmModal={handleCloseDeleteConfirmModal}
          foodItem={foodItem}
        />
      );
    }
    return <></>;
  };

  const handleCloseSaveConfirmModal: VoidFunctionType = () => {
    setShowSaveConfirmModal(false);
    ModalStore.closeConfirmModal();
  };

  const handleSaveMealSchedule: VoidFunctionType = () => {
    const handleMealSaveSuccess: VoidFunctionType = () => {
      successToast("Meal Added");
      handleCloseSaveConfirmModal();
    };
    const itemIds: string[] = [];
    const fullMealQuantities: number[] = [];
    const halfMealQuantities: number[] = [];

    let validation = true;

    foodData[currentMealTab].forEach((meal) => {
      const { id, fullMealQuantity, halfMealQuantity } = meal;
      if (fullMealQuantity === 0 || halfMealQuantity === 0) {
        failureToast("Quantities can't be zero");
        validation = false;
        return;
      }
      itemIds.push(id);
      fullMealQuantities.push(fullMealQuantity);
      halfMealQuantities.push(halfMealQuantity);
    });

    if (validation) {
      setSchedule({
        variables: {
          params: {
            itemIds,
            fullMealQuantities,
            halfMealQuantities,
            date: formatDate(currentDate),
            mealType: currentMealTab.toUpperCase(),
          },
        },
      }).then(({ data }) => {
        const { scheduleMeal } = data;
        if (scheduleMeal.__typename === SuccessTypenamesEnum.SCHEDULE_MEAL) {
          handleMealSaveSuccess();
        } else if (scheduleMeal.__typename === "ScheduleMealFailure") {
          failureToast("Something went wrong !!!");
          handleCloseSaveConfirmModal();
        }
      });
    }
  };

  const renderSaveConfirmModal: ReactElementType = () => {
    if (showSaveConfirmModal) {
      return (
        <SaveConfirmModal
          action={handleSaveMealSchedule}
          closeModal={handleCloseSaveConfirmModal}
        />
      );
    }
    return <></>;
  };

  const handleOpenSaveConfirmModal: VoidFunctionType = () => {
    setShowSaveConfirmModal(true);
    ModalStore.openConfirmModal();
  };

  const renderButtons: ReactElementType = () => {
    const renderButtonLoader = (): JSX.Element | string => {
      if (loading) {
        return <Loader />;
      }
      return "Save";
    };

    return (
      <div className="flex items-center gap-4 self-end">
        <button className="rounded text-sm py-2 px-5 text-general font-semibold border-2">
          Back
        </button>
        <button
          onClick={handleOpenSaveConfirmModal}
          className="bg-success text-sm text-white px-5 py-2 rounded font-semibold"
        >
          {renderButtonLoader()}
        </button>
      </div>
    );
  };

  const renderFoodItemModel: ReactElementType = () => {
    if (showFoodItemsModal) {
      return (
        <FoodItemsModal
          addFoodItem={addFoodItem}
          currentMealTab={currentMealTab}
          setShowFoodItemsModal={setShowFoodItemsModal}
        />
      );
    }
    return <></>;
  };

  return (
    <div className="flex flex-col border-[1px] rounded-md mt-4 py-10 px-20">
      <h1 className="text-3xl pb-2 text-general border-b-2 w-fit border-b-primary mb-10">
        Schedule Meal
      </h1>
      <div className="flex justify-between items-center">
        <MealTabs
          handleTabChange={handleTabChange}
          currentMealTab={currentMealTab}
        />
        <MealDate currentDate={currentDate} setCurrentDate={setCurrentDate} />
      </div>
      {renderMealFoods()}
      {renderButtons()}
      {renderFoodItemModel()}
      {renderConfirmModal()}
      {renderSaveConfirmModal()}
    </div>
  );
};

export default observer(ScheduleMeal);
