import { MINIMUM_PASSWORD_LENGTH } from "../../constants";
import { PasswordStrengthEnum } from "../../types";

interface ValidatePasswordType {
  (value: string): {
    error: string | null;
    warnings: string[];
    strength: PasswordStrengthEnum | null;
  };
}

interface CalculatePasswordStrengthType {
  (
    hasUppercaseLetter: boolean,
    hasDigit: boolean,
    hasSpecialLetter: boolean
  ): PasswordStrengthEnum;
}

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

const validatePassword: ValidatePasswordType = (value) => {
  const warnings: string[] = [];
  let error: string | null = null;
  let strength: PasswordStrengthEnum | null = null;
  if (value.length < MINIMUM_PASSWORD_LENGTH) {
    error = "Password must be at least 8 characters long";
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
