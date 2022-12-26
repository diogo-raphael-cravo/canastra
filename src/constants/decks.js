import CardNames from './card-names';
import CardSuits from './card-suits';

function makeCard(name, suit) {
  return { name, suit };
}

// source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function knuthShuffle(array) {
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
  .reduce((accum, suit) =>
    accum.concat(CardNames.ALL_IN_A_SUIT.map(name => makeCard(name, suit))), [])
  .concat([makeCard(CardNames.JOKER), makeCard(CardNames.JOKER)]);

class Decks {
  static sort(cardA, cardB) {
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