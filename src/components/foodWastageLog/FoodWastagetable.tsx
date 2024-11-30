import FoodItemTableRowData from "./FoodItemTableRow";
import FoodWastageItemModel from "../../models/FoodWastageItemModel";
import { observer } from "mobx-react";
import { tableHeader } from "./Styles";

interface FoodWastageTableTypes {
  mealData: FoodWastageItemModel[];
}

const FoodWastageTable: React.FC<FoodWastageTableTypes> = ({ mealData }) => {
  const renderTableHeader = () => {
    return (
      <thead>
        <tr className="flex flex-row gap-20 mt-8 mb-2">
          <th className={`${tableHeader} text-left`}>Food Items</th>
          <th className={tableHeader}>Food Prepared</th>
          <th className={tableHeader}>Food Left</th>
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
