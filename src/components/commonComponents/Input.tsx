import { ERROR_ICON } from "../../constants";
import { errorIcon } from "./styles";

interface InputProp {
  label: string;
  id: string;
  style: string;
  inputType: string;
  value: string;
  isError: boolean;
  onChangeFunction: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProp> = (prop) => {
  const { label, id, style, inputType, value, isError, onChangeFunction } =
    prop;

  if (isError) {
    return (
      <>
        <div className="flex flex-col">
          <label htmlFor={id} className="text-gray-600 text-sm">
            {label}
          </label>
          <div className="flex mt-1">
            <input
              id={id}
              className={style}
              type={inputType}
              value={value}
              onChange={onChangeFunction}
            />
            <div className={errorIcon}>
              <img src={ERROR_ICON} className="h-4 w-4 " />
            </div>
          </div>
          <p className="text-red-500 mt-1 text-sm">
            {inputType === "text" ? "Invalid Username" : "Invalid Password"}
          </p>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor={id} className="text-gray-600 text-sm">
          {label}
        </label>
        <div className="flex mt-1">
          <input
            id={id}
            className={style}
            type={inputType}
            value={value}
            onChange={onChangeFunction}
          />
        </div>
      </div>
    </>
  );
};

export default Input;
