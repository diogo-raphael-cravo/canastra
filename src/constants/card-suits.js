class CardSuits {
  static sort(nameA, nameB) {
    return CardSuits.ALL_SUITS.findIndex(name => name === nameA) -
      CardSuits.ALL_SUITS.findIndex(name => name === nameB);
  }
  static get ALL_SUITS() {
    return [
      CardSuits.HEARTS,
      CardSuits.SPADES,
      CardSuits.DIAMONDS,
      CardSuits.CLUBS,
    ];
  }
  static get HEARTS() { return "hearts" }
  static get SPADES() { return "spades" }
  static get DIAMONDS() { return "diamonds" }
  static get CLUBS() { return "clubs" }
  static isHearts(suit) {
    return suit === CardSuits.HEARTS;
  }
  static isClubs(suit) {
    return suit === CardSuits.CLUBS;
  }
  static isSpades(suit) {
    return suit === CardSuits.SPADES;
  }
  static isDiamonds(suit) {
    return suit === CardSuits.DIAMONDS;
  }
}

export default CardSuits;