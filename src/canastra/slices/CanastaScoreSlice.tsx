import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../Store';

export interface CanastaScoreSliceState {
    showScore: boolean,
};

const initialState: CanastaScoreSliceState = {
  showScore: false,
};
export const canastaScoreSlice = createSlice({
  name: 'canastaScoreSlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setShowScore: (state, action: PayloadAction<boolean>) => {
        state.showScore = action.payload;
    },
  },
})

export const { setShowScore } = canastaScoreSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectShowScore = (state: RootState) => state.canastaScoreSlice.showScore;

export default canastaScoreSlice.reducer;