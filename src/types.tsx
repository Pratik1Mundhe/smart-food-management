import FoodWastageItemModel from "./models/FoodWastageItemModel";
import FoodWastageModel from "./models/FoodWastageModel";
import MealFoodItemModel from "./models/MealFoodItemModel";
import RatingModel from "./models/ratingModel";
import ReviewModel from "./models/ReviewModel";
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

export enum MealTypes {
  ALL = "all",
  BREAKFAST = "breakfast",
  LUNCH = "lunch",
  DINNER = "dinner",
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
  addFoodItem: (food: MealFoodItemModel) => void;
}

export interface FoodItemsSelectPropsType {
  setSelectedFoodItem: React.Dispatch<React.SetStateAction<any | null>>;
}

export interface PreferenceTypeAction {
  edit: Action;
  ate: Action;
  skip: Action;
}

export interface Action {
  type: "I_ATE" | "I_SKIP" | "EDIT";
  isDisable: boolean;
  isMealTimeCompleted: boolean;
  onClick: () => void;
}

export interface MealCardProps {
  mealType: MealTypeEnum;
  mealItems: MealFoodItemModel[];
  mealTime: string;
  actions: PreferenceTypeAction;
  userPreference: MealPreferenceEnum | null;
  fetchScheduleMealStatus: (
    renderSuccessView: () => JSX.Element
  ) => JSX.Element;
}
export interface MealPreferenceModalPropsType {
  mealType: MealTypeEnum;
  activeTab: MealPreferenceEnum;
  handleActiveTab: (activeType: MealPreferenceEnum) => void;
  setShowSaveConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
  mealItems: MealFoodItemModel[];
  actions: Modals;
  handleTriggerUserPreference: () => void;
  saveMealPreferenceLoading: boolean;
  handelSkipStatus: () => void;
  saveStatusLoading: boolean;
  isOpen: boolean;
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
export interface FoodWastageItemModelTypes {
  id: string | null;
  name: string | null;
  foodPrepared: number;
  foodWasted: number;
}

export interface ReviewTypes {
  breakfast: FoodWastageModel | null;
  lunch: FoodWastageModel | null;
  dinner: FoodWastageModel | null;
}

export interface FoodItemsType {
  totalFoodPrepared: number;
  totalFoodWasted: number;
  items: FoodWastageItemModelTypes[];
}

export interface FoodWastageModelType {
  totalFoodPrepared: number;
  totalFoodWasted: number;
  items: FoodWastageItemModel[];
}

export interface RatingModelTypes {
  totalMembers: number;
  totalRating: number;
  fiveStarRating: number;
  fourStarRating: number;
  threeStarRating: number;
  twoStarRating: number;
  oneStarRating: number;
}

export interface ReviewModelType {
  id: string;
  profilePic: string;
  name: string;
  review: string;
}
export interface MealRatingAndReviewModelType {
  mealId: string;
  mealName: string;
  qualityRatings: RatingModel;
  tasteRatings: RatingModel;
  reviews: ReviewModel;
}
export interface Rating {
  totalMembers: number;
  totalRating: number;
  fiveStarRating: number;
  fourStarRating: number;
  threeStarRating: number;
  twoStarRating: number;
  oneStarRating: number;
}
export interface MealRatingAndReviewModelType {
  mealId: string;
  mealName: string;
  qualityRatings: RatingModel;
  tasteRatings: RatingModel;
}
export interface MealRatingAndReviewType {
  mealId: string;
  mealName: string;
  qualityRatings: Rating;
  tasteRatings: Rating;
}
