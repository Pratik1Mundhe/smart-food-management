import { observer } from "mobx-react";
import FoodWastageItemModel from "../../models/FoodWastageItemModel";
import FoodQuantityInput from "./FoodQuantityInput";

interface FoodItemTableRowDataType {
  itemName: FoodWastageItemModel;
}

const FoodItemTableRowData: React.FC<FoodItemTableRowDataType> = (props) => {
  const { itemName } = props;
  function handelFoodPrepared(value: number | string) {
    itemName.setItemFoodPrepared(Number(value));
  }
  function handelFoodWasted(value: number | string) {
    if (Number(value) > itemName.foodPrepared) {
      itemName.setItemFoodWasted(itemName.foodPrepared);
    } else {
      itemName.setItemFoodWasted(Number(value));
    }
  }
  return (
    <tr className="flex flex-row gap-20 my-4 mt-4 items-center">
      <td className="text-[14px] text-gray-400 font-semibold w-[140px]">
        {itemName.name}
      </td>
      <td className="w-[130px]">
        <FoodQuantityInput
          quantity={itemName.foodPrepared}
          onChange={handelFoodPrepared}
        />
      </td>
      <td className="w-[130px]">
        <FoodQuantityInput
          quantity={itemName.foodWasted}
          onChange={handelFoodWasted}
        />
      </td>
    </tr>
  );
};
export default observer(FoodItemTableRowData);
