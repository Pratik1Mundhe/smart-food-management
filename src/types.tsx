import {
  ApolloError,
  ApolloQueryResult,
  OperationVariables,
} from "@apollo/client";
import { TFunction } from "i18next";

import UserPreferredMealModel from "./models/UserPreferredMealModel";
import MealFoodItemModel from "./models/MealFoodItemModel";
import ScheduledMealModel from "./models/ScheduledMealModel";

export enum FoodItemCategoryEnum {
  RICE = "rice",
  PAN_CAKE = "pancake",
  BEVERAGES = "beverages",
}

export enum BaseSizeUnitEnum {
  KG = "kg",
  PISCES = "pisces",
  LITTERS = "litters",
}

export enum ServingSizeUnitEnum {
  PISCES = "pisces",
  LADDLE = "laddle",
  GLASS = "glass",
}

export enum MealTypeEnum {
  BREAKFAST = "breakfast",
  LUNCH = "lunch",
  DINNER = "dinner",
}

export enum MealPreferenceEnum {
  FULL = "full",
  HALF = "half",
  CUSTOM = "custom",
  SKIP = "skip",
}

export enum MealStatusEnum {
  NULL = "null",
  ATE = "ate",
  SKIP = "skipped",
}

export enum PasswordStrengthEnum {
  STRONG = "strong",
  WEAK = "weak",
  MEDIUM = "medium",
}

export enum PageRoutesEnum {
  HOME_PAGE = "/",
  ADMIN_HOME_PAGE = "/admin",
  LOGIN_PAGE = "/login",
  WEEKLY_MENU_PAGE = "/weekly-menu",
  REGISTER_PAGE = "/register",
  PROFILE_PAGE = "/profile",
  FOOD_ITEM = "/food-item",
}

export enum ProfileDepartmentsEnum {
  INTERNAL = "internal",
  HR = "hr",
  TECHNICAL = "technical",
  NON_TECHNICAL = "nonTechnical",
}

export enum GenderEnum {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export interface MealDetailsType {
  mealType: MealTypeEnum;
  mealId: string;
  mealPreference: MealPreferenceEnum;
  mealStatus: MealStatusEnum;
  foodItem: MealFoodItemModel[];
}

export interface MealFoodItemType {
  id: string;
  name: string;
  fullMealQuantity: number;
  halfMealQuantity: number;
}
export interface FoodItemResponseType {
  id: number;
  name: string;
  // __typename: string
}

export interface FoodItemType {
  id: string;
  name: string;
  fullMealQuantity: number;
  halfMealQuantity: number;
}

export interface MealFoodDataType {
  breakfast: MealFoodItemModel[];
  lunch: MealFoodItemModel[];
  dinner: MealFoodItemModel[];
}

export interface VoidFunctionType {
  (): void;
}

export interface ReactElementType {
  (): React.ReactElement;
}

export interface FoodItemsResponseType {
  id: string;
  name: string;
  category: FoodItemCategoryEnum;
  baseSizeUnit: BaseSizeUnitEnum;
  servingSizeUnit: ServingSizeUnitEnum;
  __typename: string;
}

export interface MealFoodItemResponseType {
  id: string;
  name: string;
  fullMealQuantity: number;
  halfMealQuantity: number;
  // __typename: string;
}

export interface ScheduledMealResponseType {
  mealType: string;
  items: MealFoodItemResponseType[];
  mealId: string;
  date: string;
}

export interface MealScheduledDataType {
  breakfast: ScheduledMealModel | null;
  lunch: ScheduledMealModel | null;
  dinner: ScheduledMealModel | null;
}

export interface UserMealItemModelType {
  id: string;
  name: string;
  quantity: number;
}

export interface UserPreferredMealPlanType {
  breakfast: null | UserPreferredMealModel;
  lunch: null | UserPreferredMealModel;
  dinner: null | UserPreferredMealModel;
}
export interface UserPreferenceDataType {
  id: string;
  name: string;
  customMealQuantity: number;
}

export interface FoodItemsSelectPropsType {
  setSelectedFoodItem: React.Dispatch<
    React.SetStateAction<MealFoodItemModel | null>
  >;
}

export interface MealCardProps {
  type: MealTypeEnum;
  mealTime: string;
  currentDate: Date;
}

export interface QuantityCounterPropsType {
  setQuantity: (quantity: number) => void;
  quantity: number;
}

export interface ScheduleFoodItemPropsType {
  food: MealFoodItemModel;
  removeFoodItem: (id: string) => void;
  handleOpenConfirmModal: (id: string) => void;
}

export interface ModalPropsTypes {
  close: () => void;
  children: React.ReactElement;
}

export interface ConfirmModalPropsTypes {
  close: () => void;
  action: VoidFunctionType;
}
export interface MealTabsPropsType {
  currentMealTab: string;
  handleTabChange: (meal: MealTypeEnum) => void;
}

export interface LoaderPropsType {
  height?: number;
  width?: number;
  color?: string;
  radius?: number;
}

export interface ScheduleMealModalType {
  showFoodItemsModal: boolean;
  showDeleteConfirmModal: boolean;
  showSaveConfirmModal: boolean;
}

export interface ScheduleMealPropsType {
  foodData: MealFoodDataType;
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  currentMealTab: MealTypeEnum;
  addFoodItem: (food: MealFoodItemModel) => void;
  removeFoodItem: (id: string) => void;
  showModals: ScheduleMealModalType;
  mealsLoading: boolean;
  fetchMealsError: ApolloError | undefined;
  scheduleMealLoading: boolean;
  scheduleMealError: ApolloError | undefined;
  handleRefetchScheduledMeal: VoidFunctionType;
  handleSaveMealSchedule: VoidFunctionType;
  deleteFoodItemId: string | null;
  handleOpenSaveConfirmModal: VoidFunctionType;
  handleShowFoodItemsModal: (value: boolean) => void;
  handleCloseDeleteConfirmModal: VoidFunctionType;
  handleCloseSaveConfirmModal: VoidFunctionType;
  handleOpenDeleteConfirmModal: (foodId: string) => void;
  handleTabChange: (meal: MealTypeEnum) => void;
}

export interface FoodItemsModalPropsType {
  handleRefetchFoodItems: VoidFunctionType;
  handleCloseModal: VoidFunctionType;
  handleAddFoodItem: VoidFunctionType;
  setSelectedFoodItem: React.Dispatch<
    React.SetStateAction<MealFoodItemModel | null>
  >;
  refetchloading: boolean;
  loading: boolean;
  error: ApolloError | undefined;
  currentMealTab: MealTypeEnum;
}

export interface UseFetchScheduledMealType {
  (date: string, mealType: MealTypeEnum): {
    mealsLoading: boolean;
    error: ApolloError | undefined;
    refetch: (
      variables?: Partial<OperationVariables> | undefined
    ) => Promise<ApolloQueryResult<any>>;
  };
}

export interface FormErrors {
  username: string | null;
  password: string | null;
  confirmPassword: string | null;
  passwordWarnings: string[];
}
export interface FormDataType {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterPropsType {
  formData: FormDataType;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  errors: FormErrors;
  registerLoading: boolean;
  passwordStrength: PasswordStrengthEnum | null;
  handleToggleShowPassword: VoidFunctionType;
  showPassword: boolean;
}

export interface ProfilePropsType {
  profileFormData: ProfileFormDataType;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmitProfileFormData: VoidFunctionType;
  errors: ProfileErrorsType;
  handleFileInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCloseSaveConfirmModal: VoidFunctionType;
  showSaveConfirmModal: boolean;
  handleSubmitProfileForm: (e: React.FormEvent) => void;
  handlePasswordInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOpenChangePasswordModal: VoidFunctionType;
  handleCloseChangePasswordModal: VoidFunctionType;
  handleSubmitUpdatedPassword: (e: React.FormEvent) => void;
  passwordStrength: PasswordStrengthEnum | null;
  showChangePasswordModal: boolean;
  passwordErrors: ProfilePasswordErrorType;
  passwordFormData: ProfilePasswordFormDataType;
}

export interface RenderNameInputElementType {
  (type: string, inputType: string): React.ReactElement;
}

export interface RenderSelectInputElementType {
  (
    type: string,
    options: ProfileDepartmentsEnum[] | GenderEnum[]
  ): React.ReactElement;
}

export interface ProfileFormDataType {
  name: string;
  profileImage: string;
  jobRole: string;
  email: string;
  department: ProfileDepartmentsEnum | string;
  gender: GenderEnum | string;
}

export interface ProfileErrorsType {
  name: string | null;
  profileImage: string | null;
  jobRole: string | null;
  email: string | null;
  department: string | null;
  gender: string | null;
}

export interface InputPropsType {
  type: string;
  inputType: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | string[] | null;
  inputValue: string;
  tPath: string;
}

export interface RegisterPasswordInputPropsType {
  type: string;
  inputType: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | string[] | null;
  inputValue: string;
  showPassword: boolean;
  handleToggleShowPassword: VoidFunctionType;
}

export interface ProfileInputPropsType {
  type: string;
  inputType: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
  inputValue: string;
}

export interface ProfileSelectInputPropsType {
  type: string;
  options: ProfileDepartmentsEnum[] | GenderEnum[];
  inputValue: string;
  error: string | null;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export interface CreateFoodItemSelectInputPropsType {
  type: string;
  options: FoodItemCategoryEnum[] | BaseSizeUnitEnum[] | ServingSizeUnitEnum[];
  inputValue: string;
  error: string | null;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export interface PasswordStrengthBarPropsType {
  passwordStrength: PasswordStrengthEnum | null;
}

export interface ValidatePasswordType {
  (value: string, t: TFunction<"translation", undefined>): {
    error: string | null;
    warnings: string[];
    strength: PasswordStrengthEnum | null;
  };
}

export interface CalculatePasswordStrengthType {
  (
    hasUppercaseLetter: boolean,
    hasDigit: boolean,
    hasSpecialLetter: boolean
  ): PasswordStrengthEnum;
}

export interface ProfilePasswordFormDataType {
  password: string;
  confirmPassword: string;
}

export interface ProfilePasswordErrorType {
  passwordError: string | null;
  confirmPasswordError: string | null;
}

export interface ProfileChangePasswordModalPropsType {
  handlePasswordInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordStrength: PasswordStrengthEnum | null;
  passwordErrors: ProfilePasswordErrorType;
  passwordFormData: ProfilePasswordFormDataType;
  handleCloseChangePasswordModal: VoidFunctionType;
  handleSubmitUpdatedPassword: (e: React.FormEvent) => void;
}

export interface RenderInputElementType {
  (type: string, inputType: string): React.ReactElement;
}

export interface FoodItemDataType {
  name: string;
  category: FoodItemCategoryEnum | string;
  baseSize: BaseSizeUnitEnum | string;
  servingSize: ServingSizeUnitEnum | string;
}

export interface FoodItemDataErrorsType {
  name: null | string;
  category: null | string;
  baseSize: null | string;
  servingSize: null | string;
}

export interface CreateFoodItemPropsType {
  foodItemData: FoodItemDataType;
  errors: FoodItemDataErrorsType;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmitFoodItem: (e: React.FormEvent) => void;
}
