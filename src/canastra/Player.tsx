import { SequenceType } from './slices/GameSlice';
import { CardType, isTriple, isSequence } from '../cards/helpers/Decks'
import { getNextSublist } from '../helpers/combinatorics';

type MoveType = {
    cardIds: string[],
    sequenceId: string | null,
    pickDiscardedPile: boolean,
};
function tryToMakeNewSequence(hand: CardType[]): MoveType | null {
    const handIds = hand.map(card => card.id);
    let exhaustedAllPossibilities = false;
    let nextSublist: string[] | null | undefined = undefined;
    while (!exhaustedAllPossibilities) {
        nextSublist = getNextSublist(handIds, 3, nextSublist);
        if (null === nextSublist) {
            exhaustedAllPossibilities = true;
            break;
        }
        const cards = nextSublist.map(cardId => {
            const card = hand.find(card => card.id === cardId);
            if (!card) {
                throw new Error(`could not find card ${cardId}`);
            }
            return card;
        });
        if (isTriple(cards) || isSequence(cards)) {
            return {
                cardIds: [...nextSublist],
                sequenceId: null,
                pickDiscardedPile: false,
            };
        }
    }
    return null;
}
export default class Player {
    static getNextPlay(hand: CardType[], sequences: SequenceType[], peekDiscarded: CardType | null): MoveType | null {
        let move: MoveType | null = null;
        
        // try to place one card in one sequence
        sequences.forEach(sequence => {
            hand.forEach(card => {
                if (null !== move) {
                    return;
                }
                if (isTriple([card, ...sequence.cards]) || isSequence([card, ...sequence.cards])) {
                    move = {
                        cardIds: [card.id],
                        sequenceId: sequence.id,
                        pickDiscardedPile: false,
                    };
                }
            });
            if (null !== move && peekDiscarded) {
                if (isTriple([peekDiscarded, ...sequence.cards]) || isSequence([peekDiscarded, ...sequence.cards])) {
                    move = {
                        cardIds: [],
                        sequenceId: sequence.id,
                        pickDiscardedPile: true,
                    };
                }
            }
        });

        if (hand.length === 2 && peekDiscarded) {
            // try to pick discarded pile
            move = tryToMakeNewSequence([...hand, peekDiscarded]);
            if (move) {
                return {
                    ...move,
                    pickDiscardedPile: true,
                };
            }
        }

        // try to create a new sequence
        if (hand.length < 3 || move) {
            return move;
        }
        // get all triples until find a move or no more triples
        move = tryToMakeNewSequence(hand);
        if (move) {
            return move;
        }
        
        // try to pick discarded pile
        if (peekDiscarded) {
            move = tryToMakeNewSequence([...hand, peekDiscarded]);
            if (move) {
                return {
                    ...move,
                    pickDiscardedPile: true,
                };
            }
        }

        return null;
    }
}