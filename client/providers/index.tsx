'use client';
import { PropsWithChildren } from 'react';
import RouteProgress from './RouterProgress';
import { Provider } from 'react-redux';
import { persistor, store } from '@/redux/store';
import NextAuthProvider from './NextAuthProvider';
import { Toaster } from 'react-hot-toast';
import { PersistGate } from 'redux-persist/integration/react';

function AppProviders({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <NextAuthProvider> */}
        <RouteProgress />
        {children}
        <Toaster position="top-center" reverseOrder={false} />
        {/* </NextAuthProvider> */}
      </PersistGate>
    </Provider>
  );
}

export default AppProviders;
