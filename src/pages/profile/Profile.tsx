import React from "react";
import { IoIosCloseCircle } from "react-icons/io";

import {
  ProfileErrorsType,
  ProfileFormDataType,
  ProfilePropsType,
  ReactElementType,
  RenderNameInputElementType,
  RenderSelectInputElementType,
} from "../../types";
import {
  DEPARTMENT_OPTIONS,
  GENDER_OPTIONS,
  PROFILE_INPUT_NAMES,
  PROFILE_INPUT_TYPES,
  REGISTER_INPUT_TYPES,
} from "../../constants";
import ProfileInput from "./ProfileInput";
import ProfileSelectInput from "./ProfileSelectInput";
import logo from "../../assets/global-logo.png";
import UploadIcon from "../../icons/UploadIcon";

const Profile: React.FC<ProfilePropsType> = ({
  profileFormData,
  handleInputChange,
  handleSubmit,
  errors,
  handleFileInput,
}) => {
  const renderNameInputElement: RenderNameInputElementType = (
    type,
    inputType
  ) => {
    const inputValue = profileFormData[type as keyof ProfileFormDataType]!;
    const error = errors[type as keyof ProfileErrorsType];
    return (
      <ProfileInput
        type={type}
        inputType={inputType}
        error={error}
        inputValue={inputValue}
        handleInputChange={handleInputChange}
      />
    );
  };
  const renderSelectInputElement: RenderSelectInputElementType = (
    type,
    options
  ) => {
    const inputValue = profileFormData[type as keyof ProfileFormDataType];
    const error = errors[type as keyof ProfileErrorsType];
    return (
      <ProfileSelectInput
        options={options}
        type={type}
        inputValue={inputValue}
        error={error}
        handleInputChange={handleInputChange}
      />
    );
  };
  const renderProfileFormButtons: ReactElementType = () => {
    return (
      <div className="flex items-center mt-10 gap-6 text-sm">
        <button
          type="submit"
          className="rounded font-semibold px-5 py-2 text-white bg-primary "
        >
          UPDATE
        </button>
        <button
          type="button"
          className="rounded font-semibold px-5 py-2 text-white bg-[#00B2CA]"
        >
          CHANGE PASSWORD
        </button>
        <button
          type="button"
          className="rounded border-2 px-5 py-2 text-general bg-transparent"
        >
          LOGOUT
        </button>
      </div>
    );
  };
  const renderProfilePicture: ReactElementType = () => {
    // const image = profileFormData.profileImage;
    return (
      <div className="w-1/4 flex flex-col items-center">
        <div className="h-[300px] flex items-center justify-center">
          <img src={logo} alt="profile" className="object-fit" />
        </div>
        <button
          type="button"
          className="flex items-center gap-2 text-sm text-secondary"
        >
          <UploadIcon />
          <label htmlFor="file" className="cursor-pointer">
            Change photo
          </label>
        </button>
        <input
          onChange={handleFileInput}
          value={profileFormData.profileImage}
          name={PROFILE_INPUT_NAMES.profileImage}
          id="file"
          type={REGISTER_INPUT_TYPES.file}
          className="hidden"
        />
      </div>
    );
  };
  const renderProfileFields: ReactElementType = () => {
    return (
      <div className="flex flex-col flex-grow">
        <div className="flex items-center gap-10 justify-between flex-wrap">
          {renderNameInputElement(
            PROFILE_INPUT_NAMES.name,
            PROFILE_INPUT_TYPES.text
          )}
          {renderNameInputElement(
            PROFILE_INPUT_NAMES.jobRole,
            PROFILE_INPUT_TYPES.text
          )}
          {renderNameInputElement(
            PROFILE_INPUT_NAMES.email,
            PROFILE_INPUT_TYPES.email
          )}
          {renderSelectInputElement(
            PROFILE_INPUT_NAMES.department,
            DEPARTMENT_OPTIONS
          )}
          {renderSelectInputElement(PROFILE_INPUT_NAMES.gender, GENDER_OPTIONS)}
        </div>
        {renderProfileFormButtons()}
      </div>
    );
  };
  const renderProfileFormCloseButton: ReactElementType = () => {
    return (
      <button
        type="button"
        className="text-secondary text-xl absolute top-10 right-10"
      >
        <IoIosCloseCircle />
      </button>
    );
  };
  return (
    <div className="min-h-dvh flex flex-col">
      <form
        onSubmit={handleSubmit}
        className="relative flex items-start gap-4 rounded-md shadow-lg w-full max-w-7xl mx-auto py-16 px-12 mt-10"
      >
        {renderProfilePicture()}
        {renderProfileFields()}
        {renderProfileFormCloseButton()}
      </form>
    </div>
  );
};

export default Profile;
