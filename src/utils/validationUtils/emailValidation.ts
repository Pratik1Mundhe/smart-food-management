const emailValidation = (email: string) => {
  if (!email.trim()) {
    return "Email is required.";
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return "Email must be a valid email address.";
  }
  return null;
};

export default emailValidation;
