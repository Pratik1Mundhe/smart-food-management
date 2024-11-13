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
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor={id} className="text-gray-300 text-[14px]">
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
          {isError ? (
            <div className={errorIcon}>
              <img src={ERROR_ICON} className="h-[16px] w-[16px] " />
            </div>
          ) : (
            ""
          )}
        </div>
        {isError ? (
          <p className="text-red-500 mt-1 text-[12px]">
            {inputType === "text" ? "Invalid Username" : "Invalid Password"}
          </p>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Input;
