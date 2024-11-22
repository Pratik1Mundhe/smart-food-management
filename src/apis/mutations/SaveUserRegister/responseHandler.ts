interface RegisterSuccessType {
  (handleRegisterSuccess: () => void): void;
}

export const onSuccess: RegisterSuccessType = (handleRegisterSuccess) => {
  handleRegisterSuccess();
};
export const onFailure = () => {};
