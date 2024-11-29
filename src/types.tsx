import {
  ApolloError,
  ApolloQueryResult,
  OperationVariables,
} from "@apollo/client";
import { TFunction } from "i18next";

import UserPreferredMealModel from "./models/UserPreferredMealModel";
import MealFoodItemModel from "./models/MealFoodItemModel";
import ScheduledMealModel from "./models/ScheduledMealModel";
import FoodItemModel from "./models/FoodItemModel";

export enum FoodItemActionEnum {
  CREATE = "create",
  UPDATE = "update",
}

export enum FoodItemCategoryEnum {
  RICE = "rice",
  PANCAKE = "pancake",
  BEVERAGES = "beverages",
  EMPTY = "",
}

export enum BaseSizeUnitEnum {
  KG = "kg",
  PISCES = "pisces",
  GLASS = "glass",
  EMPTY = "",
}

export enum ServingSizeUnitEnum {
  PISCES = "pisces",
  LADDLE = "laddle",
  GLASS = "glass",
  EMPTY = "",
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
  FOOD_ITEMS = "/food-items",
  CREATE_FOOD_ITEM = "/create-food-item",
  ADMIN_PROFILE = "/admin/profile",
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

export enum AdminHomeTabs {
  SCHEDULE_MEAL = "scheduleMeal",
  HEAD_COUNT = "headCount",
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
  id: string;
  name: string;
  category: FoodItemCategoryEnum;
  baseSizeUnit: BaseSizeUnitEnum;
  servingSizeUnit: ServingSizeUnitEnum;
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

export interface FoodItemType {
  id: string;
  name: string;
  category: FoodItemCategoryEnum;
  baseSizeUnit: BaseSizeUnitEnum;
  servingSizeUnit: ServingSizeUnitEnum;
  // __typename: string;
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
  userPreference: MealPreferenceEnum;
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
  currentMealTab: MealTypeEnum;
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
  passwordStrength: PasswordStrengthEnum | null;
  passwordFormData: ProfilePasswordFormDataType;
  passwordErrors: ProfilePasswordErrorType;
  errors: ProfileErrorsType;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleFileInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitUpdatedPassword: (e: React.FormEvent) => void;
  handleSubmitProfile: VoidFunctionType;
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
  styles?: string;
  placeholder: string;
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
  category: FoodItemCategoryEnum;
  baseSize: BaseSizeUnitEnum;
  servingSize: ServingSizeUnitEnum;
}

export interface FoodItemDataErrorsType {
  name: null | string;
  category: null | string;
  baseSize: null | string;
  servingSize: null | string;
}

export interface CreateFoodItemPropsType {
  actionType: "create" | "update";
  foodItemData: FoodItemDataType;
  errors: FoodItemDataErrorsType;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmitFoodItem: (e: React.FormEvent) => void;
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FoodItemsPropsType {
  foodItems: FoodItemModel[];
  setShowCreateFoodItemModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteFoodItem: VoidFunctionType;
  setShowUpdateFoodItemModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteFoodItemId: React.Dispatch<React.SetStateAction<string | null>>;
  setUpdateFoodItemData: React.Dispatch<
    React.SetStateAction<FoodItemModel | null>
  >;
}

export interface CreateFoodItemControllerPropsType {
  foodItemAction: (foodItem: FoodItemType) => void;
  actionType: FoodItemActionEnum;
  initialFoodItemData: FoodItemType | null;
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ValidateUpdatedFoodItemFieldType {
  (
    name: string,
    value:
      | string
      | FoodItemCategoryEnum
      | BaseSizeUnitEnum
      | ServingSizeUnitEnum
  ): void;
}

export interface CreateFoodItemSelectFieldType {
  (
    type: string,
    inputValue: string,
    error: string | null,
    options: ServingSizeUnitEnum[] | BaseSizeUnitEnum[] | FoodItemCategoryEnum[]
  ): React.ReactElement;
}

export interface HeadCountPropsType {
  mealData: HeadCountMealDataType[];
  currentMealTab: MealTypeEnum;
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  handleTabChange: (mealType: MealTypeEnum) => void;
  completedMealHeadCountData: number;
}

export interface HeadCountMealDataType {
  mealType: MealTypeEnum;
  name: string;
  category: FoodItemCategoryEnum;
  quantity: { value: number; unit: BaseSizeUnitEnum };
  preference: MealPreferenceEnum;
  userId?: string;
  mealDate?: string;
}

export interface HeadCountDayMealsDataType {
  breakfast: HeadCountMealDataType[];
  lunch: HeadCountMealDataType[];
  dinner: HeadCountMealDataType[];
}

export interface SelectInputPropsType {
  type: string;
  options:
    | FoodItemCategoryEnum[]
    | BaseSizeUnitEnum[]
    | ServingSizeUnitEnum[]
    | ProfileDepartmentsEnum[]
    | GenderEnum[];
  inputValue: string;
  error: string | null;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  tPath: string;
}

export interface FoodItemsModalControllerPropsType {
  handleShowFoodItemsModal: (value: boolean) => void;
  currentMealTab: MealTypeEnum;
  addFoodItem: (food: MealFoodItemModel) => void;
}

export interface MealDatePropsType {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}
