const calculateMealCompleteTime = (mealTime: string) => {
  const [hour, minutes] = mealTime.split(":");
  const mealCompleteTime = new Date();
  mealCompleteTime.setHours(Number(hour.trim()), Number(minutes.trim()), 0);
  return mealCompleteTime;
};
export default calculateMealCompleteTime;
