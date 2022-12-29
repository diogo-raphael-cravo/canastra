import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

import { CardType, isTriple, isSequence, getSequence } from '../../cards/helpers/Decks'
import type { RootState } from '../../Store';

export const SEQUENCE_TYPE_ANY = 'any';
export const SEQUENCE_TYPE_TRIPLE = 'triple';
export const SEQUENCE_TYPE_SEQUENCE = 'sequence';
type SequenceType = {
    id: string,
    type: string,
    cards: CardType[],
    selectionColor: string,
};
export interface GameSliceState {
  deck: CardType[],
  sequences: SequenceType[],
  hand: CardType[],
};

const initialState: GameSliceState = {
    deck: [],
    sequences: [{
        id: v4(),
        type: SEQUENCE_TYPE_ANY,
        cards: [],
        selectionColor: '',
    }],
    hand: [],
};

function getEmptySequence(sequences: SequenceType[]): SequenceType {
    return sequences[sequences.length - 1];
}

type HandMovementType = {
    sequenceId: string,
    cardId: string,
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
        if (0 === state.deck.length) {
            throw new Error('cannot pick when deck is empty');
        }
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
        
        [...state.sequences].reverse().slice(1).reverse().forEach(sequence => {
            sequence.cards.forEach(card => { card.selectionColor = '' });
        });
        if (0 === selectedCards.length) {
            return;
        }
        [...state.sequences].reverse().slice(1).reverse().forEach(sequence => {
            if (sequence.type === SEQUENCE_TYPE_TRIPLE) {
                if (isTriple([...selectedCards, ...sequence.cards])) {
                    sequence.cards[0].selectionColor = 'lightgreen';
                    selectedCards.forEach(card => { card.selectionColor = 'lightgreen' });
                }
            }
            if (sequence.type === SEQUENCE_TYPE_SEQUENCE) {
                if (1 === selectedCards.length) {
                    if (isSequence([...selectedCards, sequence.cards[0], sequence.cards[1]])) {
                        sequence.cards[0].selectionColor = 'lightgreen';
                        selectedCards.forEach(card => { card.selectionColor = 'lightgreen' });
                    }
                    if (isSequence([...selectedCards, sequence.cards[sequence.cards.length - 1], sequence.cards[sequence.cards.length - 2]])) {
                        sequence.cards[sequence.cards.length - 1].selectionColor = 'lightgreen';
                        selectedCards.forEach(card => { card.selectionColor = 'lightgreen' });
                    }
                } else {
                    if (isSequence([...selectedCards, sequence.cards[0]])) {
                        sequence.cards[0].selectionColor = 'lightgreen';
                        selectedCards.forEach(card => { card.selectionColor = 'lightgreen' });
                    }
                    if (isSequence([...selectedCards, sequence.cards[sequence.cards.length - 1]])) {
                        sequence.cards[sequence.cards.length - 1].selectionColor = 'lightgreen';
                        selectedCards.forEach(card => { card.selectionColor = 'lightgreen' });
                    }
                }
            }
        });
    },
    moveSelectedHandToSequence: (state, action: PayloadAction<HandMovementType>) => {
        const selectedSequence = state.sequences.find(sequence => sequence.id === action.payload.sequenceId);
        if (!selectedSequence) {
            throw new Error(`could not find sequence ${action.payload.sequenceId}`);
        }
        const selectedCards = state.hand.filter(card => card.selectionColor);

        if (!(isTriple([...selectedCards, ...selectedSequence.cards])
                && (SEQUENCE_TYPE_TRIPLE === selectedSequence.type
                    || SEQUENCE_TYPE_ANY === selectedSequence.type))
            && !(isSequence([...selectedCards, ...selectedSequence.cards])
                && (SEQUENCE_TYPE_SEQUENCE === selectedSequence.type
                    || SEQUENCE_TYPE_ANY === selectedSequence.type))) {
            return;
        }

        if (0 === selectedSequence.cards.length) {
            if (isTriple(selectedCards)) {
                selectedSequence.type = SEQUENCE_TYPE_TRIPLE;
            }
            if (isSequence(selectedCards)) {
                selectedSequence.type = SEQUENCE_TYPE_SEQUENCE;
            }
            state.sequences.push({
                id: v4(),
                type: SEQUENCE_TYPE_ANY,
                cards: [],
                selectionColor: '',
            });
        }

        state.hand = state.hand.filter(card => !card.selectionColor);
        selectedSequence.cards.push(...selectedCards);
        selectedCards.forEach(card => { card.selectionColor = '' });
        selectedSequence.cards.forEach(card => { card.selectionColor = '' });

        const sequenceOfCards = getSequence(selectedSequence.cards);
        if (null !== sequenceOfCards) {
            selectedSequence.cards = sequenceOfCards;
        }
    }
  },
})

export const { setDeck, pickCard, selectCardInHand, moveSelectedHandToSequence } = gameSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDeck = (state: RootState) => state.gameSlice.deck;
export const selectHand = (state: RootState) => state.gameSlice.hand;
export const selectSequences = (state: RootState) => state.gameSlice.sequences;

export default gameSlice.reducer;