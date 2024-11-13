import { TailSpin } from "react-loader-spinner";

interface LoaderPropsType {
  height: number;
  width: number;
}

const Loader: React.FC<LoaderPropsType> = ({ height = 20, width = 20 }) => {
  return (
    <TailSpin
      visible={true}
      height={height}
      width={width}
      color="#4fa94d"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Loader;
