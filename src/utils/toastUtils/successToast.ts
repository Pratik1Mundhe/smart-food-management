import toast from "react-hot-toast";

export const successToast = (message: string): void => {
  toast.success(message, { duration: 2000 });
};
