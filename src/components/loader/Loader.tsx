import { TailSpin } from "react-loader-spinner";

interface LoaderPropsType {
  height?: number;
  width?: number;
  color?: string;
}

const Loader: React.FC<LoaderPropsType> = ({
  height = 20,
  width = 20,
  color,
}) => {
  return (
    <TailSpin
      visible={true}
      height={height}
      width={width}
      color={color}
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Loader;
