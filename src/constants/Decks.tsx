import CardNames from './CardNames';
import CardSuits from './CardSuits';

export type CardType = {
    name: string,
    suit: string,
};
function makeCard(name: string, suit: string): CardType {
  return { name, suit };
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
    accum.concat(CardNames.ALL_IN_A_SUIT.map(name => makeCard(name, suit))), [])
  .concat([makeCard(CardNames.JOKER, CardSuits.JOKER), makeCard(CardNames.JOKER, CardSuits.JOKER)]);

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