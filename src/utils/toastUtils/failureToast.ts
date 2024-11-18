import toast from "react-hot-toast";

export const failureToast = (message: string): void => {
  toast.error(message, { duration: 2000 });
};
