import CardNames from './CardNames';
import CardSuits from './CardSuits';
import { v4 } from 'uuid';

export function isTriple(cards: CardType[]): boolean {
  const withoutJoker = cards.filter(card => !CardNames.isJoker(card.name));
  return 3 <= cards.length &&
    withoutJoker.every(card => (card.name === withoutJoker[0].name) || CardNames.isJoker(card.name));
}
export function isSequence(cards: CardType[]): boolean {
  const sortedCards: CardType[] = [...cards];
  sortedCards.sort(Decks.sort);
  const sortedWithoutJoker = sortedCards.filter(card => !CardNames.isJoker(card.name));
  return 3 <= cards.length &&
    sortedWithoutJoker.every(card => card.suit === sortedWithoutJoker[0].suit) &&
    sortedWithoutJoker.every((card, index) => {
      if (0 === index) {
        return true;
      }
      return CardNames.isNext(sortedWithoutJoker[index - 1].name, card.name);
    });
}
export type CardType = {
    id: string,
    name: string,
    suit: string,
    selectionColor?: string,
};
function makeCard(id: string, name: string, suit: string): CardType {
  return { id, name, suit };
}

// source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function knuthShuffle<T>(array: T[]) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

const REGULAR_DECK = CardSuits.ALL_SUITS
  .reduce((accum: CardType[], suit: string) =>
    accum.concat(CardNames.ALL_IN_A_SUIT.map(name => makeCard(v4(), name, suit))), [])
  .concat([makeCard(v4(), CardNames.JOKER, ''), makeCard(v4(), CardNames.JOKER, '')]);

class Decks {
  static sort(cardA: CardType, cardB: CardType): number {
    const suitSort = CardSuits.sort(cardA.suit, cardB.suit);
    if (suitSort !== 0) {
      return suitSort;
    }
    return CardNames.sort(cardA.name, cardB.name);
  }
  static get REGULAR_DECK() {
    return [...REGULAR_DECK];
  }
  static get SHUFFLED_DECK() {
    return knuthShuffle(Decks.REGULAR_DECK);
  }
}

export default Decks;