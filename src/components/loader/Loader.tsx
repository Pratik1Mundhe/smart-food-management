interface LoaderPropsType {
  height?: number;
  width?: number;
  color?: string;
  radius?: number;
}

const Loader = ({
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div style={loaderStyle}></div>
    </div>
  );
};

export default Loader;
