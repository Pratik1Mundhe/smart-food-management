import { NAME_MINIMUM_LENGTH } from "../../constants";

const validateUsername = (value: string): string | null => {
  //add cost
  if (value.length < NAME_MINIMUM_LENGTH) {
    return "Username must be at least 3 characters long";
  }
  if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    return "Username can only contain letters, numbers, and underscores";
  }
  return null;
};

export default validateUsername;
