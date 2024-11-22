import { useState } from "react";
import { FormDataType } from "../../../types";
import { onSuccess } from "./responseHandler";

interface SaveUserRegisterType {
  (
    formData: FormDataType,
    handleRegisterSuccess: () => void,
    handleRegisterFailure: (message: string) => void
  ): {
    loading: boolean;
    error: string | null;
    saveRegister: () => void;
  };
}

export const useSaveUserRegister: SaveUserRegisterType = (
  formData,
  handleRegisterSuccess,
  handleRegisterFailure
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveRegister = async () => {
    setLoading(true);
    try {
      // Simulate a successful registration after 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
        onSuccess(handleRegisterSuccess);
      });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError("An error occurred during registration");
      handleRegisterFailure("Registration failed");
    }
  };

  return { saveRegister, loading, error };
};
