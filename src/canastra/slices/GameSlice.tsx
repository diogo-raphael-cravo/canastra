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

type CardSelectionType = {
    cardId: string;
    selectionColor: string;
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
    selectCardInHand: (state, action: PayloadAction<CardSelectionType>) => {
        const card = state.hand.find(card => card.id === action.payload.cardId);
        if (!card) {
            throw new Error(`trying to select card ${action.payload.cardId} which is not in hand`);
        }
        if (card.selectionColor) {
            card.selectionColor = '';
        } else {
            card.selectionColor = action.payload.selectionColor;
        }
    }
  },
})

export const { setDeck, pickCard, selectCardInHand } = gameSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDeck = (state: RootState) => state.gameSlice.deck;
export const selectHand = (state: RootState) => state.gameSlice.hand;

export default gameSlice.reducer;