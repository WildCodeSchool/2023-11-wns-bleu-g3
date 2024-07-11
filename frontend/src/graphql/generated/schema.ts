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
  activityType: ActivityType;
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
  activities: Array<Activity>;
  attributes: Attr;
  category: Scalars['String'];
  emissions: Scalars['Float'];
  id: Scalars['Int'];
  name: Scalars['String'];
  unit: Scalars['String'];
  vehicleAttributes?: Maybe<Vehicle_Attr>;
};

export type ActivityTypeInput = {
  attributes: Attr_Input;
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
  madeInFrance?: InputMaybe<Scalars['Boolean']>;
  secondHandClothes?: InputMaybe<Scalars['Boolean']>;
  secondHandPhones?: InputMaybe<Scalars['Boolean']>;
};

export type LoginInput = {
  emailOrNickname: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmEmail: Scalars['Boolean'];
  createActivity: Activity;
  createActivityType: ActivityType;
  createUser: User;
  deleteActivityType: Scalars['String'];
  deleteProfile: Scalars['String'];
  login: Scalars['String'];
  logout: Scalars['String'];
  resetPassword: Scalars['Boolean'];
  resetPasswordRequest: Scalars['Boolean'];
  updateActivityType: ActivityType;
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


export type MutationCreateUserArgs = {
  data: NewUserInput;
};


export type MutationDeleteActivityTypeArgs = {
  ActivityTypeId: Scalars['Float'];
};


export type MutationDeleteProfileArgs = {
  userId: Scalars['Float'];
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


export type MutationUpdateActivityTypeArgs = {
  ActivityTypeId: Scalars['Float'];
  data: UpdateActivityTypeInput;
};


export type MutationUpdateProfileArgs = {
  data: UpdateUserInput;
};

export type NewActivityInput = {
  activityType: ObjectId;
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

export type NewUserInput = {
  email: Scalars['String'];
  nickname: Scalars['String'];
  password: Scalars['String'];
};

export type ObjectId = {
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  MotoEngine: Array<Scalars['String']>;
  getActivities: Array<Activity>;
  getActivitiesTypes: Array<ActivityType>;
  getActivitiesTypesPagination: Array<ActivityType>;
  getActivityTypesById: ActivityType;
  getCategories: Array<Scalars['String']>;
  getFuelTypes: Array<Scalars['String']>;
  getUnits: Array<Scalars['String']>;
  getVehicleDecade: Array<Scalars['String']>;
  getVehicleTypes: Array<Scalars['String']>;
  profile: User;
};


export type QueryGetActivitiesArgs = {
  userId?: InputMaybe<Scalars['Float']>;
};


export type QueryGetActivitiesTypesPaginationArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetActivityTypesByIdArgs = {
  id: Scalars['Int'];
};

export type ResetPasswordInput = {
  password: Scalars['String'];
};

export type ResetPasswordRequestInput = {
  email: Scalars['String'];
};

export type UpdateActivityTypeInput = {
  attributes: Attr_Input;
  category: Scalars['String'];
  emissions: Scalars['Float'];
  unit: Scalars['String'];
  vehicleAttributes?: InputMaybe<Vehicle_Attr_Input>;
};

export type UpdateUserInput = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  activities: Array<Activity>;
  avatarUrl?: Maybe<Scalars['String']>;
  blocked: Scalars['Boolean'];
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  lastName?: Maybe<Scalars['String']>;
  nickname: Scalars['String'];
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

export type ConfirmEmailMutationVariables = Exact<{
  emailToken: Scalars['String'];
}>;


export type ConfirmEmailMutation = { __typename?: 'Mutation', confirmEmail: boolean };

export type DeleteProfileMutationVariables = Exact<{
  userId: Scalars['Float'];
}>;


export type DeleteProfileMutation = { __typename?: 'Mutation', deleteProfile: string };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', id: number, email: string, nickname: string, avatarUrl?: string | null, role: string, firstName?: string | null, lastName?: string | null } };

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

export type SignupMutationVariables = Exact<{
  data: NewUserInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number, nickname: string, email: string, avatarUrl?: string | null } };

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
export const DeleteProfileDocument = gql`
    mutation DeleteProfile($userId: Float!) {
  deleteProfile(userId: $userId)
}
    `;
export type DeleteProfileMutationFn = Apollo.MutationFunction<DeleteProfileMutation, DeleteProfileMutationVariables>;

/**
 * __useDeleteProfileMutation__
 *
 * To run a mutation, you first call `useDeleteProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProfileMutation, { data, loading, error }] = useDeleteProfileMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteProfileMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProfileMutation, DeleteProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProfileMutation, DeleteProfileMutationVariables>(DeleteProfileDocument, options);
      }
export type DeleteProfileMutationHookResult = ReturnType<typeof useDeleteProfileMutation>;
export type DeleteProfileMutationResult = Apollo.MutationResult<DeleteProfileMutation>;
export type DeleteProfileMutationOptions = Apollo.BaseMutationOptions<DeleteProfileMutation, DeleteProfileMutationVariables>;
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