const calculateMealCompleteTime = (mealTime: string) => {
  const isValidFormat = /^\d{1,2}:\d{2}$/.test(mealTime);
  if (!isValidFormat) {
    throw new Error("Invalid time format. Please use 'HH:mm'.");
  }
  const [hour, minutes] = mealTime.split(":");
  const mealCompleteTime = new Date();
  mealCompleteTime.setHours(Number(hour.trim()), Number(minutes.trim()), 0);
  return mealCompleteTime;
};
export default calculateMealCompleteTime;
