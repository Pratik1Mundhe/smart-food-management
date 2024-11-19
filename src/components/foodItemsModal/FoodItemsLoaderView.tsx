import React from "react";

import Loader from "../loader/Loader";

const FoodItemsLoaderView: React.FC = () => {
  return (
    <div className="mt-6">
      <Loader color="#0B69FF" width={30} height={30} />
    </div>
  );
};

export default FoodItemsLoaderView;
