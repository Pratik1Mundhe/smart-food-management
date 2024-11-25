import { TFunction } from "i18next";

interface ImageValidationType {
  (image: string, t: TFunction<"translation", undefined>): string | null;
}

const imageValidation: ImageValidationType = (image, t) => {
  const tPath = "pages.profile.errors.imageError";
  if (!image.trim()) {
    return t(tPath + ".emptyError");
  } else if (!/^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/.test(image)) {
    return t(tPath + ".invalidUrlError");
  }
  return null;
};

export default imageValidation;
