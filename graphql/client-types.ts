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
  /** Date custom scalar type */
  Date: any;
};

export type Account = {
  __typename?: 'Account';
  bank: Bank;
  id?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  total_amount: Scalars['Float'];
  user: User;
};

export type Bank = {
  __typename?: 'Bank';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int'];
  value: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: Account;
  createBank: Bank;
  createCategory: Category;
  createTag: Tag;
};


export type MutationCreateAccountArgs = {
  bankId: Scalars['Int'];
  name: Scalars['String'];
  total_amount?: InputMaybe<Scalars['Float']>;
};


export type MutationCreateBankArgs = {
  name: Scalars['String'];
};


export type MutationCreateCategoryArgs = {
  value: Scalars['String'];
};


export type MutationCreateTagArgs = {
  value: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  bank?: Maybe<Bank>;
  banks?: Maybe<Array<Maybe<Bank>>>;
  categories: Array<Maybe<Category>>;
  tags?: Maybe<Array<Maybe<Tag>>>;
};


export type QueryBankArgs = {
  name?: InputMaybe<Scalars['String']>;
};

export type Tag = {
  __typename?: 'Tag';
  id?: Maybe<Scalars['Int']>;
  value: Scalars['String'];
};

export type Transaction = {
  __typename?: 'Transaction';
  account: Account;
  amount: Scalars['Float'];
  category?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  tags: Array<Maybe<Tag>>;
  type?: Maybe<TransactionType>;
  user: User;
};

export enum TransactionType {
  Debit = 'DEBIT',
  Profit = 'PROFIT'
}

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  total_amount?: Maybe<Scalars['Float']>;
};

export type GetBankQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GetBankQuery = { __typename?: 'Query', bank?: { __typename?: 'Bank', name: string, id: number } | null };

export type GetBanksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBanksQuery = { __typename?: 'Query', banks?: Array<{ __typename?: 'Bank', id: number, name: string } | null> | null };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', value: string } | null> };

export type CreateAccountMutationVariables = Exact<{
  name: Scalars['String'];
  total_amount?: InputMaybe<Scalars['Float']>;
  bankId: Scalars['Int'];
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'Account', id?: number | null, name: string } };

export type CreateBankMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateBankMutation = { __typename?: 'Mutation', createBank: { __typename?: 'Bank', id: number, name: string } };


export const GetBankDocument = gql`
    query GetBank($name: String!) {
  bank(name: $name) {
    name
    id
  }
}
    `;

/**
 * __useGetBankQuery__
 *
 * To run a query within a React component, call `useGetBankQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBankQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBankQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetBankQuery(baseOptions: Apollo.QueryHookOptions<GetBankQuery, GetBankQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBankQuery, GetBankQueryVariables>(GetBankDocument, options);
      }
export function useGetBankLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBankQuery, GetBankQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBankQuery, GetBankQueryVariables>(GetBankDocument, options);
        }
export type GetBankQueryHookResult = ReturnType<typeof useGetBankQuery>;
export type GetBankLazyQueryHookResult = ReturnType<typeof useGetBankLazyQuery>;
export type GetBankQueryResult = Apollo.QueryResult<GetBankQuery, GetBankQueryVariables>;
export const GetBanksDocument = gql`
    query GetBanks {
  banks {
    id
    name
  }
}
    `;

/**
 * __useGetBanksQuery__
 *
 * To run a query within a React component, call `useGetBanksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBanksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBanksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBanksQuery(baseOptions?: Apollo.QueryHookOptions<GetBanksQuery, GetBanksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBanksQuery, GetBanksQueryVariables>(GetBanksDocument, options);
      }
export function useGetBanksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBanksQuery, GetBanksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBanksQuery, GetBanksQueryVariables>(GetBanksDocument, options);
        }
export type GetBanksQueryHookResult = ReturnType<typeof useGetBanksQuery>;
export type GetBanksLazyQueryHookResult = ReturnType<typeof useGetBanksLazyQuery>;
export type GetBanksQueryResult = Apollo.QueryResult<GetBanksQuery, GetBanksQueryVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories {
  categories {
    value
  }
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
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const CreateAccountDocument = gql`
    mutation createAccount($name: String!, $total_amount: Float, $bankId: Int!) {
  createAccount(name: $name, bankId: $bankId, total_amount: $total_amount) {
    id
    name
  }
}
    `;
export type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      name: // value for 'name'
 *      total_amount: // value for 'total_amount'
 *      bankId: // value for 'bankId'
 *   },
 * });
 */
export function useCreateAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, options);
      }
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;
export const CreateBankDocument = gql`
    mutation createBank($name: String!) {
  createBank(name: $name) {
    id
    name
  }
}
    `;
export type CreateBankMutationFn = Apollo.MutationFunction<CreateBankMutation, CreateBankMutationVariables>;

/**
 * __useCreateBankMutation__
 *
 * To run a mutation, you first call `useCreateBankMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBankMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBankMutation, { data, loading, error }] = useCreateBankMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateBankMutation(baseOptions?: Apollo.MutationHookOptions<CreateBankMutation, CreateBankMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBankMutation, CreateBankMutationVariables>(CreateBankDocument, options);
      }
export type CreateBankMutationHookResult = ReturnType<typeof useCreateBankMutation>;
export type CreateBankMutationResult = Apollo.MutationResult<CreateBankMutation>;
export type CreateBankMutationOptions = Apollo.BaseMutationOptions<CreateBankMutation, CreateBankMutationVariables>;