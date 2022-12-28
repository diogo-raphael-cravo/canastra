import CardNames from './CardNames';
import CardSuits from './CardSuits';
import { v4 } from 'uuid';

export function isTriple(cards: CardType[]): boolean {
  if (cards.length < 3) {
    return false;
  }
  const withoutJoker = cards.filter(card => !CardNames.isJoker(card.name));
  const jokerCount = cards.length - withoutJoker.length;
  if (1 < jokerCount) {
    return false;
  }
  if (withoutJoker.every(card => card.name === withoutJoker[0].name)) {
    return true;
  }
  const without2 = cards.filter(card => !CardNames.isN_2(card.name));
  const hasOne2 = cards.length - without2.length === 1;
  if (0 === jokerCount && hasOne2) {
    return without2.every(card => card.name === without2[0].name);
  }
  return false;
}

function isSortedArraySequenceHappyPath(cards: CardType[], hasJoker: boolean): boolean {
  let usedJoker = !hasJoker;
  return cards.every((card, index) => {
    if (0 === index) {
      return true;
    }
    const previous = cards[index - 1].name;
    const current = card.name;
    if (CardNames.isNext(previous, current)) {
      return true;
    }
    if (2 === CardNames.getDistance(previous, current) && !usedJoker) {
      usedJoker = true;
      return true;
    }
    return false;
  });
}
function isSortedArraySequence(cards: CardType[], hasJoker: boolean): boolean {
  if (!cards.every(card => card.suit === cards[0].suit)) {
    return false;
  }
  if (CardNames.isAce(cards[0].name)) {
    const cardsWithAceLast = [...cards.slice(1), cards[0]];
    const aceAs14Works = isSortedArraySequenceHappyPath(cardsWithAceLast, hasJoker);
    if (aceAs14Works) {
      return true;
    }
  }
  return isSortedArraySequenceHappyPath(cards, hasJoker);
}
export function isSequence(cards: CardType[]): boolean {
  const sortedCards: CardType[] = [...cards];
  sortedCards.sort(Decks.sort);
  const sortedWithoutJoker = sortedCards.filter(card => !CardNames.isJoker(card.name));
  const hasJoker = sortedWithoutJoker.length < sortedCards.length;
  if (cards.length < 3) {
    return false;
  }
  if (isSortedArraySequence(sortedWithoutJoker, hasJoker)) {
    return true;
  }
  return !hasJoker && sortedCards.some(thisCard => {
    if (!CardNames.isN_2(thisCard.name)) {
      return false;
    }
    const sortedCardsWithoutThisCard = sortedCards.filter(card => card.id !== thisCard.id);
    return isSortedArraySequence(sortedCardsWithoutThisCard, true);
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