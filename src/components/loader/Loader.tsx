import React from "react";
import { loaderContainer } from "./styles";

interface LoaderPropsType {
  height?: number;
  width?: number;
  color?: string;
  radius?: number;
}

const Loader: React.FC<LoaderPropsType> = ({
  height = 20,
  width = 20,
  color = "white",
  radius = 3,
}: LoaderPropsType) => {
  const loaderStyle = {
    display: "inline-block",
    width: `${width}px`,
    height: `${height}px`,
    border: `${radius}px solid ${color}`,
    borderRadius: "50%",
    borderTopColor: "transparent",
    animation: "spin 1s linear infinite",
  };

  return (
    <div className={loaderContainer}>
      <div style={loaderStyle}></div>
    </div>
  );
};

export default Loader;
