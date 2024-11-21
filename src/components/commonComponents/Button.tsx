import React from "react";
const disableEditButton =
  "bg-gray-300 h-[35px] w-[300px] rounded-sm text-white font-normal cursor-not-allowed mt-4";
const blueButton =
  "text-sm px-5 py-1 bg-blue-600 rounded-sm text-white  hover:bg-blue-700 mt-4";
interface ButtonProps {
  children: React.ReactNode;
  type?: "submit";
  disable?: boolean;
  isEditable?: boolean;
  outline?: boolean;
  skip?: boolean;
  styles?: string;
  onClick?: () => void;
}
const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    type,
    disable,
    onClick,
    isEditable = true,
    outline = false,
    skip = false,
    styles,
  } = props;
  const outLine = `text-sm px-5 py-2 border-2 border-gray-300  rounded hover:bg-gray-100  mt-4 ${styles}`;
  let style: string;
  switch (true) {
    case !isEditable: {
      style = disableEditButton;
      break;
    }
    case outline: {
      style = outLine;
      break;
    }
    case skip: {
      style = blueButton;
      break;
    }
    default: {
      style = `${blueButton} flex flex-row justify-center items-center h-[35px] w-[300px]`;
    }
  }
  return (
    <button type={type} className={style} disabled={disable} onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;
