export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
};

export type TConstructorIngredient = TIngredient & {
  id: string;
};

export type TOrder = {
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
};

export type TOrdersData = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TUser = {
  email: string;
  name: string;
};

export type TTabMode = 'bun' | 'sauce' | 'main';

export enum IngredientsType {
  BUN = 'bun',
  SAUSE = 'sauce',
  MAIN = 'main'
}

export enum NameSpace {
  INGREDIENTS = 'ingedients',
  BURGER_CONSTRUCTOR = 'burgerConstructor',
  USER = 'user',
  FEED = 'feed',
  ORDER = 'order',
  ORDERS = 'orders'
}

export enum AppRoute {
  Constructor = '/',
  Login = '/login',
  Feed = '/feed',
  Register = '/register',
  ResetPassword = '/reset-password',
  ForgotPassword = '/forgot-password',
  Profile = '/profile',
  ProfileOrders = '/profile/orders',
  FeedByNumber = '/feed/:number',
  IngredientById = '/ingredients/:id',
  ProfileOrderByNumber = '/profile/orders/:number',
  NotFound = '*'
}

export enum AuthStatus {
  Unknown = 'Unknown',
  Auth = 'Auth',
  NoAuth = 'NoAuth'
}

export enum DetailTitles {
  Ingedients = 'Детали ингредиента',
  Order = 'Детали заказа'
}
