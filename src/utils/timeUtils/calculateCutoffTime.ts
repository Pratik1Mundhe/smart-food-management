const calculateCutoffTime = (mealTime: string) => {
  const isValidFormat = /^\d{1,2}:\d{2}$/.test(mealTime);
  if (!isValidFormat) {
    throw new Error("Invalid time format. Please use 'HH:mm'.");
  }
  const [hour, minutes] = mealTime.split(":");
  const cutoff = new Date();
  cutoff.setHours(Number(hour.trim()) - 1, Number(minutes.trim()), 0);
  return cutoff;
};
export default calculateCutoffTime;
