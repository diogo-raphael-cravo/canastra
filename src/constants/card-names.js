class CardNames {
  static sort(nameA, nameB) {
    return CardNames.ALL.findIndex(name => name === nameA)
      - CardNames.ALL.findIndex(name => name === nameB);
  }
  static get ALL() {
    return CardNames.ALL_IN_A_SUIT.concat([CardNames.JOKER]);
  }
  static get ALL_IN_A_SUIT() {
    return [
      CardNames.ACE,
      CardNames.N_2,
      CardNames.N_3,
      CardNames.N_4,
      CardNames.N_5,
      CardNames.N_6,
      CardNames.N_7,
      CardNames.N_8,
      CardNames.N_9,
      CardNames.N_10,
      CardNames.JACK,
      CardNames.QUEEN,
      CardNames.KING,
    ];
  }
  static get ACE() { return "A" }
  static get N_2() { return "2" }
  static get N_3() { return "3" }
  static get N_4() { return "4" }
  static get N_5() { return "5" }
  static get N_6() { return "6" }
  static get N_7() { return "7" }
  static get N_8() { return "8" }
  static get N_9() { return "9" }
  static get N_10() { return "10" }
  static get JACK() { return "J" }
  static get QUEEN() { return "Q" }
  static get KING() { return "K" }
  static get JOKER() { return "JOKER" }
  static isAce(name) {
    return name === CardNames.ACE;
  }
  static isN_2(name) {
    return name === CardNames.N_2;
  }
  static isN_3(name) {
    return name === CardNames.N_3;
  }
  static isN_4(name) {
    return name === CardNames.N_4;
  }
  static isN_5(name) {
    return name === CardNames.N_5;
  }
  static isN_6(name) {
    return name === CardNames.N_6;
  }
  static isN_7(name) {
    return name === CardNames.N_7;
  }
  static isN_8(name) {
    return name === CardNames.N_8;
  }
  static isN_9(name) {
    return name === CardNames.N_9;
  }
  static isN_10(name) {
    return name === CardNames.N_10;
  }
  static isJack(name) {
    return name === CardNames.JACK;
  }
  static isQueen(name) {
    return name === CardNames.QUEEN;
  }
  static isKing(name) {
    return name === CardNames.KING;
  }
  static isJoker(name) {
    return name === CardNames.JOKER;
  }
}

export default CardNames;