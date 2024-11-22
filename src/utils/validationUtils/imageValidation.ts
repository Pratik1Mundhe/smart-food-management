const imageValidation = (image: string) => {
  if (!image.trim()) {
    return "Profile image URL is required.";
  } else if (!/^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/.test(image)) {
    return "Profile image must be a valid URL ending with jpg, jpeg, png, gif, or webp.";
  }
  return null;
};

export default imageValidation;
