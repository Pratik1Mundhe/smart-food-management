const calculateCutoffTime = (mealTime: string) => {
  const [hour, minutes] = mealTime.split(":");
  const cutoff = new Date();
  cutoff.setHours(Number(hour.trim()) - 1, Number(minutes.trim()), 0);
  return cutoff;
};
export default calculateCutoffTime;
