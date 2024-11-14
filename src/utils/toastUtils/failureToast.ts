import toast from "react-hot-toast";

export const failureToast = (message: string) => {
  toast.error(message, { duration: 2000 });
};
