class CardSuits {
    static sort(nameA: string, nameB: string): number {
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
    static isHearts(suit: string) {
      return suit === CardSuits.HEARTS;
    }
    static isClubs(suit: string) {
      return suit === CardSuits.CLUBS;
    }
    static isSpades(suit: string) {
      return suit === CardSuits.SPADES;
    }
    static isDiamonds(suit: string) {
      return suit === CardSuits.DIAMONDS;
    }
  }
  
  export default CardSuits;