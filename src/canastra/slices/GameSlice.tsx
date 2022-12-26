import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CardType } from '../../cards/constants/Decks'
import type { RootState } from '../../Store';

interface GameSliceState {
  deck: CardType[],
  hand: CardType[],
};

const initialState: GameSliceState = {
    deck: [],
    hand: [],
};

export const gameSlice = createSlice({
  name: 'gameSlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setDeck: (state, action: PayloadAction<CardType[]>) => {
        state.deck = action.payload;
    },
    pickCard: (state) => {
        const card = state.deck[state.deck.length - 1];
        state.hand = [...state.hand, card];
        state.deck = state.deck.slice(0, state.deck.length - 1);
    },
  },
})

export const { setDeck, pickCard } = gameSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDeck = (state: RootState) => state.gameSlice.deck;
export const selectHand = (state: RootState) => state.gameSlice.hand;

export default gameSlice.reducer;