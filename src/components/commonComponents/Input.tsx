import { ERROR_ICON } from "../../constants";
import { errorIcon } from "./styles";

interface InputProp {
  label: string;
  id: string;
  style: string;
  inputType: string;
  value: string;
  errorMsg: string | null;
  onChange: (value: string) => void;
}

const Input: React.FC<InputProp> = (prop) => {
  const { label, id, style, inputType, value, errorMsg, onChange } = prop;

  if (errorMsg !== null && errorMsg !== "") {
    return (
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
            onChange={(e) => onChange(e.target.value)}
          />
          <div className={errorIcon}>
            <img src={ERROR_ICON} className="h-4 w-4 " />
          </div>
        </div>
        <p className="text-red-500 mt-1 text-sm">{errorMsg}</p>
      </div>
    );
  }
  return (
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
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Input;
