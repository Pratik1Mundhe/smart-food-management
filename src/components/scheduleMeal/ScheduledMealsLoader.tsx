import React from "react";

import { viewContainer } from "./styles";
import Loader from "../loader/Loader";

const ScheduledMealsLoader: React.FC = () => {
  return (
    <div className={viewContainer}>
      <Loader color="#0B69FF" height={40} width={40} radius={4} />
    </div>
  );
};

export default ScheduledMealsLoader;
