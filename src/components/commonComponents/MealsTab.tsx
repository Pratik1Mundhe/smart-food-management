import {
  mealTypes,
  fullMealTab,
  halfMealTab,
  customMealTab,
  activeMealTab,
  activeMealTabHalf,
  activeMealTabCustom,
} from "./styles";

interface MealTabProp {
  activeTab: string;
  handelActiveTab: (activeType: string) => void;
}
const MealsTab = (prop: MealTabProp) => {
  const { activeTab, handelActiveTab } = prop;
  return (
    <ul className={mealTypes}>
      <li
        className={`px-3 py-2 transition-all duration-500 border-gray-300 ${
          activeTab === "full" ? activeMealTab : fullMealTab
        }`}
        onClick={() => handelActiveTab("full")}
      >
        Full Meal
      </li>
      <li
        className={activeTab === "half" ? activeMealTabHalf : halfMealTab}
        onClick={() => handelActiveTab("half")}
      >
        Half Meal
      </li>
      <li
        className={activeTab === "custom" ? activeMealTabCustom : customMealTab}
        onClick={() => handelActiveTab("custom")}
      >
        Custom
      </li>
    </ul>
  );
};

export default MealsTab;
