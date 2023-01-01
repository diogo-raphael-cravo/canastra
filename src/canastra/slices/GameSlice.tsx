import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import { v4 } from 'uuid';

import Decks, { CardType, isTriple, isSequence, getSequence } from '../../cards/helpers/Decks'
import type { RootState } from '../../Store';

export const SEQUENCE_TYPE_ANY = 'any';
export const SEQUENCE_TYPE_TRIPLE = 'triple';
export const SEQUENCE_TYPE_SEQUENCE = 'sequence';
export type SequenceType = {
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
  pickedCard: boolean,
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
    pickedCard: false,
};

function getEmptySequence(sequences: SequenceType[]): SequenceType {
    const playerSequences = sequences.filter(sequence => sequence.playerTeam);
    return playerSequences[playerSequences.length - 1];
}

function doPickCard(state: WritableDraft<GameSliceState>) {
    if (0 === state.deck.length) {
        throw new Error('cannot pick when deck is empty');
    }
    const card = state.deck[state.deck.length - 1];
    state.deck = state.deck.slice(0, state.deck.length - 1);
    const player = state.players.find(player => player.id === state.currentPlayer);
    if (!player) {
        throw new Error(`could not find player with id ${state.currentPlayer}`);
    }
    player.hand = [...player.hand, card];
    if (state.currentPlayer === state.playerId) {
        player.hand.sort(Decks.sort);
    }
}
export const gameSlice = createSlice({
  name: 'gameSlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
    },
    startGame: (state, action: PayloadAction<number>) => {
        state.deck = [...Decks.SHUFFLED_DECK, ...Decks.SHUFFLED_DECK];
        const cardCountPerPlayer = 7;
        state.players.push({
            id: v4(),
            hand: state.deck.slice(0, cardCountPerPlayer),
            playerTeam: true,
        });
        state.players[0].hand.sort(Decks.sort);
        state.playerId = state.players[0].id;
        state.currentPlayer = state.players[0].id;
        doPickCard(state);
        state.pickedCard = false;
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
    pickCard: (state) => {
        if (state.currentPlayer === state.playerId) {
            if (state.pickedCard) {
                return;
            }
            state.pickedCard = true;
        }
        doPickCard(state);
    },
    // TODO: do not highlight when two joekrs
    selectCardInHand: (state, action: PayloadAction<string>) => {
        if (state.currentPlayer === state.playerId && !state.pickedCard) {
            return;
        }
        const player = state.players.find(player => player.id === state.currentPlayer);
        if (!player) {
            throw new Error(`could not find player with id ${state.currentPlayer}`);
        }
        const hand = player.hand;
        const card = hand.find(card => card.id === action.payload);
        if (!card) {
            throw new Error(`trying to select card ${action.payload} which is not in hand`);
        }
        if (card.selectionColor) {
            card.selectionColor = '';
        } else {
            card.selectionColor = 'lightblue';
        }

        if (state.currentPlayer !== state.playerId) {
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
        
        const playerSequences = state.sequences.filter(sequence => sequence.playerTeam === player.playerTeam);
        [...playerSequences].reverse().slice(1).reverse().forEach(sequence => {
            sequence.cards.forEach(card => { card.selectionColor = '' });
        });
        if (0 === selectedCards.length) {
            return;
        }
        [...playerSequences].reverse().slice(1).reverse().forEach(sequence => {
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
    moveSelectedHandToSequence: (state, action: PayloadAction<string | null>) => {
        const player = state.players.find(player => player.id === state.currentPlayer);
        if (!player) {
            throw new Error(`could not find player with id ${state.currentPlayer}`);
        }

        let selectedSequence: SequenceType | undefined;
        if (null === action.payload) {
            selectedSequence = {
                id: v4(),
                type: SEQUENCE_TYPE_ANY,
                cards: [],
                selectionColor: '',
                playerTeam: player.playerTeam,
            };
            state.sequences.push(selectedSequence);
        } else {
            selectedSequence = state.sequences.find(sequence => sequence.id === action.payload);
        }
        if (!selectedSequence) {
            throw new Error(`could not find sequence ${action.payload}`);
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
            if (player.playerTeam) {
                state.sequences.push({
                    id: v4(),
                    type: SEQUENCE_TYPE_ANY,
                    cards: [],
                    selectionColor: '',
                    playerTeam: true,
                });
            }
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
    discardCard: (state) => {
        const player = state.players.find(player => player.id === state.currentPlayer);
        if (!player) {
            throw new Error(`could not find player with id ${state.currentPlayer}`);
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

        if (state.currentPlayer === state.playerId) {
            state.pickedCard = false;
        }

        const currentPlayerIndex = state.players.findIndex(player => player.id === state.currentPlayer);
        if (state.players.length - 1 === currentPlayerIndex) {
            state.currentPlayer = state.players[0].id;
        } else {
            state.currentPlayer = state.players[currentPlayerIndex + 1].id;
        }
    },
    pickDiscarded: (state) => {
        if (0 === state.discardPile.cards.length) {
            return;
        }
        if (state.currentPlayer === state.playerId) {
            if (state.pickedCard) {
                return;
            }
            state.pickedCard = true;
        }
        const player = state.players.find(player => player.id === state.currentPlayer);
        if (!player) {
            throw new Error(`could not find player with id ${state.currentPlayer}`);
        }
        player.hand = [...player.hand, ...state.discardPile.cards];
        state.discardPile.cards = [];
        if (state.currentPlayer === state.playerId) {
            player.hand.sort(Decks.sort);
        }
    },
  },
})

export const { pickDiscarded, setLoading, discardCard, startGame, pickCard, selectCardInHand, moveSelectedHandToSequence } = gameSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDeck = (state: RootState) => state.gameSlice.deck;
export const selectSequences = (state: RootState) => state.gameSlice.sequences;
export const selectDiscardPile = (state: RootState) => state.gameSlice.discardPile;
export const selectPlayers = (state: RootState) => state.gameSlice.players;
export const selectPlayerId = (state: RootState) => state.gameSlice.playerId;
export const selectCurrentPlayer = (state: RootState) => state.gameSlice.currentPlayer;
export const selectLoading = (state: RootState) => state.gameSlice.loading;

export default gameSlice.reducer;