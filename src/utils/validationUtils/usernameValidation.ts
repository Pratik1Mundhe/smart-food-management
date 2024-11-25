import { TFunction } from "i18next";
import { NAME_MINIMUM_LENGTH } from "../../constants";

interface ValidateUsernameType {
  (value: string, t: TFunction<"translation", undefined>): string | null;
}

const validateUsername: ValidateUsernameType = (value, t) => {
  const tPath = "pages.register";
  if (value.length < NAME_MINIMUM_LENGTH) {
    return t(tPath + ".errors.usernameError.lengthError");
  }
  if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    return t(tPath + ".errors.usernameError.alienLettersError");
  }

  return null;
};

export default validateUsername;
