import React, { useState } from "react";

import Profile from "../pages/profile/Profile";
import { ProfileErrorsType, ProfileFormDataType } from "../types";
import { profileValidation } from "../utils/validationUtils/profileValidation";

const ProfileController: React.FC = () => {
  const [profileFormData, setProfileFormData] = useState<ProfileFormDataType>({
    name: "",
    profileImage: "",
    jobRole: "",
    email: "",
    department: "",
    gender: "",
  });

  const [errors, setErrors] = useState<ProfileErrorsType>({
    name: null,
    profileImage: null,
    jobRole: null,
    email: null,
    department: null,
    gender: null,
  });

  const validateProfileField = (name: string, value: string): void => {
    const error: string | null = profileValidation(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleFileInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.files && event.target.files.length > 0) {
      const imageFile = event.target.files[0];
      console.log(imageFile);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setProfileFormData({
      ...profileFormData,
      [name]: value,
    });
    validateProfileField(name, value);
  };

  const handleProfileFormValidation = (): boolean => {
    const isFormValid: boolean = Object.keys(profileFormData).every((key) => {
      const fieldName = key as keyof ProfileFormDataType;
      const value = profileFormData[fieldName];
      validateProfileField(fieldName, value);
      return !errors[fieldName];
    });
    return isFormValid;
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (handleProfileFormValidation()) {
      console.log("Profile submitted successfully:", profileFormData);
    } else {
      console.log("Validation failed:", errors);
    }
  };

  return (
    <Profile
      profileFormData={profileFormData}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      errors={errors}
      handleFileInput={handleFileInput}
    />
  );
};

export default ProfileController;
