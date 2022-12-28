import { CardType, isTriple, isSequence } from './Decks';

describe('isTriple', () => {
    describe('is a triple', () => {
        test('two cards of same name and a joker', () => {
            let cards: CardType[] = [{
                id: 'a',
                name: '3',
                suit: 'hearts',
            }, {
                id: 'b',
                name: '3',
                suit: 'diamonds',
            }, {
                id: 'c',
                name: 'JOKER',
                suit: '',
            }];
            
            expect(isTriple(cards)).toBeTruthy();

            cards = [{
                id: 'a',
                name: '3',
                suit: 'hearts',
            }, {
                id: 'c',
                name: 'JOKER',
                suit: '',
            }, {
                id: 'b',
                name: '3',
                suit: 'diamonds',
            }];
            
            expect(isTriple(cards)).toBeTruthy();

            cards = [{
                id: 'c',
                name: 'JOKER',
                suit: '',
            }, {
                id: 'a',
                name: '3',
                suit: 'hearts',
            }, {
                id: 'b',
                name: '3',
                suit: 'diamonds',
            }];
            
            expect(isTriple(cards)).toBeTruthy();
        });
        test('two cards of same name and a 2', () => {
            let cards: CardType[] = [{
                id: 'a',
                name: '3',
                suit: 'hearts',
            }, {
                id: 'b',
                name: '3',
                suit: 'diamonds',
            }, {
                id: 'c',
                name: '2',
                suit: 'cloves',
            }];
            
            expect(isTriple(cards)).toBeTruthy();

            cards = [{
                id: 'a',
                name: '3',
                suit: 'hearts',
            }, {
                id: 'c',
                name: '2',
                suit: 'cloves',
            }, {
                id: 'b',
                name: '3',
                suit: 'diamonds',
            }];
            
            expect(isTriple(cards)).toBeTruthy();

            cards = [{
                id: 'c',
                name: '2',
                suit: 'cloves',
            }, {
                id: 'a',
                name: '3',
                suit: 'hearts',
            }, {
                id: 'b',
                name: '3',
                suit: 'diamonds',
            }];
            
            expect(isTriple(cards)).toBeTruthy();
        });
        test('triple of 2s using joker', () => {
            let cards: CardType[] = [{
                id: 'a',
                name: '2',
                suit: 'hearts',
            }, {
                id: 'b',
                name: '2',
                suit: 'diamonds',
            }, {
                id: 'c',
                name: 'JOKER',
                suit: '',
            }];
            
            expect(isTriple(cards)).toBeTruthy();

            cards = [{
                id: 'a',
                name: '2',
                suit: 'hearts',
            }, {
                id: 'c',
                name: 'JOKER',
                suit: '',
            }, {
                id: 'b',
                name: '2',
                suit: 'diamonds',
            }];
            
            expect(isTriple(cards)).toBeTruthy();

            cards = [{
                id: 'c',
                name: 'JOKER',
                suit: '',
            }, {
                id: 'a',
                name: '2',
                suit: 'hearts',
            }, {
                id: 'b',
                name: '2',
                suit: 'diamonds',
            }];
            
            expect(isTriple(cards)).toBeTruthy();
        });
        test('three cards of same name', () => {
            const cards: CardType[] = [{
                id: 'a',
                name: '3',
                suit: 'hearts',
            }, {
                id: 'b',
                name: '3',
                suit: 'diamonds',
            }, {
                id: 'c',
                name: '3',
                suit: 'cloves',
            }];
            
            expect(isTriple(cards)).toBeTruthy();
        });
        test('four cards of same name', () => {
            const cards: CardType[] = [{
                id: 'a',
                name: '3',
                suit: 'hearts',
            }, {
                id: 'b',
                name: '3',
                suit: 'diamonds',
            }, {
                id: 'c',
                name: '3',
                suit: 'cloves',
            }, {
                id: 'd',
                name: '3',
                suit: 'spades',
            }];
            
            expect(isTriple(cards)).toBeTruthy();
        });
    });
    describe('is not a triple', () => {
        test('an empty list', () => {
            const cards: CardType[] = [];
            expect(isTriple(cards)).toBeFalsy();
        });
        test('three cards of different name', () => {
            const cards: CardType[] = [{
                id: 'a',
                name: '3',
                suit: 'hearts',
            }, {
                id: 'b',
                name: '3',
                suit: 'diamonds',
            }, {
                id: 'c',
                name: '4',
                suit: 'cloves',
            }];
            
            expect(isTriple(cards)).toBeFalsy();
        });
        test('multiple jokers', () => {
            let cards: CardType[] = [{
                id: 'a',
                name: 'JOKER',
                suit: '',
            }, {
                id: 'b',
                name: '3',
                suit: 'diamonds',
            }, {
                id: 'c',
                name: '2',
                suit: 'cloves',
            }];
            
            expect(isTriple(cards)).toBeFalsy();

            cards = [{
                id: 'a',
                name: '2',
                suit: 'diamonds',
            }, {
                id: 'b',
                name: '3',
                suit: 'diamonds',
            }, {
                id: 'c',
                name: '2',
                suit: 'cloves',
            }];
            
            expect(isTriple(cards)).toBeFalsy();

            cards = [{
                id: 'a',
                name: 'JOKER',
                suit: '',
            }, {
                id: 'b',
                name: '3',
                suit: 'diamonds',
            }, {
                id: 'c',
                name: 'JOKER',
                suit: '',
            }];
            
            expect(isTriple(cards)).toBeFalsy();
        });
    });
});

describe('isSequence', () => {
    describe('is a sequence', () => {
        test('two cards of same suit in sequence and a joker', () => {
            let cards: CardType[] = [{
                id: 'a',
                name: '3',
                suit: 'hearts',
            }, {
                id: 'b',
                name: '4',
                suit: 'hearts',
            }, {
                id: 'c',
                name: 'JOKER',
                suit: '',
            }];
            
            expect(isSequence(cards)).toBeTruthy();

            cards = [{
                id: 'a',
                name: '3',
                suit: 'hearts',
            }, {
                id: 'c',
                name: 'JOKER',
                suit: '',
            }, {
                id: 'b',
                name: '4',
                suit: 'hearts',
            }];
            
            expect(isSequence(cards)).toBeTruthy();

            cards = [{
                id: 'c',
                name: 'JOKER',
                suit: '',
            }, {
                id: 'a',
                name: '3',
                suit: 'hearts',
            }, {
                id: 'b',
                name: '4',
                suit: 'hearts',
            }];
            
            expect(isSequence(cards)).toBeTruthy();
        });
        test('two cards of same suit not in sequence and a joker', () => {
            let cards: CardType[] = [{
                id: 'a',
                name: '3',
                suit: 'hearts',
            }, {
                id: 'b',
                name: '5',
                suit: 'hearts',
            }, {
                id: 'c',
                name: 'JOKER',
                suit: '',
            }];
            
            expect(isSequence(cards)).toBeTruthy();

            cards = [{
                id: 'a',
                name: '3',
                suit: 'hearts',
            }, {
                id: 'c',
                name: 'JOKER',
                suit: '',
            }, {
                id: 'b',
                name: '5',
                suit: 'hearts',
            }];
            
            expect(isSequence(cards)).toBeTruthy();

            cards = [{
                id: 'c',
                name: 'JOKER',
                suit: '',
            }, {
                id: 'a',
                name: '3',
                suit: 'hearts',
            }, {
                id: 'b',
                name: '5',
                suit: 'hearts',
            }];
            
            expect(isSequence(cards)).toBeTruthy();
        });
        test('two cards of same suit in sequence and a 2', () => {
            let cards: CardType[] = [{
                id: 'a',
                name: '3',
                suit: 'hearts',
            }, {
                id: 'b',
                name: '4',
                suit: 'hearts',
            }, {
                id: 'c',
                name: '2',
                suit: 'cloves',
            }];
            
            expect(isSequence(cards)).toBeTruthy();

            cards = [{
                id: 'a',
                name: '3',
                suit: 'hearts',
            }, {
                id: 'c',
                name: '2',
                suit: 'cloves',
            }, {
                id: 'b',
                name: '4',
                suit: 'hearts',
            }];
            
            expect(isSequence(cards)).toBeTruthy();

            cards = [{
                id: 'c',
                name: '2',
                suit: 'cloves',
            }, {
                id: 'a',
                name: '3',
                suit: 'hearts',
            }, {
                id: 'b',
                name: '4',
                suit: 'hearts',
            }];
            
            expect(isSequence(cards)).toBeTruthy();
        });
        test('three cards of same suit in sequence', () => {
            const cards: CardType[] = [{
                id: 'a',
                name: '3',
                suit: 'hearts',
            }, {
                id: 'b',
                name: '4',
                suit: 'hearts',
            }, {
                id: 'c',
                name: '5',
                suit: 'hearts',
            }];
            
            expect(isSequence(cards)).toBeTruthy();
        });
        test('four cards of same suit in sequence', () => {
            const cards: CardType[] = [{
                id: 'a',
                name: '7',
                suit: 'hearts',
            }, {
                id: 'b',
                name: '6',
                suit: 'hearts',
            }, {
                id: 'c',
                name: '4',
                suit: 'hearts',
            }, {
                id: 'd',
                name: '5',
                suit: 'hearts',
            }];
            
            expect(isSequence(cards)).toBeTruthy();
        });
        test('three cards of same suit in sequence including a 2', () => {
            const cards: CardType[] = [{
                id: 'a',
                name: '2',
                suit: 'hearts',
            }, {
                id: 'b',
                name: '3',
                suit: 'hearts',
            }, {
                id: 'c',
                name: '4',
                suit: 'hearts',
            }];
            
            expect(isSequence(cards)).toBeTruthy();
        });
        test('ace as 14', () => {
            const cards: CardType[] = [{
                id: 'a',
                name: 'A',
                suit: 'hearts',
            }, {
                id: 'b',
                name: 'Q',
                suit: 'hearts',
            }, {
                id: 'c',
                name: 'K',
                suit: 'hearts',
            }];
            
            expect(isSequence(cards)).toBeTruthy();
        });
        test('ace as 14 using joker', () => {
            let cards: CardType[] = [{
                id: 'a',
                name: 'A',
                suit: 'hearts',
            }, {
                id: 'b',
                name: 'JOKER',
                suit: '',
            }, {
                id: 'c',
                name: 'K',
                suit: 'hearts',
            }];
            
            expect(isSequence(cards)).toBeTruthy();

            cards = [{
                id: 'a',
                name: 'A',
                suit: 'hearts',
            }, {
                id: 'b',
                name: 'Q',
                suit: 'hearts',
            }, {
                id: 'c',
                name: 'JOKER',
                suit: '',
            }];
            
            expect(isSequence(cards)).toBeTruthy();
        });
        test('joker as 14', () => {
            const cards: CardType[] = [{
                id: 'a',
                name: 'JOKER',
                suit: '',
            }, {
                id: 'b',
                name: 'Q',
                suit: 'hearts',
            }, {
                id: 'c',
                name: 'K',
                suit: 'hearts',
            }];
            
            expect(isSequence(cards)).toBeTruthy();
        });
        test('2 as 14', () => {
            const cards: CardType[] = [{
                id: 'a',
                name: '2',
                suit: 'spades',
            }, {
                id: 'b',
                name: 'Q',
                suit: 'hearts',
            }, {
                id: 'c',
                name: 'K',
                suit: 'hearts',
            }];
            
            expect(isSequence(cards)).toBeTruthy();
        });
        test('two number two cards', () => {
            const cards: CardType[] = [{
                id: 'a',
                name: '2',
                suit: 'diamonds',
            }, {
                id: 'b',
                name: '2',
                suit: 'spades',
            }, {
                id: 'c',
                name: '3',
                suit: 'spades',
            }];
            
            expect(isSequence(cards)).toBeTruthy();
        });
        test('a number two card and a joker', () => {
            const cards: CardType[] = [{
                id: 'a',
                name: 'JOKER',
                suit: '',
            }, {
                id: 'b',
                name: '2',
                suit: 'spades',
            }, {
                id: 'c',
                name: '3',
                suit: 'spades',
            }];
            
            expect(isSequence(cards)).toBeTruthy();
        });
    });
    describe('is not a sequence', () => {
        test('an empty list', () => {
            const cards: CardType[] = [];
            expect(isSequence(cards)).toBeFalsy();
        });
        test('three cards of different suits in sequence', () => {
            const cards: CardType[] = [{
                id: 'a',
                name: '3',
                suit: 'hearts',
            }, {
                id: 'b',
                name: '4',
                suit: 'diamonds',
            }, {
                id: 'c',
                name: '5',
                suit: 'cloves',
            }];
            
            expect(isSequence(cards)).toBeFalsy();
        });
        test('three cards of same suit not in sequence', () => {
            const cards: CardType[] = [{
                id: 'a',
                name: '3',
                suit: 'hearts',
            }, {
                id: 'b',
                name: '5',
                suit: 'hearts',
            }, {
                id: 'c',
                name: '6',
                suit: 'hearts',
            }];
            
            expect(isSequence(cards)).toBeFalsy();
        });
        test('three cards of same suit not in sequence and a joker', () => {
            const cards: CardType[] = [{
                id: 'a',
                name: '3',
                suit: 'hearts',
            }, {
                id: 'b',
                name: '6',
                suit: 'hearts',
            }, {
                id: 'c',
                name: '7',
                suit: 'hearts',
            }, {
                id: 'd',
                name: 'JOKER',
                suit: '',
            }];
            
            expect(isSequence(cards)).toBeFalsy();
        });
        test('three cards of same suit not in sequence and a 2', () => {
            const cards: CardType[] = [{
                id: 'a',
                name: '3',
                suit: 'hearts',
            }, {
                id: 'b',
                name: '6',
                suit: 'hearts',
            }, {
                id: 'c',
                name: '7',
                suit: 'hearts',
            }, {
                id: 'd',
                name: '2',
                suit: 'hearts',
            }];
            
            expect(isSequence(cards)).toBeFalsy();
        });
        test('two number two cards used as jokers', () => {
            const cards: CardType[] = [{
                id: 'a',
                name: '2',
                suit: 'diamonds',
            }, {
                id: 'b',
                name: '2',
                suit: 'hearts',
            }, {
                id: 'c',
                name: '5',
                suit: 'spades',
            }];
            
            expect(isSequence(cards)).toBeFalsy();
        });
    });
});