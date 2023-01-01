import { configureStore } from '@reduxjs/toolkit';

import GameSlice from './canastra/slices/GameSlice';
import CanastaScoreSlice from './canastra/slices/CanastaScoreSlice';

export const store = configureStore({
  reducer: {
    gameSlice: GameSlice,
    canastaScoreSlice: CanastaScoreSlice,
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;