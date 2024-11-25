import { TFunction } from "i18next";

import {
  JOB_ROLE_MINIMUM_LENGTH,
  NAME_MINIMUM_LENGTH,
  PROFILE_INPUT_NAMES,
} from "../../constants";
import emailValidation from "./emailValidation";
import imageValidation from "./imageValidation";

interface ProfileValidationType {
  (name: string, value: string, t: TFunction<"translation", undefined>):
    | string
    | null;
}

export const profileValidation: ProfileValidationType = (name, value, t) => {
  let error: string | null = null;
  const tPath = "pages.profile.errors";
  switch (name) {
    case PROFILE_INPUT_NAMES.name:
      if (!value.trim()) {
        error = t(tPath + ".nameError.emptyError");
      } else if (value.length < NAME_MINIMUM_LENGTH) {
        error = t(tPath + ".nameError.lengthError");
      }
      break;

    case PROFILE_INPUT_NAMES.profileImage:
      error = imageValidation(value, t);
      break;

    case PROFILE_INPUT_NAMES.jobRole:
      if (!value.trim()) {
        error = t(tPath + ".jobRoleError.emptyError");
      } else if (value.length < JOB_ROLE_MINIMUM_LENGTH) {
        error = t(tPath + ".jobRoleError.lengthError");
      }
      break;

    case PROFILE_INPUT_NAMES.email:
      error = emailValidation(value, t);
      break;

    case PROFILE_INPUT_NAMES.department:
      if (!value) {
        error = t(tPath + ".departmentError.emptyError");
      }
      break;

    case PROFILE_INPUT_NAMES.gender:
      if (!value) {
        error = t(tPath + ".genderError.emptyError");
      }
      break;

    default:
      break;
  }
  return error;
};
