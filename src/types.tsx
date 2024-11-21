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
export interface FoodItemsModalPropsType {
  setShowFoodItemsModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentMealTab: MealTypeEnum;
  addFoodItem: (food: FoodItemType) => void;
}

export interface FoodItemsSelectPropsType {
  setSelectedFoodItem: React.Dispatch<
    React.SetStateAction<FoodItemType | null>
  >;
}
interface Action {
  type: "I_ATE" | "I_SKIP" | "EDIT";
  isDisable: boolean;
  isHidden: boolean;
  onClick: () => void;
  isLoading?: boolean;
}

export interface MealCardProps {
  mealType: MealTypeEnum;
  mealItems: MealFoodItemModel[];
  mealTime: string;
  action: Action[];
  fetchScheduleMealStatus: JSX.Element | null;
}
export interface MealPreferenceModalPropsType {
  activeTab: MealPreferenceEnum;
  handleActiveTab: (activeType: MealPreferenceEnum) => void;
  setShowSaveConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
  action: Modals;
}

export interface Modals {
  save: ModalActions;
  skip: ModalActions;
  close: ModalActions;
}

export interface ModalActions {
  isModalOpen: boolean;
  handleAction: () => void;
  handleModal?: () => void;
  handleMealPreference: () => void;
}
