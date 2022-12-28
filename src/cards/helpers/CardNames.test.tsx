import CardNames from './CardNames';

describe('isNext', () => {
    describe('is next', () => {
        test('A to 2', () => {
            expect(CardNames.isNext('A', '2')).toBeTruthy();
        });
    });
    describe('is not next', () => {
        test('A to A', () => {
            expect(CardNames.isNext('A', 'A')).toBeFalsy();
        });
        test('A to 3', () => {
            expect(CardNames.isNext('A', '3')).toBeFalsy();
        });
    });
});

describe('getDistance', () => {
    test('A to 2', () => {
        expect(CardNames.getDistance('A', '2')).toEqual(1);
    });
    test('A to A', () => {
        expect(CardNames.getDistance('A', 'A')).toEqual(0);
    });
    test('A to 3', () => {
        expect(CardNames.getDistance('A', '3')).toEqual(2);
    });
    test('J to A', () => {
        expect(CardNames.getDistance('J', 'A')).toEqual(-10);
    });
    test('Q to A', () => {
        expect(CardNames.getDistance('Q', 'A')).toEqual(2);
    });
    test('K to A', () => {
        expect(CardNames.getDistance('K', 'A')).toEqual(1);
    });
});
