'use client';

import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './features/api/apiSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { reducer } from './root-reducer';



const rootPersistConfig: any = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  //transforms: [loadSubsetFilter],
};

const persistedReducer = persistReducer(rootPersistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true, // for redux devtools to be change to false before deployment
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
  
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware);
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
