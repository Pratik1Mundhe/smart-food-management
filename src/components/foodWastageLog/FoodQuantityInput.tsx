import { observer } from "mobx-react";
import Input from "../commonComponents/Input";

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
        style="h-[32px] text-center w-[52px] ml-10 p-2 border-2 border-grey-400 outline-none appearance-none"
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
