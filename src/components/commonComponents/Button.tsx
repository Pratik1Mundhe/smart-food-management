import React from "react";
const outLine =
  "text-sm px-5 py-2 border-2 border-gray-300  rounded hover:bg-gray-100  mt-4";
interface ButtonProps {
  children: React.ReactNode;
  type?: "submit";
  disable?: boolean;
  isEditable?: boolean;
  outline?: boolean;
  filled?: boolean;
  color?: string;
  height?: string;
  width?: string;
  hoverColor?: string;
  onClick?: () => void;
}
const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    type,
    disable,
    onClick,
    outline = false,
    filled = false,
    height = 30,
    color,
    width = 30,
    hoverColor,
  } = props;
  const filledButton = `flex flex-row justify-center items-center  text-sm px-5 py-2 rounded-md text-white mt-4 ${color} ${height} ${width} ${hoverColor}`;
  const disableEditButton = `bg-gray-300 ${height} ${width} rounded-md text-white font-normal cursor-not-allowed mt-4`;
  let style: string;
  switch (true) {
    case disable: {
      style = disableEditButton;
      break;
    }
    case outline: {
      style = outLine;
      break;
    }
    case filled: {
      style = filledButton;
      break;
    }
    default: {
      style = "";
    }
  }
  return (
    <button type={type} className={style} disabled={disable} onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;
