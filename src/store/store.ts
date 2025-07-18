import { configureStore } from '@reduxjs/toolkit';

import githubApi from './githubApi';
import RepositoriesSlice from './repositoriesSlice';

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    repositories: RepositoriesSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(githubApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
