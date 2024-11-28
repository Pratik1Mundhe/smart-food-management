import { HeadCountMealDataType, MealPreferenceEnum } from "../../types";

export const filterMealPreferences = (mealData: HeadCountMealDataType[]) => {
  const mealPreference = {
    full: 0,
    half: 0,
    custom: 0,
    skip: 0,
  };
  mealData.forEach((meal) => {
    const { preference } = meal;
    switch (preference) {
      case MealPreferenceEnum.HALF:
        mealPreference.half += 1;
        break;
      case MealPreferenceEnum.FULL:
        mealPreference.full += 1;
        break;
      case MealPreferenceEnum.CUSTOM:
        mealPreference.custom += 1;
        break;
      case MealPreferenceEnum.SKIP:
        mealPreference.skip += 1;
        break;
      default:
        break;
    }
  });
  return mealPreference;
};
