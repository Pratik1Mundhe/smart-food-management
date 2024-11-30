import { observer } from "mobx-react";
import Input from "../commonComponents/Input";
import { inputStyle } from "./Styles";

interface FoodQuantityInputType {
  quantity: number;
  onChange: (newQuantity: number | string) => void;
}

const FoodQuantityInput: React.FC<FoodQuantityInputType> = ({
  quantity,
  onChange,
}) => {
  return (
    <div className="flex flex-row items-end gap-2">
      <Input
        style={inputStyle}
        inputType="number"
        errorMsg=""
        value={quantity}
        onChange={onChange}
      />
      <span className="text-sm text-gray-300">kgs</span>
    </div>
  );
};
export default observer(FoodQuantityInput);
