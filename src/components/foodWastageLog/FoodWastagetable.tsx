import FoodItemTableRowData from "./FoodItemTableRow";
import FoodWastageItemModel from "../../models/FoodWastageItemModel";
import { observer } from "mobx-react";

interface FoodWastageTableTypes {
  mealData: FoodWastageItemModel[];
}

const FoodWastageTable: React.FC<FoodWastageTableTypes> = ({ mealData }) => {
  const renderTableHeader = () => {
    return (
      <thead>
        <tr className="flex flex-row gap-10">
          <th className="text-[16px] w-[120px] text-blue-700 font-semibold text-left">
            Food Items
          </th>
          <th className="text-[16px] w-[120px] text-blue-700 font-semibold ">
            Food Prepared
          </th>
          <th className="text-[16px] w-[120px] text-blue-700 font-semibold">
            Food Left
          </th>
        </tr>
      </thead>
    );
  };
  return (
    <table>
      {renderTableHeader()}
      <tbody>
        {mealData.map((each) => {
          return <FoodItemTableRowData key={each.id} itemName={each} />;
        })}
      </tbody>
    </table>
  );
};
export default observer(FoodWastageTable);
