import { ApolloError } from "@apollo/client";
import MealFoodItemModel from "./models/MealFoodItemModel";
import ScheduledMealModel from "./models/ScheduledMealModel";
import UserPreferredMealModel from "./models/UserPreferredMealModel";
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

export enum PageRoutesEnum {
  HOME_PAGE = "/",
  ADMIN_HOME_PAGE = "/admin",
  LOGIN_PAGE = "/login",
  WEEKLY_MENU_PAGE = "/weekly-menu",
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
