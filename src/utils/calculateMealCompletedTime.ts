import { parse, subHours } from "date-fns";
const calculateMealCompleteTime = (mealTime: string) => {
  const mealDate = parse(mealTime, "HH:mm", new Date());
  const mealCompleteTime = subHours(mealDate, 0);
  return mealCompleteTime;
};
export default calculateMealCompleteTime;
