import { SequenceType } from './slices/GameSlice';
import Decks, { CardType, isTriple, isSequence, getSequence } from '../cards/helpers/Decks'
import { getNextSublist } from '../helpers/combinatorics';

type MoveType = {
    cardIds: string[],
    sequenceId: string | null,
};
export default class Player {
    static getNextPlay(hand: CardType[], sequences: SequenceType[]): MoveType | null {
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
                    };
                }
            });
        });

        // try to create a new sequence
        if (hand.length < 3 || move) {
            return move;
        }
        // get all triples until find a move or no more triples
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
                }
            }
        }

        return null;
    }
}