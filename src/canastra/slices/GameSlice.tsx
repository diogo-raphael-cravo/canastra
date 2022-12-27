import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CardType, isTriple, isSequence } from '../../cards/helpers/Decks'
import type { RootState } from '../../Store';

export const SEQUENCE_TYPE_ANY = 'any';
export const SEQUENCE_TYPE_TRIPLE = 'triple';
export const SEQUENCE_TYPE_SEQUENCE = 'sequence';
type SequenceType = {
    type: string,
    cards: CardType[],
    selectionColor: string,
};
interface GameSliceState {
  deck: CardType[],
  sequences: SequenceType[],
  hand: CardType[],
};

const initialState: GameSliceState = {
    deck: [],
    sequences: [{
        type: SEQUENCE_TYPE_ANY,
        cards: [],
        selectionColor: '',
    }],
    hand: [],
};

function getEmptySequence(sequences: SequenceType[]): SequenceType {
    return sequences[sequences.length - 1];
}

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
    selectCardInHand: (state, action: PayloadAction<string>) => {
        const card = state.hand.find(card => card.id === action.payload);
        if (!card) {
            throw new Error(`trying to select card ${action.payload} which is not in hand`);
        }
        if (card.selectionColor) {
            card.selectionColor = '';
        } else {
            card.selectionColor = 'lightblue';
        }

        const selectedCards = state.hand.filter(card => card.selectionColor);
        const emptySequence = getEmptySequence(state.sequences);
        if (isTriple(selectedCards) || isSequence(selectedCards)) {
            selectedCards.forEach(card => { card.selectionColor = 'lightgreen' });
            emptySequence.selectionColor = 'lightgreen';
        } else {
            selectedCards.forEach(card => { card.selectionColor = 'lightblue' });
            emptySequence.selectionColor = '';
        }
    }
  },
})

export const { setDeck, pickCard, selectCardInHand } = gameSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDeck = (state: RootState) => state.gameSlice.deck;
export const selectHand = (state: RootState) => state.gameSlice.hand;
export const selectSequences = (state: RootState) => state.gameSlice.sequences;

export default gameSlice.reducer;