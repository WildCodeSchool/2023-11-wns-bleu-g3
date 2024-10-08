import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTimeISO: any;
};

export type Activity = {
  __typename?: 'Activity';
  category?: Maybe<Scalars['String']>;
  emissionPerMonth: Scalars['Float'];
  ends_at?: Maybe<Scalars['DateTimeISO']>;
  id: Scalars['Int'];
  is_made_in_france: Scalars['Boolean'];
  is_reccurent: Scalars['Boolean'];
  is_secondhand: Scalars['Boolean'];
  name: Scalars['String'];
  quantity: Scalars['Float'];
  reccurence_count?: Maybe<Scalars['Float']>;
  reccurence_interval?: Maybe<Scalars['String']>;
  starts_at: Scalars['DateTimeISO'];
  user: User;
};

export type ActivityType = {
  __typename?: 'ActivityType';
  attributes?: Maybe<Attr>;
  category: Scalars['String'];
  emissions: Scalars['Float'];
  id: Scalars['Int'];
  name: Scalars['String'];
  unit: Scalars['String'];
  vehicleAttributes?: Maybe<Vehicle_Attr>;
};

export type ActivityTypeInput = {
  attributes?: InputMaybe<Attr_Input>;
  category: Scalars['String'];
  emissions: Scalars['Float'];
  name: Scalars['String'];
  unit: Scalars['String'];
  vehicleAttributes?: InputMaybe<Vehicle_Attr_Input>;
};

export type Attr = {
  __typename?: 'Attr';
  madeInFrance?: Maybe<Scalars['Float']>;
  secondHandClothes?: Maybe<Scalars['Float']>;
  secondHandPhones?: Maybe<Scalars['Float']>;
};

export type Attr_Input = {
  madeInFrance?: InputMaybe<Scalars['Float']>;
  secondHandClothes?: InputMaybe<Scalars['Float']>;
  secondHandPhones?: InputMaybe<Scalars['Float']>;
};

export enum Category {
  Appliances = 'Appliances',
  Bike = 'Bike',
  Boat = 'Boat',
  Bus = 'Bus',
  Car = 'Car',
  Clothing = 'Clothing',
  Cooling = 'Cooling',
  Electronics = 'Electronics',
  Food = 'Food',
  Heating = 'Heating',
  Leisure = 'Leisure',
  Lighting = 'Lighting',
  Moto = 'Moto',
  Others = 'Others',
  Plane = 'Plane',
  Renewables = 'Renewables',
  Services = 'Services',
  Train = 'Train',
  Waste = 'Waste',
  Water = 'Water'
}

export type Donation = {
  __typename?: 'Donation';
  amount: Scalars['Float'];
  dateOfDonation: Scalars['DateTimeISO'];
  id: Scalars['Int'];
  user: User;
};

export type Like = {
  __typename?: 'Like';
  id: Scalars['Float'];
  post: Post;
  user: User;
};

export type LoginInput = {
  emailOrNickname: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmEmail: Scalars['Boolean'];
  createActivity: Scalars['Float'];
  createActivityType: ActivityType;
  createDonation: Donation;
  createPersonalVehicle: PersonalVehicle;
  createPost: Post;
  createUser: User;
  deleteActivity: Scalars['String'];
  deleteActivityType: Scalars['String'];
  deletePersonalVehicle: Scalars['String'];
  deletePost: Scalars['String'];
  deleteUser: Scalars['String'];
  follow: User;
  likeAndDislikePost: Scalars['String'];
  login: Scalars['String'];
  logout: Scalars['String'];
  resetPassword: Scalars['Boolean'];
  resetPasswordRequest: Scalars['Boolean'];
  toggleBlockUser: Array<Scalars['String']>;
  unfollow: User;
  updateActivity: Activity;
  updateActivityType: ActivityType;
  updatePersonalVehicle: PersonalVehicle;
  updatePost: Post;
  updateProfile: User;
};


export type MutationConfirmEmailArgs = {
  emailToken: Scalars['String'];
};


export type MutationCreateActivityArgs = {
  data: NewActivityInput;
};


export type MutationCreateActivityTypeArgs = {
  data: ActivityTypeInput;
};


export type MutationCreateDonationArgs = {
  data: NewDonationInput;
};


export type MutationCreatePersonalVehicleArgs = {
  data: NewPersonalVehicleInput;
};


export type MutationCreatePostArgs = {
  data: NewPostInput;
};


export type MutationCreateUserArgs = {
  data: NewUserInput;
};


export type MutationDeleteActivityArgs = {
  ActivityId: Scalars['Float'];
};


export type MutationDeleteActivityTypeArgs = {
  ActivityTypeId: Scalars['Float'];
};


export type MutationDeletePersonalVehicleArgs = {
  personalVehicleId: Scalars['Float'];
  userId?: InputMaybe<Scalars['Float']>;
};


export type MutationDeletePostArgs = {
  postId: Scalars['Float'];
  userId?: InputMaybe<Scalars['Float']>;
};


export type MutationDeleteUserArgs = {
  userId?: InputMaybe<Scalars['Float']>;
};


export type MutationFollowArgs = {
  userId: Scalars['Float'];
};


export type MutationLikeAndDislikePostArgs = {
  postId: Scalars['Float'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
  resetPasswordToken: Scalars['String'];
};


export type MutationResetPasswordRequestArgs = {
  data: ResetPasswordRequestInput;
};


export type MutationToggleBlockUserArgs = {
  userIds: Array<Scalars['Int']>;
};


export type MutationUnfollowArgs = {
  userId: Scalars['Float'];
};


export type MutationUpdateActivityArgs = {
  ActivityId: Scalars['Float'];
  data: UpdateActivityInput;
};


export type MutationUpdateActivityTypeArgs = {
  ActivityTypeId: Scalars['Float'];
  data: UpdateActivityTypeInput;
};


export type MutationUpdatePersonalVehicleArgs = {
  data: UpdatePersonalVehicleInput;
  personalVehicleId: Scalars['Float'];
  userId?: InputMaybe<Scalars['Float']>;
};


export type MutationUpdatePostArgs = {
  data: UpdatePostInput;
  postId: Scalars['Float'];
};


export type MutationUpdateProfileArgs = {
  data: UpdateUserInput;
};

export type NewActivityInput = {
  ends_at?: InputMaybe<Scalars['DateTimeISO']>;
  is_made_in_france: Scalars['Boolean'];
  is_reccurent: Scalars['Boolean'];
  is_secondhand: Scalars['Boolean'];
  name: Scalars['String'];
  quantity?: InputMaybe<Scalars['Float']>;
  reccurence_count?: InputMaybe<Scalars['Float']>;
  reccurence_interval?: InputMaybe<Scalars['String']>;
  starts_at: Scalars['DateTimeISO'];
  type: Scalars['String'];
};

export type NewDonationInput = {
  amount: Scalars['Float'];
};

export type NewPersonalVehicleInput = {
  fuel_type?: InputMaybe<Scalars['String']>;
  moto_engine?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  user: ObjectId;
  vehicle_category: Scalars['String'];
  vehicle_type?: InputMaybe<Scalars['String']>;
  year_of_construction?: InputMaybe<Scalars['String']>;
};

export type NewPostInput = {
  content: Scalars['String'];
  imageUrl?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  user: ObjectId;
};

export type NewUserInput = {
  email: Scalars['String'];
  nickname: Scalars['String'];
  password: Scalars['String'];
};

export type ObjectId = {
  id: Scalars['Int'];
};

export type PersonalVehicle = {
  __typename?: 'PersonalVehicle';
  created_at: Scalars['DateTimeISO'];
  emissionByKm: Scalars['Float'];
  fuel_type?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  moto_engine?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  user: User;
  vehicle_category: Scalars['String'];
  vehicle_type?: Maybe<Scalars['String']>;
  year_of_construction?: Maybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  content?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTimeISO'];
  id: Scalars['Int'];
  imageUrl?: Maybe<Scalars['String']>;
  likes: Array<Like>;
  nbOfLikes?: Maybe<Scalars['Float']>;
  reports: Array<Report>;
  title?: Maybe<Scalars['String']>;
  user: User;
};

export type Query = {
  __typename?: 'Query';
  getActivities: Array<Activity>;
  getActivitiesTypes: Array<ActivityType>;
  getActivitiesTypesPagination: Array<ActivityType>;
  getActivityTypesByCategory: Array<ActivityType>;
  getActivityTypesById: ActivityType;
  getCategories: Array<Scalars['String']>;
  getDonations: Array<Donation>;
  getFollowersByUser: Array<User>;
  getFollowingByUser: Array<User>;
  getFuelTypes: Array<Scalars['String']>;
  getGraphActivities: Array<Activity>;
  getLikes: Array<Like>;
  getMotoEngines: Array<Scalars['String']>;
  getPersonalVehicles: Array<PersonalVehicle>;
  getPosts: Array<Post>;
  getPostsPagination: Array<Post>;
  getUnits: Array<Scalars['String']>;
  getUserActivities: Array<Activity>;
  getUserByNickname?: Maybe<User>;
  getUsersPagination: Array<User>;
  getVehicleDecade: Array<Scalars['String']>;
  getVehicleTypes: Array<Scalars['String']>;
  profile: User;
  searchUser: Array<User>;
};


export type QueryGetActivitiesArgs = {
  userId?: InputMaybe<Scalars['Float']>;
};


export type QueryGetActivitiesTypesPaginationArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetActivityTypesByCategoryArgs = {
  category: Category;
};


export type QueryGetActivityTypesByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetDonationsArgs = {
  userId?: InputMaybe<Scalars['Float']>;
};


export type QueryGetFollowersByUserArgs = {
  userId?: InputMaybe<Scalars['Float']>;
};


export type QueryGetFollowingByUserArgs = {
  userId?: InputMaybe<Scalars['Float']>;
};


export type QueryGetGraphActivitiesArgs = {
  userId?: InputMaybe<Scalars['Float']>;
};


export type QueryGetLikesArgs = {
  postId?: InputMaybe<Scalars['Float']>;
};


export type QueryGetPersonalVehiclesArgs = {
  userId?: InputMaybe<Scalars['Float']>;
};


export type QueryGetPostsArgs = {
  title?: InputMaybe<Scalars['String']>;
};


export type QueryGetPostsPaginationArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetUserActivitiesArgs = {
  category?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  orderDir?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Float']>;
};


export type QueryGetUserByNicknameArgs = {
  nickname: Scalars['String'];
};


export type QueryGetUsersPaginationArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QuerySearchUserArgs = {
  name: Scalars['String'];
};

export type Report = {
  __typename?: 'Report';
  id: Scalars['Float'];
  post: Post;
  user: User;
};

export type ResetPasswordInput = {
  password: Scalars['String'];
};

export type ResetPasswordRequestInput = {
  email: Scalars['String'];
};

export type UpdateActivityInput = {
  ends_at?: InputMaybe<Scalars['DateTimeISO']>;
  is_made_in_france: Scalars['Boolean'];
  is_reccurent: Scalars['Boolean'];
  is_secondhand: Scalars['Boolean'];
  name: Scalars['String'];
  quantity: Scalars['Float'];
  reccurence_count?: InputMaybe<Scalars['Float']>;
  reccurence_interval?: InputMaybe<Scalars['String']>;
  starts_at: Scalars['DateTimeISO'];
};

export type UpdateActivityTypeInput = {
  attributes?: InputMaybe<Update_Attr_Input>;
  category: Scalars['String'];
  emissions: Scalars['Float'];
  unit: Scalars['String'];
  vehicleAttributes?: InputMaybe<UpdateVehicle_Attr_Input>;
};

export type UpdatePersonalVehicleInput = {
  fuel_type?: InputMaybe<Scalars['String']>;
  moto_engine?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  vehicle_category: Scalars['String'];
  vehicle_type?: InputMaybe<Scalars['String']>;
  year_of_construction?: InputMaybe<Scalars['String']>;
};

export type UpdatePostInput = {
  content?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
};

export type UpdateVehicle_Attr_Input = {
  fuelType?: InputMaybe<Scalars['String']>;
  motoEngine?: InputMaybe<Scalars['String']>;
  vehicleDecade?: InputMaybe<Scalars['String']>;
  vehicleType?: InputMaybe<Scalars['String']>;
};

export type Update_Attr_Input = {
  madeInFrance?: InputMaybe<Scalars['Float']>;
  secondHandClothes?: InputMaybe<Scalars['Float']>;
  secondHandPhones?: InputMaybe<Scalars['Float']>;
};

export type User = {
  __typename?: 'User';
  activities?: Maybe<Array<Activity>>;
  avatarUrl?: Maybe<Scalars['String']>;
  blocked_at?: Maybe<Scalars['DateTimeISO']>;
  createdAt: Scalars['String'];
  donation?: Maybe<Array<Donation>>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  followers?: Maybe<Array<User>>;
  following?: Maybe<Array<User>>;
  id: Scalars['Float'];
  isBlocked: Scalars['Boolean'];
  isOnline: Scalars['Boolean'];
  lastName?: Maybe<Scalars['String']>;
  likes: Array<Like>;
  nickname: Scalars['String'];
  personalVehicles?: Maybe<Array<PersonalVehicle>>;
  posts?: Maybe<Array<Post>>;
  reports: Array<Report>;
  role: Scalars['String'];
};

export type Vehicle_Attr = {
  __typename?: 'Vehicle_Attr';
  fuelType?: Maybe<Scalars['String']>;
  motoEngine?: Maybe<Scalars['String']>;
  vehicleDecade?: Maybe<Scalars['String']>;
  vehicleType?: Maybe<Scalars['String']>;
};

export type Vehicle_Attr_Input = {
  fuelType?: InputMaybe<Scalars['String']>;
  motoEngine?: InputMaybe<Scalars['String']>;
  vehicleDecade?: InputMaybe<Scalars['String']>;
  vehicleType?: InputMaybe<Scalars['String']>;
};

export type GetActivitiesTypesPaginationQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type GetActivitiesTypesPaginationQuery = { __typename?: 'Query', getActivitiesTypesPagination: Array<{ __typename?: 'ActivityType', category: string, emissions: number, id: number, name: string, unit: string }> };

export type GetPostsPaginationQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GetPostsPaginationQuery = { __typename?: 'Query', getPostsPagination: Array<{ __typename?: 'Post', id: number, created_at: any, nbOfLikes?: number | null, title?: string | null, imageUrl?: string | null, content?: string | null, user: { __typename?: 'User', id: number, nickname: string } }> };

export type GetUsersPaginationQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GetUsersPaginationQuery = { __typename?: 'Query', getUsersPagination: Array<{ __typename?: 'User', id: number, email: string, nickname: string, role: string, avatarUrl?: string | null, createdAt: string, blocked_at?: any | null, isBlocked: boolean }> };

export type ConfirmEmailMutationVariables = Exact<{
  emailToken: Scalars['String'];
}>;


export type ConfirmEmailMutation = { __typename?: 'Mutation', confirmEmail: boolean };

export type CreateActivityMutationVariables = Exact<{
  data: NewActivityInput;
}>;


export type CreateActivityMutation = { __typename?: 'Mutation', createActivity: number };

export type CreateActivityTypeMutationVariables = Exact<{
  data: ActivityTypeInput;
}>;


export type CreateActivityTypeMutation = { __typename?: 'Mutation', createActivityType: { __typename?: 'ActivityType', category: string, emissions: number, id: number, name: string, unit: string, vehicleAttributes?: { __typename?: 'Vehicle_Attr', fuelType?: string | null, motoEngine?: string | null, vehicleDecade?: string | null, vehicleType?: string | null } | null } };

export type CreateDonationMutationVariables = Exact<{
  data: NewDonationInput;
}>;


export type CreateDonationMutation = { __typename?: 'Mutation', createDonation: { __typename?: 'Donation', id: number, dateOfDonation: any, amount: number, user: { __typename?: 'User', nickname: string } } };

export type CreatePersonalVehicleMutationVariables = Exact<{
  data: NewPersonalVehicleInput;
}>;


export type CreatePersonalVehicleMutation = { __typename?: 'Mutation', createPersonalVehicle: { __typename?: 'PersonalVehicle', id: number, name: string, moto_engine?: string | null, vehicle_category: string, year_of_construction?: string | null, vehicle_type?: string | null, fuel_type?: string | null } };

export type CreatePostMutationVariables = Exact<{
  data: NewPostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: number, title?: string | null, content?: string | null, imageUrl?: string | null, nbOfLikes?: number | null, created_at: any, user: { __typename?: 'User', id: number } } };

export type DeleteActivityMutationVariables = Exact<{
  activityId: Scalars['Float'];
}>;


export type DeleteActivityMutation = { __typename?: 'Mutation', deleteActivity: string };

export type DeleteActivityTypeMutationVariables = Exact<{
  activityTypeId: Scalars['Float'];
}>;


export type DeleteActivityTypeMutation = { __typename?: 'Mutation', deleteActivityType: string };

export type DeletePersonalVehicleMutationVariables = Exact<{
  personalVehicleId: Scalars['Float'];
}>;


export type DeletePersonalVehicleMutation = { __typename?: 'Mutation', deletePersonalVehicle: string };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['Float'];
  userId?: InputMaybe<Scalars['Float']>;
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: string };

export type DeleteUserMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['Float']>;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: string };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: Array<string> };

export type GetFuelTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFuelTypesQuery = { __typename?: 'Query', getFuelTypes: Array<string> };

export type GetMotoEnginesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMotoEnginesQuery = { __typename?: 'Query', getMotoEngines: Array<string> };

export type GetUnitsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnitsQuery = { __typename?: 'Query', getUnits: Array<string> };

export type GetVehicleDecadeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVehicleDecadeQuery = { __typename?: 'Query', getVehicleDecade: Array<string> };

export type GetVehicleTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVehicleTypesQuery = { __typename?: 'Query', getVehicleTypes: Array<string> };

export type FollowMutationVariables = Exact<{
  userId: Scalars['Float'];
}>;


export type FollowMutation = { __typename?: 'Mutation', follow: { __typename?: 'User', id: number } };

export type GetActivitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActivitiesQuery = { __typename?: 'Query', getActivities: Array<{ __typename?: 'Activity', id: number, name: string, quantity: number, is_reccurent: boolean, reccurence_interval?: string | null, reccurence_count?: number | null, starts_at: any, ends_at?: any | null, is_secondhand: boolean, is_made_in_france: boolean, emissionPerMonth: number, category?: string | null, user: { __typename?: 'User', nickname: string } }> };

export type GetActivityTypesByCategoryQueryVariables = Exact<{
  getActivityTypesByCategory: Category;
}>;


export type GetActivityTypesByCategoryQuery = { __typename?: 'Query', getActivityTypesByCategory: Array<{ __typename?: 'ActivityType', name: string, emissions: number }> };

export type GetActivityTypesByIdQueryVariables = Exact<{
  getActivityTypesById: Scalars['Int'];
}>;


export type GetActivityTypesByIdQuery = { __typename?: 'Query', getActivityTypesById: { __typename?: 'ActivityType', category: string, id: number, emissions: number, name: string, unit: string, attributes?: { __typename?: 'Attr', madeInFrance?: number | null, secondHandClothes?: number | null, secondHandPhones?: number | null } | null, vehicleAttributes?: { __typename?: 'Vehicle_Attr', fuelType?: string | null, vehicleType?: string | null, vehicleDecade?: string | null, motoEngine?: string | null } | null } };

export type GetDonationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDonationsQuery = { __typename?: 'Query', getDonations: Array<{ __typename?: 'Donation', id: number, amount: number, dateOfDonation: any, user: { __typename?: 'User', nickname: string } }> };

export type GetGraphActivitiesQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['Float']>;
}>;


export type GetGraphActivitiesQuery = { __typename?: 'Query', getGraphActivities: Array<{ __typename?: 'Activity', id: number, starts_at: any, category?: string | null, emissionPerMonth: number }> };

export type GetLikesQueryVariables = Exact<{
  postId?: InputMaybe<Scalars['Float']>;
}>;


export type GetLikesQuery = { __typename?: 'Query', getLikes: Array<{ __typename?: 'Like', id: number, post: { __typename?: 'Post', id: number }, user: { __typename?: 'User', id: number } }> };

export type GetPersonalVehiclesQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['Float']>;
}>;


export type GetPersonalVehiclesQuery = { __typename?: 'Query', getPersonalVehicles: Array<{ __typename?: 'PersonalVehicle', id: number, name: string, vehicle_category: string, vehicle_type?: string | null, fuel_type?: string | null, year_of_construction?: string | null, moto_engine?: string | null, created_at: any, emissionByKm: number, user: { __typename?: 'User', id: number } }> };

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = { __typename?: 'Query', getPosts: Array<{ __typename?: 'Post', id: number, title?: string | null, content?: string | null, imageUrl?: string | null, created_at: any, nbOfLikes?: number | null, user: { __typename?: 'User', id: number, nickname: string }, likes: Array<{ __typename?: 'Like', id: number }> }> };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', id: number, email: string, nickname: string, avatarUrl?: string | null, role: string, firstName?: string | null, lastName?: string | null, posts?: Array<{ __typename?: 'Post', id: number }> | null, followers?: Array<{ __typename?: 'User', id: number, avatarUrl?: string | null }> | null, following?: Array<{ __typename?: 'User', id: number, avatarUrl?: string | null }> | null } };

export type GetUserActivitiesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  orderDir?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  category: Scalars['String'];
}>;


export type GetUserActivitiesQuery = { __typename?: 'Query', getUserActivities: Array<{ __typename?: 'Activity', id: number, name: string, quantity: number, is_reccurent: boolean, reccurence_interval?: string | null, reccurence_count?: number | null, starts_at: any, ends_at?: any | null, is_secondhand: boolean, is_made_in_france: boolean, emissionPerMonth: number, category?: string | null, user: { __typename?: 'User', nickname: string } }> };

export type GetUserByNicknameQueryVariables = Exact<{
  nickname: Scalars['String'];
}>;


export type GetUserByNicknameQuery = { __typename?: 'Query', getUserByNickname?: { __typename?: 'User', id: number, nickname: string, firstName?: string | null, lastName?: string | null, avatarUrl?: string | null, posts?: Array<{ __typename?: 'Post', id: number }> | null, followers?: Array<{ __typename?: 'User', id: number, avatarUrl?: string | null }> | null, following?: Array<{ __typename?: 'User', id: number, avatarUrl?: string | null }> | null } | null };

export type LikeAndDislikePostMutationVariables = Exact<{
  postId: Scalars['Float'];
}>;


export type LikeAndDislikePostMutation = { __typename?: 'Mutation', likeAndDislikePost: string };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type ResetPasswordMutationVariables = Exact<{
  resetPasswordToken: Scalars['String'];
  data: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type ResetPasswordRequestMutationVariables = Exact<{
  data: ResetPasswordRequestInput;
}>;


export type ResetPasswordRequestMutation = { __typename?: 'Mutation', resetPasswordRequest: boolean };

export type SearchUserQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type SearchUserQuery = { __typename?: 'Query', searchUser: Array<{ __typename?: 'User', id: number, firstName?: string | null, lastName?: string | null, avatarUrl?: string | null, nickname: string }> };

export type SignupMutationVariables = Exact<{
  data: NewUserInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number, nickname: string, email: string, avatarUrl?: string | null } };

export type ToggleBlockUserMutationVariables = Exact<{
  userIds: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type ToggleBlockUserMutation = { __typename?: 'Mutation', toggleBlockUser: Array<string> };

export type UnfollowMutationVariables = Exact<{
  userId: Scalars['Float'];
}>;


export type UnfollowMutation = { __typename?: 'Mutation', unfollow: { __typename?: 'User', id: number } };

export type UpdateActivityTypeMutationVariables = Exact<{
  activityTypeId: Scalars['Float'];
  data: UpdateActivityTypeInput;
}>;


export type UpdateActivityTypeMutation = { __typename?: 'Mutation', updateActivityType: { __typename?: 'ActivityType', id: number, emissions: number, unit: string, category: string, vehicleAttributes?: { __typename?: 'Vehicle_Attr', fuelType?: string | null, vehicleType?: string | null, vehicleDecade?: string | null, motoEngine?: string | null } | null, attributes?: { __typename?: 'Attr', madeInFrance?: number | null, secondHandClothes?: number | null, secondHandPhones?: number | null } | null } };

export type UpdatePersonalVehicleMutationVariables = Exact<{
  data: UpdatePersonalVehicleInput;
  personalVehicleId: Scalars['Float'];
}>;


export type UpdatePersonalVehicleMutation = { __typename?: 'Mutation', updatePersonalVehicle: { __typename?: 'PersonalVehicle', id: number, name: string, vehicle_category: string, vehicle_type?: string | null, year_of_construction?: string | null, fuel_type?: string | null, moto_engine?: string | null, created_at: any, user: { __typename?: 'User', id: number } } };

export type UpdatePostMutationVariables = Exact<{
  data: UpdatePostInput;
  postId: Scalars['Float'];
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'Post', id: number, title?: string | null, content?: string | null, imageUrl?: string | null, nbOfLikes?: number | null } };

export type UpdateProfileMutationVariables = Exact<{
  data: UpdateUserInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'User', id: number, email: string, nickname: string, firstName?: string | null, lastName?: string | null, avatarUrl?: string | null } };


export const GetActivitiesTypesPaginationDocument = gql`
    query GetActivitiesTypesPagination($limit: Int, $offset: Int) {
  getActivitiesTypesPagination(limit: $limit, offset: $offset) {
    category
    emissions
    id
    name
    unit
  }
}
    `;

/**
 * __useGetActivitiesTypesPaginationQuery__
 *
 * To run a query within a React component, call `useGetActivitiesTypesPaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActivitiesTypesPaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActivitiesTypesPaginationQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetActivitiesTypesPaginationQuery(baseOptions?: Apollo.QueryHookOptions<GetActivitiesTypesPaginationQuery, GetActivitiesTypesPaginationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetActivitiesTypesPaginationQuery, GetActivitiesTypesPaginationQueryVariables>(GetActivitiesTypesPaginationDocument, options);
      }
export function useGetActivitiesTypesPaginationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetActivitiesTypesPaginationQuery, GetActivitiesTypesPaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetActivitiesTypesPaginationQuery, GetActivitiesTypesPaginationQueryVariables>(GetActivitiesTypesPaginationDocument, options);
        }
export function useGetActivitiesTypesPaginationSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetActivitiesTypesPaginationQuery, GetActivitiesTypesPaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetActivitiesTypesPaginationQuery, GetActivitiesTypesPaginationQueryVariables>(GetActivitiesTypesPaginationDocument, options);
        }
export type GetActivitiesTypesPaginationQueryHookResult = ReturnType<typeof useGetActivitiesTypesPaginationQuery>;
export type GetActivitiesTypesPaginationLazyQueryHookResult = ReturnType<typeof useGetActivitiesTypesPaginationLazyQuery>;
export type GetActivitiesTypesPaginationSuspenseQueryHookResult = ReturnType<typeof useGetActivitiesTypesPaginationSuspenseQuery>;
export type GetActivitiesTypesPaginationQueryResult = Apollo.QueryResult<GetActivitiesTypesPaginationQuery, GetActivitiesTypesPaginationQueryVariables>;
export const GetPostsPaginationDocument = gql`
    query GetPostsPagination($offset: Int, $limit: Int) {
  getPostsPagination(offset: $offset, limit: $limit) {
    id
    created_at
    nbOfLikes
    title
    imageUrl
    content
    user {
      id
      nickname
    }
  }
}
    `;

/**
 * __useGetPostsPaginationQuery__
 *
 * To run a query within a React component, call `useGetPostsPaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsPaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsPaginationQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetPostsPaginationQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsPaginationQuery, GetPostsPaginationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsPaginationQuery, GetPostsPaginationQueryVariables>(GetPostsPaginationDocument, options);
      }
export function useGetPostsPaginationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsPaginationQuery, GetPostsPaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsPaginationQuery, GetPostsPaginationQueryVariables>(GetPostsPaginationDocument, options);
        }
export function useGetPostsPaginationSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPostsPaginationQuery, GetPostsPaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostsPaginationQuery, GetPostsPaginationQueryVariables>(GetPostsPaginationDocument, options);
        }
export type GetPostsPaginationQueryHookResult = ReturnType<typeof useGetPostsPaginationQuery>;
export type GetPostsPaginationLazyQueryHookResult = ReturnType<typeof useGetPostsPaginationLazyQuery>;
export type GetPostsPaginationSuspenseQueryHookResult = ReturnType<typeof useGetPostsPaginationSuspenseQuery>;
export type GetPostsPaginationQueryResult = Apollo.QueryResult<GetPostsPaginationQuery, GetPostsPaginationQueryVariables>;
export const GetUsersPaginationDocument = gql`
    query GetUsersPagination($offset: Int, $limit: Int) {
  getUsersPagination(offset: $offset, limit: $limit) {
    id
    email
    nickname
    role
    avatarUrl
    createdAt
    blocked_at
    isBlocked
  }
}
    `;

/**
 * __useGetUsersPaginationQuery__
 *
 * To run a query within a React component, call `useGetUsersPaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersPaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersPaginationQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetUsersPaginationQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersPaginationQuery, GetUsersPaginationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersPaginationQuery, GetUsersPaginationQueryVariables>(GetUsersPaginationDocument, options);
      }
export function useGetUsersPaginationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersPaginationQuery, GetUsersPaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersPaginationQuery, GetUsersPaginationQueryVariables>(GetUsersPaginationDocument, options);
        }
export function useGetUsersPaginationSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUsersPaginationQuery, GetUsersPaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersPaginationQuery, GetUsersPaginationQueryVariables>(GetUsersPaginationDocument, options);
        }
export type GetUsersPaginationQueryHookResult = ReturnType<typeof useGetUsersPaginationQuery>;
export type GetUsersPaginationLazyQueryHookResult = ReturnType<typeof useGetUsersPaginationLazyQuery>;
export type GetUsersPaginationSuspenseQueryHookResult = ReturnType<typeof useGetUsersPaginationSuspenseQuery>;
export type GetUsersPaginationQueryResult = Apollo.QueryResult<GetUsersPaginationQuery, GetUsersPaginationQueryVariables>;
export const ConfirmEmailDocument = gql`
    mutation ConfirmEmail($emailToken: String!) {
  confirmEmail(emailToken: $emailToken)
}
    `;
export type ConfirmEmailMutationFn = Apollo.MutationFunction<ConfirmEmailMutation, ConfirmEmailMutationVariables>;

/**
 * __useConfirmEmailMutation__
 *
 * To run a mutation, you first call `useConfirmEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmEmailMutation, { data, loading, error }] = useConfirmEmailMutation({
 *   variables: {
 *      emailToken: // value for 'emailToken'
 *   },
 * });
 */
export function useConfirmEmailMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmEmailMutation, ConfirmEmailMutationVariables>(ConfirmEmailDocument, options);
      }
export type ConfirmEmailMutationHookResult = ReturnType<typeof useConfirmEmailMutation>;
export type ConfirmEmailMutationResult = Apollo.MutationResult<ConfirmEmailMutation>;
export type ConfirmEmailMutationOptions = Apollo.BaseMutationOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>;
export const CreateActivityDocument = gql`
    mutation CreateActivity($data: NewActivityInput!) {
  createActivity(data: $data)
}
    `;
export type CreateActivityMutationFn = Apollo.MutationFunction<CreateActivityMutation, CreateActivityMutationVariables>;

/**
 * __useCreateActivityMutation__
 *
 * To run a mutation, you first call `useCreateActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createActivityMutation, { data, loading, error }] = useCreateActivityMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateActivityMutation(baseOptions?: Apollo.MutationHookOptions<CreateActivityMutation, CreateActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateActivityMutation, CreateActivityMutationVariables>(CreateActivityDocument, options);
      }
export type CreateActivityMutationHookResult = ReturnType<typeof useCreateActivityMutation>;
export type CreateActivityMutationResult = Apollo.MutationResult<CreateActivityMutation>;
export type CreateActivityMutationOptions = Apollo.BaseMutationOptions<CreateActivityMutation, CreateActivityMutationVariables>;
export const CreateActivityTypeDocument = gql`
    mutation CreateActivityType($data: ActivityTypeInput!) {
  createActivityType(data: $data) {
    category
    emissions
    id
    name
    unit
    vehicleAttributes {
      fuelType
      motoEngine
      vehicleDecade
      vehicleType
    }
  }
}
    `;
export type CreateActivityTypeMutationFn = Apollo.MutationFunction<CreateActivityTypeMutation, CreateActivityTypeMutationVariables>;

/**
 * __useCreateActivityTypeMutation__
 *
 * To run a mutation, you first call `useCreateActivityTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateActivityTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createActivityTypeMutation, { data, loading, error }] = useCreateActivityTypeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateActivityTypeMutation(baseOptions?: Apollo.MutationHookOptions<CreateActivityTypeMutation, CreateActivityTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateActivityTypeMutation, CreateActivityTypeMutationVariables>(CreateActivityTypeDocument, options);
      }
export type CreateActivityTypeMutationHookResult = ReturnType<typeof useCreateActivityTypeMutation>;
export type CreateActivityTypeMutationResult = Apollo.MutationResult<CreateActivityTypeMutation>;
export type CreateActivityTypeMutationOptions = Apollo.BaseMutationOptions<CreateActivityTypeMutation, CreateActivityTypeMutationVariables>;
export const CreateDonationDocument = gql`
    mutation CreateDonation($data: NewDonationInput!) {
  createDonation(data: $data) {
    id
    dateOfDonation
    amount
    user {
      nickname
    }
  }
}
    `;
export type CreateDonationMutationFn = Apollo.MutationFunction<CreateDonationMutation, CreateDonationMutationVariables>;

/**
 * __useCreateDonationMutation__
 *
 * To run a mutation, you first call `useCreateDonationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDonationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDonationMutation, { data, loading, error }] = useCreateDonationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateDonationMutation(baseOptions?: Apollo.MutationHookOptions<CreateDonationMutation, CreateDonationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDonationMutation, CreateDonationMutationVariables>(CreateDonationDocument, options);
      }
export type CreateDonationMutationHookResult = ReturnType<typeof useCreateDonationMutation>;
export type CreateDonationMutationResult = Apollo.MutationResult<CreateDonationMutation>;
export type CreateDonationMutationOptions = Apollo.BaseMutationOptions<CreateDonationMutation, CreateDonationMutationVariables>;
export const CreatePersonalVehicleDocument = gql`
    mutation CreatePersonalVehicle($data: NewPersonalVehicleInput!) {
  createPersonalVehicle(data: $data) {
    id
    name
    moto_engine
    vehicle_category
    year_of_construction
    vehicle_type
    fuel_type
  }
}
    `;
export type CreatePersonalVehicleMutationFn = Apollo.MutationFunction<CreatePersonalVehicleMutation, CreatePersonalVehicleMutationVariables>;

/**
 * __useCreatePersonalVehicleMutation__
 *
 * To run a mutation, you first call `useCreatePersonalVehicleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePersonalVehicleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPersonalVehicleMutation, { data, loading, error }] = useCreatePersonalVehicleMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePersonalVehicleMutation(baseOptions?: Apollo.MutationHookOptions<CreatePersonalVehicleMutation, CreatePersonalVehicleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePersonalVehicleMutation, CreatePersonalVehicleMutationVariables>(CreatePersonalVehicleDocument, options);
      }
export type CreatePersonalVehicleMutationHookResult = ReturnType<typeof useCreatePersonalVehicleMutation>;
export type CreatePersonalVehicleMutationResult = Apollo.MutationResult<CreatePersonalVehicleMutation>;
export type CreatePersonalVehicleMutationOptions = Apollo.BaseMutationOptions<CreatePersonalVehicleMutation, CreatePersonalVehicleMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($data: NewPostInput!) {
  createPost(data: $data) {
    id
    title
    content
    imageUrl
    nbOfLikes
    created_at
    user {
      id
    }
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeleteActivityDocument = gql`
    mutation DeleteActivity($activityId: Float!) {
  deleteActivity(ActivityId: $activityId)
}
    `;
export type DeleteActivityMutationFn = Apollo.MutationFunction<DeleteActivityMutation, DeleteActivityMutationVariables>;

/**
 * __useDeleteActivityMutation__
 *
 * To run a mutation, you first call `useDeleteActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteActivityMutation, { data, loading, error }] = useDeleteActivityMutation({
 *   variables: {
 *      activityId: // value for 'activityId'
 *   },
 * });
 */
export function useDeleteActivityMutation(baseOptions?: Apollo.MutationHookOptions<DeleteActivityMutation, DeleteActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteActivityMutation, DeleteActivityMutationVariables>(DeleteActivityDocument, options);
      }
export type DeleteActivityMutationHookResult = ReturnType<typeof useDeleteActivityMutation>;
export type DeleteActivityMutationResult = Apollo.MutationResult<DeleteActivityMutation>;
export type DeleteActivityMutationOptions = Apollo.BaseMutationOptions<DeleteActivityMutation, DeleteActivityMutationVariables>;
export const DeleteActivityTypeDocument = gql`
    mutation DeleteActivityType($activityTypeId: Float!) {
  deleteActivityType(ActivityTypeId: $activityTypeId)
}
    `;
export type DeleteActivityTypeMutationFn = Apollo.MutationFunction<DeleteActivityTypeMutation, DeleteActivityTypeMutationVariables>;

/**
 * __useDeleteActivityTypeMutation__
 *
 * To run a mutation, you first call `useDeleteActivityTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteActivityTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteActivityTypeMutation, { data, loading, error }] = useDeleteActivityTypeMutation({
 *   variables: {
 *      activityTypeId: // value for 'activityTypeId'
 *   },
 * });
 */
export function useDeleteActivityTypeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteActivityTypeMutation, DeleteActivityTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteActivityTypeMutation, DeleteActivityTypeMutationVariables>(DeleteActivityTypeDocument, options);
      }
export type DeleteActivityTypeMutationHookResult = ReturnType<typeof useDeleteActivityTypeMutation>;
export type DeleteActivityTypeMutationResult = Apollo.MutationResult<DeleteActivityTypeMutation>;
export type DeleteActivityTypeMutationOptions = Apollo.BaseMutationOptions<DeleteActivityTypeMutation, DeleteActivityTypeMutationVariables>;
export const DeletePersonalVehicleDocument = gql`
    mutation DeletePersonalVehicle($personalVehicleId: Float!) {
  deletePersonalVehicle(personalVehicleId: $personalVehicleId)
}
    `;
export type DeletePersonalVehicleMutationFn = Apollo.MutationFunction<DeletePersonalVehicleMutation, DeletePersonalVehicleMutationVariables>;

/**
 * __useDeletePersonalVehicleMutation__
 *
 * To run a mutation, you first call `useDeletePersonalVehicleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePersonalVehicleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePersonalVehicleMutation, { data, loading, error }] = useDeletePersonalVehicleMutation({
 *   variables: {
 *      personalVehicleId: // value for 'personalVehicleId'
 *   },
 * });
 */
export function useDeletePersonalVehicleMutation(baseOptions?: Apollo.MutationHookOptions<DeletePersonalVehicleMutation, DeletePersonalVehicleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePersonalVehicleMutation, DeletePersonalVehicleMutationVariables>(DeletePersonalVehicleDocument, options);
      }
export type DeletePersonalVehicleMutationHookResult = ReturnType<typeof useDeletePersonalVehicleMutation>;
export type DeletePersonalVehicleMutationResult = Apollo.MutationResult<DeletePersonalVehicleMutation>;
export type DeletePersonalVehicleMutationOptions = Apollo.BaseMutationOptions<DeletePersonalVehicleMutation, DeletePersonalVehicleMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($postId: Float!, $userId: Float) {
  deletePost(postId: $postId, userId: $userId)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($userId: Float) {
  deleteUser(userId: $userId)
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const GetCategoriesDocument = gql`
    query getCategories {
  getCategories
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export function useGetCategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetCategoriesSuspenseQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetFuelTypesDocument = gql`
    query getFuelTypes {
  getFuelTypes
}
    `;

/**
 * __useGetFuelTypesQuery__
 *
 * To run a query within a React component, call `useGetFuelTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFuelTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFuelTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFuelTypesQuery(baseOptions?: Apollo.QueryHookOptions<GetFuelTypesQuery, GetFuelTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFuelTypesQuery, GetFuelTypesQueryVariables>(GetFuelTypesDocument, options);
      }
export function useGetFuelTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFuelTypesQuery, GetFuelTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFuelTypesQuery, GetFuelTypesQueryVariables>(GetFuelTypesDocument, options);
        }
export function useGetFuelTypesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetFuelTypesQuery, GetFuelTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFuelTypesQuery, GetFuelTypesQueryVariables>(GetFuelTypesDocument, options);
        }
export type GetFuelTypesQueryHookResult = ReturnType<typeof useGetFuelTypesQuery>;
export type GetFuelTypesLazyQueryHookResult = ReturnType<typeof useGetFuelTypesLazyQuery>;
export type GetFuelTypesSuspenseQueryHookResult = ReturnType<typeof useGetFuelTypesSuspenseQuery>;
export type GetFuelTypesQueryResult = Apollo.QueryResult<GetFuelTypesQuery, GetFuelTypesQueryVariables>;
export const GetMotoEnginesDocument = gql`
    query getMotoEngines {
  getMotoEngines
}
    `;

/**
 * __useGetMotoEnginesQuery__
 *
 * To run a query within a React component, call `useGetMotoEnginesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMotoEnginesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMotoEnginesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMotoEnginesQuery(baseOptions?: Apollo.QueryHookOptions<GetMotoEnginesQuery, GetMotoEnginesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMotoEnginesQuery, GetMotoEnginesQueryVariables>(GetMotoEnginesDocument, options);
      }
export function useGetMotoEnginesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMotoEnginesQuery, GetMotoEnginesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMotoEnginesQuery, GetMotoEnginesQueryVariables>(GetMotoEnginesDocument, options);
        }
export function useGetMotoEnginesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMotoEnginesQuery, GetMotoEnginesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMotoEnginesQuery, GetMotoEnginesQueryVariables>(GetMotoEnginesDocument, options);
        }
export type GetMotoEnginesQueryHookResult = ReturnType<typeof useGetMotoEnginesQuery>;
export type GetMotoEnginesLazyQueryHookResult = ReturnType<typeof useGetMotoEnginesLazyQuery>;
export type GetMotoEnginesSuspenseQueryHookResult = ReturnType<typeof useGetMotoEnginesSuspenseQuery>;
export type GetMotoEnginesQueryResult = Apollo.QueryResult<GetMotoEnginesQuery, GetMotoEnginesQueryVariables>;
export const GetUnitsDocument = gql`
    query getUnits {
  getUnits
}
    `;

/**
 * __useGetUnitsQuery__
 *
 * To run a query within a React component, call `useGetUnitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnitsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUnitsQuery(baseOptions?: Apollo.QueryHookOptions<GetUnitsQuery, GetUnitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUnitsQuery, GetUnitsQueryVariables>(GetUnitsDocument, options);
      }
export function useGetUnitsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUnitsQuery, GetUnitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUnitsQuery, GetUnitsQueryVariables>(GetUnitsDocument, options);
        }
export function useGetUnitsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUnitsQuery, GetUnitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUnitsQuery, GetUnitsQueryVariables>(GetUnitsDocument, options);
        }
export type GetUnitsQueryHookResult = ReturnType<typeof useGetUnitsQuery>;
export type GetUnitsLazyQueryHookResult = ReturnType<typeof useGetUnitsLazyQuery>;
export type GetUnitsSuspenseQueryHookResult = ReturnType<typeof useGetUnitsSuspenseQuery>;
export type GetUnitsQueryResult = Apollo.QueryResult<GetUnitsQuery, GetUnitsQueryVariables>;
export const GetVehicleDecadeDocument = gql`
    query getVehicleDecade {
  getVehicleDecade
}
    `;

/**
 * __useGetVehicleDecadeQuery__
 *
 * To run a query within a React component, call `useGetVehicleDecadeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVehicleDecadeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVehicleDecadeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetVehicleDecadeQuery(baseOptions?: Apollo.QueryHookOptions<GetVehicleDecadeQuery, GetVehicleDecadeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVehicleDecadeQuery, GetVehicleDecadeQueryVariables>(GetVehicleDecadeDocument, options);
      }
export function useGetVehicleDecadeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVehicleDecadeQuery, GetVehicleDecadeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVehicleDecadeQuery, GetVehicleDecadeQueryVariables>(GetVehicleDecadeDocument, options);
        }
export function useGetVehicleDecadeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetVehicleDecadeQuery, GetVehicleDecadeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetVehicleDecadeQuery, GetVehicleDecadeQueryVariables>(GetVehicleDecadeDocument, options);
        }
export type GetVehicleDecadeQueryHookResult = ReturnType<typeof useGetVehicleDecadeQuery>;
export type GetVehicleDecadeLazyQueryHookResult = ReturnType<typeof useGetVehicleDecadeLazyQuery>;
export type GetVehicleDecadeSuspenseQueryHookResult = ReturnType<typeof useGetVehicleDecadeSuspenseQuery>;
export type GetVehicleDecadeQueryResult = Apollo.QueryResult<GetVehicleDecadeQuery, GetVehicleDecadeQueryVariables>;
export const GetVehicleTypesDocument = gql`
    query getVehicleTypes {
  getVehicleTypes
}
    `;

/**
 * __useGetVehicleTypesQuery__
 *
 * To run a query within a React component, call `useGetVehicleTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVehicleTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVehicleTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetVehicleTypesQuery(baseOptions?: Apollo.QueryHookOptions<GetVehicleTypesQuery, GetVehicleTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVehicleTypesQuery, GetVehicleTypesQueryVariables>(GetVehicleTypesDocument, options);
      }
export function useGetVehicleTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVehicleTypesQuery, GetVehicleTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVehicleTypesQuery, GetVehicleTypesQueryVariables>(GetVehicleTypesDocument, options);
        }
export function useGetVehicleTypesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetVehicleTypesQuery, GetVehicleTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetVehicleTypesQuery, GetVehicleTypesQueryVariables>(GetVehicleTypesDocument, options);
        }
export type GetVehicleTypesQueryHookResult = ReturnType<typeof useGetVehicleTypesQuery>;
export type GetVehicleTypesLazyQueryHookResult = ReturnType<typeof useGetVehicleTypesLazyQuery>;
export type GetVehicleTypesSuspenseQueryHookResult = ReturnType<typeof useGetVehicleTypesSuspenseQuery>;
export type GetVehicleTypesQueryResult = Apollo.QueryResult<GetVehicleTypesQuery, GetVehicleTypesQueryVariables>;
export const FollowDocument = gql`
    mutation Follow($userId: Float!) {
  follow(userId: $userId) {
    id
  }
}
    `;
export type FollowMutationFn = Apollo.MutationFunction<FollowMutation, FollowMutationVariables>;

/**
 * __useFollowMutation__
 *
 * To run a mutation, you first call `useFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followMutation, { data, loading, error }] = useFollowMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFollowMutation(baseOptions?: Apollo.MutationHookOptions<FollowMutation, FollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowMutation, FollowMutationVariables>(FollowDocument, options);
      }
export type FollowMutationHookResult = ReturnType<typeof useFollowMutation>;
export type FollowMutationResult = Apollo.MutationResult<FollowMutation>;
export type FollowMutationOptions = Apollo.BaseMutationOptions<FollowMutation, FollowMutationVariables>;
export const GetActivitiesDocument = gql`
    query GetActivities {
  getActivities {
    id
    name
    quantity
    is_reccurent
    reccurence_interval
    reccurence_count
    starts_at
    ends_at
    user {
      nickname
    }
    is_secondhand
    is_made_in_france
    emissionPerMonth
    category
  }
}
    `;

/**
 * __useGetActivitiesQuery__
 *
 * To run a query within a React component, call `useGetActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActivitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetActivitiesQuery(baseOptions?: Apollo.QueryHookOptions<GetActivitiesQuery, GetActivitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetActivitiesQuery, GetActivitiesQueryVariables>(GetActivitiesDocument, options);
      }
export function useGetActivitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetActivitiesQuery, GetActivitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetActivitiesQuery, GetActivitiesQueryVariables>(GetActivitiesDocument, options);
        }
export function useGetActivitiesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetActivitiesQuery, GetActivitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetActivitiesQuery, GetActivitiesQueryVariables>(GetActivitiesDocument, options);
        }
export type GetActivitiesQueryHookResult = ReturnType<typeof useGetActivitiesQuery>;
export type GetActivitiesLazyQueryHookResult = ReturnType<typeof useGetActivitiesLazyQuery>;
export type GetActivitiesSuspenseQueryHookResult = ReturnType<typeof useGetActivitiesSuspenseQuery>;
export type GetActivitiesQueryResult = Apollo.QueryResult<GetActivitiesQuery, GetActivitiesQueryVariables>;
export const GetActivityTypesByCategoryDocument = gql`
    query GetActivityTypesByCategory($getActivityTypesByCategory: Category!) {
  getActivityTypesByCategory(category: $getActivityTypesByCategory) {
    name
    emissions
  }
}
    `;

/**
 * __useGetActivityTypesByCategoryQuery__
 *
 * To run a query within a React component, call `useGetActivityTypesByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActivityTypesByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActivityTypesByCategoryQuery({
 *   variables: {
 *      getActivityTypesByCategory: // value for 'getActivityTypesByCategory'
 *   },
 * });
 */
export function useGetActivityTypesByCategoryQuery(baseOptions: Apollo.QueryHookOptions<GetActivityTypesByCategoryQuery, GetActivityTypesByCategoryQueryVariables> & ({ variables: GetActivityTypesByCategoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetActivityTypesByCategoryQuery, GetActivityTypesByCategoryQueryVariables>(GetActivityTypesByCategoryDocument, options);
      }
export function useGetActivityTypesByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetActivityTypesByCategoryQuery, GetActivityTypesByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetActivityTypesByCategoryQuery, GetActivityTypesByCategoryQueryVariables>(GetActivityTypesByCategoryDocument, options);
        }
export function useGetActivityTypesByCategorySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetActivityTypesByCategoryQuery, GetActivityTypesByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetActivityTypesByCategoryQuery, GetActivityTypesByCategoryQueryVariables>(GetActivityTypesByCategoryDocument, options);
        }
export type GetActivityTypesByCategoryQueryHookResult = ReturnType<typeof useGetActivityTypesByCategoryQuery>;
export type GetActivityTypesByCategoryLazyQueryHookResult = ReturnType<typeof useGetActivityTypesByCategoryLazyQuery>;
export type GetActivityTypesByCategorySuspenseQueryHookResult = ReturnType<typeof useGetActivityTypesByCategorySuspenseQuery>;
export type GetActivityTypesByCategoryQueryResult = Apollo.QueryResult<GetActivityTypesByCategoryQuery, GetActivityTypesByCategoryQueryVariables>;
export const GetActivityTypesByIdDocument = gql`
    query GetActivityTypesById($getActivityTypesById: Int!) {
  getActivityTypesById(id: $getActivityTypesById) {
    category
    id
    emissions
    name
    unit
    attributes {
      madeInFrance
      secondHandClothes
      secondHandPhones
    }
    vehicleAttributes {
      fuelType
      vehicleType
      vehicleDecade
      motoEngine
    }
  }
}
    `;

/**
 * __useGetActivityTypesByIdQuery__
 *
 * To run a query within a React component, call `useGetActivityTypesByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActivityTypesByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActivityTypesByIdQuery({
 *   variables: {
 *      getActivityTypesById: // value for 'getActivityTypesById'
 *   },
 * });
 */
export function useGetActivityTypesByIdQuery(baseOptions: Apollo.QueryHookOptions<GetActivityTypesByIdQuery, GetActivityTypesByIdQueryVariables> & ({ variables: GetActivityTypesByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetActivityTypesByIdQuery, GetActivityTypesByIdQueryVariables>(GetActivityTypesByIdDocument, options);
      }
export function useGetActivityTypesByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetActivityTypesByIdQuery, GetActivityTypesByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetActivityTypesByIdQuery, GetActivityTypesByIdQueryVariables>(GetActivityTypesByIdDocument, options);
        }
export function useGetActivityTypesByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetActivityTypesByIdQuery, GetActivityTypesByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetActivityTypesByIdQuery, GetActivityTypesByIdQueryVariables>(GetActivityTypesByIdDocument, options);
        }
export type GetActivityTypesByIdQueryHookResult = ReturnType<typeof useGetActivityTypesByIdQuery>;
export type GetActivityTypesByIdLazyQueryHookResult = ReturnType<typeof useGetActivityTypesByIdLazyQuery>;
export type GetActivityTypesByIdSuspenseQueryHookResult = ReturnType<typeof useGetActivityTypesByIdSuspenseQuery>;
export type GetActivityTypesByIdQueryResult = Apollo.QueryResult<GetActivityTypesByIdQuery, GetActivityTypesByIdQueryVariables>;
export const GetDonationsDocument = gql`
    query GetDonations {
  getDonations {
    id
    user {
      nickname
    }
    amount
    dateOfDonation
  }
}
    `;

/**
 * __useGetDonationsQuery__
 *
 * To run a query within a React component, call `useGetDonationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDonationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDonationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDonationsQuery(baseOptions?: Apollo.QueryHookOptions<GetDonationsQuery, GetDonationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDonationsQuery, GetDonationsQueryVariables>(GetDonationsDocument, options);
      }
export function useGetDonationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDonationsQuery, GetDonationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDonationsQuery, GetDonationsQueryVariables>(GetDonationsDocument, options);
        }
export function useGetDonationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetDonationsQuery, GetDonationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDonationsQuery, GetDonationsQueryVariables>(GetDonationsDocument, options);
        }
export type GetDonationsQueryHookResult = ReturnType<typeof useGetDonationsQuery>;
export type GetDonationsLazyQueryHookResult = ReturnType<typeof useGetDonationsLazyQuery>;
export type GetDonationsSuspenseQueryHookResult = ReturnType<typeof useGetDonationsSuspenseQuery>;
export type GetDonationsQueryResult = Apollo.QueryResult<GetDonationsQuery, GetDonationsQueryVariables>;
export const GetGraphActivitiesDocument = gql`
    query GetGraphActivities($userId: Float) {
  getGraphActivities(userId: $userId) {
    id
    starts_at
    category
    emissionPerMonth
  }
}
    `;

/**
 * __useGetGraphActivitiesQuery__
 *
 * To run a query within a React component, call `useGetGraphActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGraphActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGraphActivitiesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetGraphActivitiesQuery(baseOptions?: Apollo.QueryHookOptions<GetGraphActivitiesQuery, GetGraphActivitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGraphActivitiesQuery, GetGraphActivitiesQueryVariables>(GetGraphActivitiesDocument, options);
      }
export function useGetGraphActivitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGraphActivitiesQuery, GetGraphActivitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGraphActivitiesQuery, GetGraphActivitiesQueryVariables>(GetGraphActivitiesDocument, options);
        }
export function useGetGraphActivitiesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetGraphActivitiesQuery, GetGraphActivitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGraphActivitiesQuery, GetGraphActivitiesQueryVariables>(GetGraphActivitiesDocument, options);
        }
export type GetGraphActivitiesQueryHookResult = ReturnType<typeof useGetGraphActivitiesQuery>;
export type GetGraphActivitiesLazyQueryHookResult = ReturnType<typeof useGetGraphActivitiesLazyQuery>;
export type GetGraphActivitiesSuspenseQueryHookResult = ReturnType<typeof useGetGraphActivitiesSuspenseQuery>;
export type GetGraphActivitiesQueryResult = Apollo.QueryResult<GetGraphActivitiesQuery, GetGraphActivitiesQueryVariables>;
export const GetLikesDocument = gql`
    query GetLikes($postId: Float) {
  getLikes(postId: $postId) {
    id
    post {
      id
    }
    user {
      id
    }
  }
}
    `;

/**
 * __useGetLikesQuery__
 *
 * To run a query within a React component, call `useGetLikesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLikesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLikesQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetLikesQuery(baseOptions?: Apollo.QueryHookOptions<GetLikesQuery, GetLikesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLikesQuery, GetLikesQueryVariables>(GetLikesDocument, options);
      }
export function useGetLikesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLikesQuery, GetLikesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLikesQuery, GetLikesQueryVariables>(GetLikesDocument, options);
        }
export function useGetLikesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetLikesQuery, GetLikesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLikesQuery, GetLikesQueryVariables>(GetLikesDocument, options);
        }
export type GetLikesQueryHookResult = ReturnType<typeof useGetLikesQuery>;
export type GetLikesLazyQueryHookResult = ReturnType<typeof useGetLikesLazyQuery>;
export type GetLikesSuspenseQueryHookResult = ReturnType<typeof useGetLikesSuspenseQuery>;
export type GetLikesQueryResult = Apollo.QueryResult<GetLikesQuery, GetLikesQueryVariables>;
export const GetPersonalVehiclesDocument = gql`
    query GetPersonalVehicles($userId: Float) {
  getPersonalVehicles(userId: $userId) {
    id
    name
    vehicle_category
    vehicle_type
    fuel_type
    year_of_construction
    moto_engine
    created_at
    emissionByKm
    user {
      id
    }
  }
}
    `;

/**
 * __useGetPersonalVehiclesQuery__
 *
 * To run a query within a React component, call `useGetPersonalVehiclesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPersonalVehiclesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPersonalVehiclesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetPersonalVehiclesQuery(baseOptions?: Apollo.QueryHookOptions<GetPersonalVehiclesQuery, GetPersonalVehiclesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPersonalVehiclesQuery, GetPersonalVehiclesQueryVariables>(GetPersonalVehiclesDocument, options);
      }
export function useGetPersonalVehiclesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPersonalVehiclesQuery, GetPersonalVehiclesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPersonalVehiclesQuery, GetPersonalVehiclesQueryVariables>(GetPersonalVehiclesDocument, options);
        }
export function useGetPersonalVehiclesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPersonalVehiclesQuery, GetPersonalVehiclesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPersonalVehiclesQuery, GetPersonalVehiclesQueryVariables>(GetPersonalVehiclesDocument, options);
        }
export type GetPersonalVehiclesQueryHookResult = ReturnType<typeof useGetPersonalVehiclesQuery>;
export type GetPersonalVehiclesLazyQueryHookResult = ReturnType<typeof useGetPersonalVehiclesLazyQuery>;
export type GetPersonalVehiclesSuspenseQueryHookResult = ReturnType<typeof useGetPersonalVehiclesSuspenseQuery>;
export type GetPersonalVehiclesQueryResult = Apollo.QueryResult<GetPersonalVehiclesQuery, GetPersonalVehiclesQueryVariables>;
export const GetPostsDocument = gql`
    query GetPosts {
  getPosts {
    id
    title
    content
    imageUrl
    created_at
    nbOfLikes
    user {
      id
      nickname
    }
    likes {
      id
    }
  }
}
    `;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export function useGetPostsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsSuspenseQueryHookResult = ReturnType<typeof useGetPostsSuspenseQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const ProfileDocument = gql`
    query Profile {
  profile {
    id
    email
    nickname
    avatarUrl
    role
    firstName
    lastName
    posts {
      id
    }
    followers {
      id
      avatarUrl
    }
    following {
      id
      avatarUrl
    }
  }
}
    `;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export function useProfileSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileSuspenseQueryHookResult = ReturnType<typeof useProfileSuspenseQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const GetUserActivitiesDocument = gql`
    query GetUserActivities($limit: Int, $offset: Int, $orderBy: String, $orderDir: String, $name: String, $category: String!) {
  getUserActivities(
    limit: $limit
    offset: $offset
    orderBy: $orderBy
    orderDir: $orderDir
    name: $name
    category: $category
  ) {
    id
    name
    quantity
    is_reccurent
    reccurence_interval
    reccurence_count
    starts_at
    ends_at
    user {
      nickname
    }
    is_secondhand
    is_made_in_france
    emissionPerMonth
    category
  }
}
    `;

/**
 * __useGetUserActivitiesQuery__
 *
 * To run a query within a React component, call `useGetUserActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserActivitiesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *      orderDir: // value for 'orderDir'
 *      name: // value for 'name'
 *      category: // value for 'category'
 *   },
 * });
 */
export function useGetUserActivitiesQuery(baseOptions: Apollo.QueryHookOptions<GetUserActivitiesQuery, GetUserActivitiesQueryVariables> & ({ variables: GetUserActivitiesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserActivitiesQuery, GetUserActivitiesQueryVariables>(GetUserActivitiesDocument, options);
      }
export function useGetUserActivitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserActivitiesQuery, GetUserActivitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserActivitiesQuery, GetUserActivitiesQueryVariables>(GetUserActivitiesDocument, options);
        }
export function useGetUserActivitiesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserActivitiesQuery, GetUserActivitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserActivitiesQuery, GetUserActivitiesQueryVariables>(GetUserActivitiesDocument, options);
        }
export type GetUserActivitiesQueryHookResult = ReturnType<typeof useGetUserActivitiesQuery>;
export type GetUserActivitiesLazyQueryHookResult = ReturnType<typeof useGetUserActivitiesLazyQuery>;
export type GetUserActivitiesSuspenseQueryHookResult = ReturnType<typeof useGetUserActivitiesSuspenseQuery>;
export type GetUserActivitiesQueryResult = Apollo.QueryResult<GetUserActivitiesQuery, GetUserActivitiesQueryVariables>;
export const GetUserByNicknameDocument = gql`
    query GetUserByNickname($nickname: String!) {
  getUserByNickname(nickname: $nickname) {
    id
    nickname
    firstName
    lastName
    avatarUrl
    posts {
      id
    }
    followers {
      id
      avatarUrl
    }
    following {
      id
      avatarUrl
    }
  }
}
    `;

/**
 * __useGetUserByNicknameQuery__
 *
 * To run a query within a React component, call `useGetUserByNicknameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByNicknameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByNicknameQuery({
 *   variables: {
 *      nickname: // value for 'nickname'
 *   },
 * });
 */
export function useGetUserByNicknameQuery(baseOptions: Apollo.QueryHookOptions<GetUserByNicknameQuery, GetUserByNicknameQueryVariables> & ({ variables: GetUserByNicknameQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByNicknameQuery, GetUserByNicknameQueryVariables>(GetUserByNicknameDocument, options);
      }
export function useGetUserByNicknameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByNicknameQuery, GetUserByNicknameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByNicknameQuery, GetUserByNicknameQueryVariables>(GetUserByNicknameDocument, options);
        }
export function useGetUserByNicknameSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserByNicknameQuery, GetUserByNicknameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserByNicknameQuery, GetUserByNicknameQueryVariables>(GetUserByNicknameDocument, options);
        }
export type GetUserByNicknameQueryHookResult = ReturnType<typeof useGetUserByNicknameQuery>;
export type GetUserByNicknameLazyQueryHookResult = ReturnType<typeof useGetUserByNicknameLazyQuery>;
export type GetUserByNicknameSuspenseQueryHookResult = ReturnType<typeof useGetUserByNicknameSuspenseQuery>;
export type GetUserByNicknameQueryResult = Apollo.QueryResult<GetUserByNicknameQuery, GetUserByNicknameQueryVariables>;
export const LikeAndDislikePostDocument = gql`
    mutation LikeAndDislikePost($postId: Float!) {
  likeAndDislikePost(postId: $postId)
}
    `;
export type LikeAndDislikePostMutationFn = Apollo.MutationFunction<LikeAndDislikePostMutation, LikeAndDislikePostMutationVariables>;

/**
 * __useLikeAndDislikePostMutation__
 *
 * To run a mutation, you first call `useLikeAndDislikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeAndDislikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeAndDislikePostMutation, { data, loading, error }] = useLikeAndDislikePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useLikeAndDislikePostMutation(baseOptions?: Apollo.MutationHookOptions<LikeAndDislikePostMutation, LikeAndDislikePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeAndDislikePostMutation, LikeAndDislikePostMutationVariables>(LikeAndDislikePostDocument, options);
      }
export type LikeAndDislikePostMutationHookResult = ReturnType<typeof useLikeAndDislikePostMutation>;
export type LikeAndDislikePostMutationResult = Apollo.MutationResult<LikeAndDislikePostMutation>;
export type LikeAndDislikePostMutationOptions = Apollo.BaseMutationOptions<LikeAndDislikePostMutation, LikeAndDislikePostMutationVariables>;
export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($resetPasswordToken: String!, $data: ResetPasswordInput!) {
  resetPassword(resetPasswordToken: $resetPasswordToken, data: $data)
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      resetPasswordToken: // value for 'resetPasswordToken'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const ResetPasswordRequestDocument = gql`
    mutation ResetPasswordRequest($data: ResetPasswordRequestInput!) {
  resetPasswordRequest(data: $data)
}
    `;
export type ResetPasswordRequestMutationFn = Apollo.MutationFunction<ResetPasswordRequestMutation, ResetPasswordRequestMutationVariables>;

/**
 * __useResetPasswordRequestMutation__
 *
 * To run a mutation, you first call `useResetPasswordRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordRequestMutation, { data, loading, error }] = useResetPasswordRequestMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useResetPasswordRequestMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordRequestMutation, ResetPasswordRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordRequestMutation, ResetPasswordRequestMutationVariables>(ResetPasswordRequestDocument, options);
      }
export type ResetPasswordRequestMutationHookResult = ReturnType<typeof useResetPasswordRequestMutation>;
export type ResetPasswordRequestMutationResult = Apollo.MutationResult<ResetPasswordRequestMutation>;
export type ResetPasswordRequestMutationOptions = Apollo.BaseMutationOptions<ResetPasswordRequestMutation, ResetPasswordRequestMutationVariables>;
export const SearchUserDocument = gql`
    query SearchUser($name: String!) {
  searchUser(name: $name) {
    id
    firstName
    lastName
    avatarUrl
    nickname
  }
}
    `;

/**
 * __useSearchUserQuery__
 *
 * To run a query within a React component, call `useSearchUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUserQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSearchUserQuery(baseOptions: Apollo.QueryHookOptions<SearchUserQuery, SearchUserQueryVariables> & ({ variables: SearchUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchUserQuery, SearchUserQueryVariables>(SearchUserDocument, options);
      }
export function useSearchUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUserQuery, SearchUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchUserQuery, SearchUserQueryVariables>(SearchUserDocument, options);
        }
export function useSearchUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchUserQuery, SearchUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchUserQuery, SearchUserQueryVariables>(SearchUserDocument, options);
        }
export type SearchUserQueryHookResult = ReturnType<typeof useSearchUserQuery>;
export type SearchUserLazyQueryHookResult = ReturnType<typeof useSearchUserLazyQuery>;
export type SearchUserSuspenseQueryHookResult = ReturnType<typeof useSearchUserSuspenseQuery>;
export type SearchUserQueryResult = Apollo.QueryResult<SearchUserQuery, SearchUserQueryVariables>;
export const SignupDocument = gql`
    mutation Signup($data: NewUserInput!) {
  createUser(data: $data) {
    id
    nickname
    email
    avatarUrl
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const ToggleBlockUserDocument = gql`
    mutation ToggleBlockUser($userIds: [Int!]!) {
  toggleBlockUser(userIds: $userIds)
}
    `;
export type ToggleBlockUserMutationFn = Apollo.MutationFunction<ToggleBlockUserMutation, ToggleBlockUserMutationVariables>;

/**
 * __useToggleBlockUserMutation__
 *
 * To run a mutation, you first call `useToggleBlockUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleBlockUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleBlockUserMutation, { data, loading, error }] = useToggleBlockUserMutation({
 *   variables: {
 *      userIds: // value for 'userIds'
 *   },
 * });
 */
export function useToggleBlockUserMutation(baseOptions?: Apollo.MutationHookOptions<ToggleBlockUserMutation, ToggleBlockUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleBlockUserMutation, ToggleBlockUserMutationVariables>(ToggleBlockUserDocument, options);
      }
export type ToggleBlockUserMutationHookResult = ReturnType<typeof useToggleBlockUserMutation>;
export type ToggleBlockUserMutationResult = Apollo.MutationResult<ToggleBlockUserMutation>;
export type ToggleBlockUserMutationOptions = Apollo.BaseMutationOptions<ToggleBlockUserMutation, ToggleBlockUserMutationVariables>;
export const UnfollowDocument = gql`
    mutation Unfollow($userId: Float!) {
  unfollow(userId: $userId) {
    id
  }
}
    `;
export type UnfollowMutationFn = Apollo.MutationFunction<UnfollowMutation, UnfollowMutationVariables>;

/**
 * __useUnfollowMutation__
 *
 * To run a mutation, you first call `useUnfollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowMutation, { data, loading, error }] = useUnfollowMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUnfollowMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowMutation, UnfollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfollowMutation, UnfollowMutationVariables>(UnfollowDocument, options);
      }
export type UnfollowMutationHookResult = ReturnType<typeof useUnfollowMutation>;
export type UnfollowMutationResult = Apollo.MutationResult<UnfollowMutation>;
export type UnfollowMutationOptions = Apollo.BaseMutationOptions<UnfollowMutation, UnfollowMutationVariables>;
export const UpdateActivityTypeDocument = gql`
    mutation UpdateActivityType($activityTypeId: Float!, $data: UpdateActivityTypeInput!) {
  updateActivityType(ActivityTypeId: $activityTypeId, data: $data) {
    id
    emissions
    unit
    category
    vehicleAttributes {
      fuelType
      vehicleType
      vehicleDecade
      motoEngine
    }
    attributes {
      madeInFrance
      secondHandClothes
      secondHandPhones
    }
  }
}
    `;
export type UpdateActivityTypeMutationFn = Apollo.MutationFunction<UpdateActivityTypeMutation, UpdateActivityTypeMutationVariables>;

/**
 * __useUpdateActivityTypeMutation__
 *
 * To run a mutation, you first call `useUpdateActivityTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateActivityTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateActivityTypeMutation, { data, loading, error }] = useUpdateActivityTypeMutation({
 *   variables: {
 *      activityTypeId: // value for 'activityTypeId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateActivityTypeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateActivityTypeMutation, UpdateActivityTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateActivityTypeMutation, UpdateActivityTypeMutationVariables>(UpdateActivityTypeDocument, options);
      }
export type UpdateActivityTypeMutationHookResult = ReturnType<typeof useUpdateActivityTypeMutation>;
export type UpdateActivityTypeMutationResult = Apollo.MutationResult<UpdateActivityTypeMutation>;
export type UpdateActivityTypeMutationOptions = Apollo.BaseMutationOptions<UpdateActivityTypeMutation, UpdateActivityTypeMutationVariables>;
export const UpdatePersonalVehicleDocument = gql`
    mutation UpdatePersonalVehicle($data: UpdatePersonalVehicleInput!, $personalVehicleId: Float!) {
  updatePersonalVehicle(data: $data, personalVehicleId: $personalVehicleId) {
    id
    name
    vehicle_category
    vehicle_type
    year_of_construction
    fuel_type
    moto_engine
    created_at
    user {
      id
    }
  }
}
    `;
export type UpdatePersonalVehicleMutationFn = Apollo.MutationFunction<UpdatePersonalVehicleMutation, UpdatePersonalVehicleMutationVariables>;

/**
 * __useUpdatePersonalVehicleMutation__
 *
 * To run a mutation, you first call `useUpdatePersonalVehicleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePersonalVehicleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePersonalVehicleMutation, { data, loading, error }] = useUpdatePersonalVehicleMutation({
 *   variables: {
 *      data: // value for 'data'
 *      personalVehicleId: // value for 'personalVehicleId'
 *   },
 * });
 */
export function useUpdatePersonalVehicleMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePersonalVehicleMutation, UpdatePersonalVehicleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePersonalVehicleMutation, UpdatePersonalVehicleMutationVariables>(UpdatePersonalVehicleDocument, options);
      }
export type UpdatePersonalVehicleMutationHookResult = ReturnType<typeof useUpdatePersonalVehicleMutation>;
export type UpdatePersonalVehicleMutationResult = Apollo.MutationResult<UpdatePersonalVehicleMutation>;
export type UpdatePersonalVehicleMutationOptions = Apollo.BaseMutationOptions<UpdatePersonalVehicleMutation, UpdatePersonalVehicleMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($data: UpdatePostInput!, $postId: Float!) {
  updatePost(data: $data, postId: $postId) {
    id
    title
    content
    imageUrl
    nbOfLikes
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      data: // value for 'data'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($data: UpdateUserInput!) {
  updateProfile(data: $data) {
    id
    email
    nickname
    firstName
    lastName
    avatarUrl
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;