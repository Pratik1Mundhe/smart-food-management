import { MealTypeEnum } from "../types";

function calculateCustomIndex(type: MealTypeEnum | string) {
  let index = 0;
  if (type.toLocaleLowerCase() === MealTypeEnum.BREAKFAST) {
    index = 0;
  } else if (type.toLocaleLowerCase() === MealTypeEnum.LUNCH) {
    index = 1;
  } else if (type.toLocaleLowerCase() === MealTypeEnum.DINNER) {
    index = 2;
  }
  return index;
}
export default calculateCustomIndex;
