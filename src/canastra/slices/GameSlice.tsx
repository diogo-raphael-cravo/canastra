import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

import Decks, { CardType, isTriple, isSequence, getSequence } from '../../cards/helpers/Decks'
import type { RootState } from '../../Store';

export const SEQUENCE_TYPE_ANY = 'any';
export const SEQUENCE_TYPE_TRIPLE = 'triple';
export const SEQUENCE_TYPE_SEQUENCE = 'sequence';
type SequenceType = {
    id: string,
    type: string,
    cards: CardType[],
    selectionColor: string,
    playerTeam: boolean,
};
type PlayerType = {
    id: string,
    hand: CardType[],
    playerTeam: boolean,
};

export interface GameSliceState {
  deck: CardType[],
  sequences: SequenceType[],
  discardPile: SequenceType,
  players: PlayerType[],
  playerId: string,
  currentPlayer: string,
  loading: boolean,
};

const initialState: GameSliceState = {
    deck: [],
    sequences: [{
        id: v4(),
        type: SEQUENCE_TYPE_ANY,
        cards: [],
        selectionColor: '',
        playerTeam: true,
    }],
    discardPile: {
        id: v4(),
        type: SEQUENCE_TYPE_ANY,
        cards: [],
        selectionColor: '',
        playerTeam: false,
    },
    players: [],
    playerId: '',
    currentPlayer: '',
    loading: false,
};

function getEmptySequence(sequences: SequenceType[]): SequenceType {
    const playerSequences = sequences.filter(sequence => sequence.playerTeam);
    return playerSequences[playerSequences.length - 1];
}

export type HandMovementType = {
    playerId: string,
    sequenceId: string,
    cardId: string,
};
export type HandSelectionType = {
    playerId: string,
    cardId: string,
};
export const gameSlice = createSlice({
  name: 'gameSlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
    },
    startGame: (state, action: PayloadAction<number>) => {
        state.deck = [...Decks.SHUFFLED_DECK];
        const cardCountPerPlayer = 7;
        state.players.push({
            id: v4(),
            hand: state.deck.slice(0, cardCountPerPlayer),
            playerTeam: true,
        });
        state.playerId = state.players[0].id;
        state.currentPlayer = state.players[0].id;
        const playerCount = action.payload;
        for (let i = 1; i < playerCount; i++) {
            const initialCardIndex = cardCountPerPlayer * i;
            state.players.push({
                id: v4(),
                hand: state.deck.slice(initialCardIndex, initialCardIndex + cardCountPerPlayer),
                playerTeam: false, // TODO: alternate teams
            });
        }
        state.deck = state.deck.slice(cardCountPerPlayer * playerCount, state.deck.length);
    },
    pickCard: (state, action: PayloadAction<string>) => {
        if (0 === state.deck.length) {
            throw new Error('cannot pick when deck is empty');
        }
        const card = state.deck[state.deck.length - 1];
        state.deck = state.deck.slice(0, state.deck.length - 1);
        const playerId = action.payload;
        const player = state.players.find(player => player.id === playerId);
        if (!player) {
            throw new Error(`could not find player with id ${playerId}`);
        }
        player.hand = [...player.hand, card];
    },
    // TODO: do not highlight when two joekrs
    selectCardInHand: (state, action: PayloadAction<HandSelectionType>) => {
        const player = state.players.find(player => player.id === action.payload.playerId);
        if (!player) {
            throw new Error(`could not find player with id ${action.payload.playerId}`);
        }
        const hand = player.hand;
        const card = hand.find(card => card.id === action.payload.cardId);
        if (!card) {
            throw new Error(`trying to select card ${action.payload.cardId} which is not in hand`);
        }
        if (card.selectionColor) {
            card.selectionColor = '';
        } else {
            card.selectionColor = 'lightblue';
        }

        if (action.payload.playerId !== state.playerId) {
            return;
        }
        const selectedCards = hand.filter(card => card.selectionColor);

        if (1 === selectedCards.length) {
            state.discardPile.selectionColor = 'lightgreen';
        } else {
            state.discardPile.selectionColor = '';
        }

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
        const player = state.players.find(player => player.id === action.payload.playerId);
        if (!player) {
            throw new Error(`could not find player with id ${action.payload.playerId}`);
        }
        const selectedSequence = state.sequences.find(sequence => sequence.id === action.payload.sequenceId);
        if (!selectedSequence) {
            throw new Error(`could not find sequence ${action.payload.sequenceId}`);
        }
        const selectedCards = player.hand.filter(card => card.selectionColor);

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
                playerTeam: true,
            });
        }

        player.hand = player.hand.filter(card => !card.selectionColor);
        selectedSequence.cards.push(...selectedCards);
        selectedCards.forEach(card => { card.selectionColor = '' });
        selectedSequence.cards.forEach(card => { card.selectionColor = '' });

        const sequenceOfCards = getSequence(selectedSequence.cards);
        if (null !== sequenceOfCards) {
            selectedSequence.cards = sequenceOfCards;
        }

        state.discardPile.selectionColor = '';
    },
    discardCard: (state, action: PayloadAction<string>) => {
        const player = state.players.find(player => player.id === action.payload);
        if (!player) {
            throw new Error(`could not find player with id ${action.payload}`);
        }
        const selectedCards = player.hand.filter(card => card.selectionColor);
        if (1 !== selectedCards.length) {
            return;
        }
        const discardedCard = selectedCards[0];
        
        player.hand = player.hand.filter(card => !card.selectionColor);
        state.discardPile.cards.push(discardedCard);
        
        discardedCard.selectionColor = '';
        state.discardPile.selectionColor = '';

        const currentPlayerIndex = state.players.findIndex(player => player.id === state.currentPlayer);
        if (state.players.length - 1 === currentPlayerIndex) {
            state.currentPlayer = state.players[0].id;
        } else {
            state.currentPlayer = state.players[currentPlayerIndex + 1].id;
        }
    }
  },
})

export const { setLoading, discardCard, startGame, pickCard, selectCardInHand, moveSelectedHandToSequence } = gameSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDeck = (state: RootState) => state.gameSlice.deck;
export const selectSequences = (state: RootState) => state.gameSlice.sequences;
export const selectDiscardPile = (state: RootState) => state.gameSlice.discardPile;
export const selectPlayers = (state: RootState) => state.gameSlice.players;
export const selectPlayerId = (state: RootState) => state.gameSlice.playerId;
export const selectCurrentPlayer = (state: RootState) => state.gameSlice.currentPlayer;
export const selectLoading = (state: RootState) => state.gameSlice.loading;

export default gameSlice.reducer;