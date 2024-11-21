import { parse, subHours } from "date-fns";

const calculateCutoffTime = (mealTime: string) => {
  const mealDate = parse(mealTime, "HH:mm", new Date());
  const cutoff = subHours(mealDate, 1);
  return cutoff;
};

export default calculateCutoffTime;
