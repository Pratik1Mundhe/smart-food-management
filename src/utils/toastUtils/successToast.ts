import toast from "react-hot-toast";

export const successToast = (message: string) => {
  toast.success(message, { duration: 2000 });
};
