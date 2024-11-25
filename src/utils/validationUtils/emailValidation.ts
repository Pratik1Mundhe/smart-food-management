import { TFunction } from "i18next";

interface EmailValidationType {
  (email: string, t: TFunction<"translation", undefined>): string | null;
}

const emailValidation: EmailValidationType = (email, t) => {
  const tPath = "pages.profile.errors.emailError";
  if (!email.trim()) {
    return t(tPath + ".emptyError");
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return t(tPath + ".invalidEmailError");
  }
  return null;
};

export default emailValidation;
