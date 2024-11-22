import {
  JOB_ROLE_MINIMUM_LENGTH,
  NAME_MINIMUM_LENGTH,
  PROFILE_INPUT_NAMES,
} from "../../constants";
import emailValidation from "./emailValidation";
import imageValidation from "./imageValidation";

export const profileValidation = (name: string, value: string) => {
  let error: string | null = null;

  switch (name) {
    case PROFILE_INPUT_NAMES.name:
      if (!value.trim()) {
        error = "Name is required.";
      } else if (value.length < NAME_MINIMUM_LENGTH) {
        error = "Name must be at least 3 characters long.";
      }
      break;

    case PROFILE_INPUT_NAMES.profileImage:
      error = imageValidation(value);
      break;

    case PROFILE_INPUT_NAMES.jobRole:
      if (!value.trim()) {
        error = "Job role is required.";
      } else if (value.length < JOB_ROLE_MINIMUM_LENGTH) {
        error = "Job role must be at least 2 characters long.";
      }
      break;

    case PROFILE_INPUT_NAMES.email:
      error = emailValidation(value);
      break;

    case PROFILE_INPUT_NAMES.department:
      if (!value) {
        error = "Department is required.";
      }
      break;

    case PROFILE_INPUT_NAMES.gender:
      if (!value) {
        error = "Gender is required.";
      }
      break;

    default:
      break;
  }
  return error;
};
