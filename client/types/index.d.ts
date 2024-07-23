import {
  MutationActionCreatorResult,
  QueryActionCreatorResult,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  MutationActionCreatorResult,
  MutationDefinition,
  QueryActionCreatorResult,
  QueryDefinition,
} from '@reduxjs/toolkit/query';

type TQueryActionCreatorResult = QueryActionCreatorResult<
  QueryDefinition<
    unknown,
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    TApiTag,
    unknown,
    'api'
  >
>;

type TMutationActionCreatorResult = MutationActionCreatorResult<
  MutationDefinition<
    unknown, // Argument type for the mutation
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>, // Base query function type
    TApiTag, // Tags used for invalidation
    unknown, // Mutation response type
    'api' // Reducer path
  >
>;

type ApiResponse<T> = {
  message: string;
  status: boolean;
  data: T;
};

type TApiTag = 'Users' | 'User' | 'Todo' | 'Todos';

type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  dateJoin: Date;
};

type AuthState = {
  user: User | null;
  token: string;
};

type Todo = {
  _id: string;
  title: string;
  completed: boolean;
  desc: string;
  username: string;
  date: date;
};

type TodoState = {
  selectedTodo: Todo | null;
  todos: Todo[];
};
