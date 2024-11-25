import { MINIMUM_PASSWORD_LENGTH } from "../../constants";
import {
  CalculatePasswordStrengthType,
  PasswordStrengthEnum,
  ValidatePasswordType,
} from "../../types";

const calculatePasswordStrength: CalculatePasswordStrengthType = (
  hasUppercaseLetter,
  hasDigit,
  hasSpecialLetter
) => {
  const conditionsMet = [hasUppercaseLetter, hasDigit, hasSpecialLetter].filter(
    Boolean
  ).length;

  if (conditionsMet === 3) {
    return PasswordStrengthEnum.STRONG;
  } else if (conditionsMet === 2) {
    return PasswordStrengthEnum.MEDIUM;
  } else {
    return PasswordStrengthEnum.WEAK;
  }
};

const validatePassword: ValidatePasswordType = (value, t) => {
  const tPath = "pages.register";
  const warnings: string[] = [];
  let error: string | null = null;
  let strength: PasswordStrengthEnum | null = null;
  if (value.length < MINIMUM_PASSWORD_LENGTH) {
    error = t(tPath + ".errors.passwordError");
  } else {
    const hasUppercaseLetter = /[A-Z]/.test(value);
    const hasDigit = /\d/.test(value);
    const hasSpecialLetter = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    strength = calculatePasswordStrength(
      hasUppercaseLetter,
      hasDigit,
      hasSpecialLetter
    );

    if (!hasUppercaseLetter)
      warnings.push("Password should contain at least one uppercase letter");
    if (!hasDigit) warnings.push("Password should contain at least one number");
    if (!hasSpecialLetter)
      warnings.push("Password should contain at least one special character");
  }
  return { error, warnings, strength };
};

export default validatePassword;
