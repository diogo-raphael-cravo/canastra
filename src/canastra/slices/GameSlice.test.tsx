import reducer, { GameSliceState, pickCard, selectCardInHand, moveSelectedHandToSequence } from './GameSlice'

jest.mock('uuid', () => ({ v4: () => 'mockid' }));
test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
        deck: [],
        sequences: [{
            id: 'mockid',
            type: 'any',
            cards: [],
            selectionColor: '',
        }],
        hand: [],
    });
});

describe('pickCard', () => {
    test('should throw when deck is empty', () => {
        const previousState: GameSliceState = {
            deck: [],
            sequences: [],
            hand: [],
        };
        
        expect(() => reducer(previousState, pickCard())).toThrow('cannot pick when deck is empty');
    });
    test('should pick the last the card on the deck and place it last in the hand', () => {
        const previousState: GameSliceState = {
            deck: [{
                id: '1',
                name: '1',
                suit: '1',
            }, {
                id: '2',
                name: '2',
                suit: '2',
            }],
            sequences: [],
            hand: [{
                id: '3',
                name: '3',
                suit: '3',
            }],
        };
        
        expect(reducer(previousState, pickCard())).toEqual({
            deck: [{
                id: '1',
                name: '1',
                suit: '1',
            }],
            sequences: [],
            hand: [{
                id: '3',
                name: '3',
                suit: '3',
            }, {
                id: '2',
                name: '2',
                suit: '2',
            }],
        });
    });
});

describe('selectCardInHand', () => {
    test('should throw when card not in hand', () => {
        const previousState: GameSliceState = {
            deck: [],
            sequences: [],
            hand: [],
        };
        
        expect(() => reducer(previousState, selectCardInHand('notinhand')))
            .toThrow('trying to select card notinhand which is not in hand');
    });
    describe('triples', () => {
        test('should highlight when a triple is selected', () => {
            const previousState: GameSliceState = {
                deck: [],
                sequences: [{
                    id: 'mockid',
                    type: 'any',
                    cards: [],
                    selectionColor: '',
                }],
                hand: [{
                    id: 'a',
                    name: '3',
                    suit: 'hearts',
                    selectionColor: 'lightblue',
                }, {
                    id: 'b',
                    name: '3',
                    suit: 'diamonds',
                    selectionColor: 'lightblue',
                }, {
                    id: 'c',
                    name: '3',
                    suit: 'cloves',
                }, {
                    id: 'd',
                    name: '4',
                    suit: 'diamonds',
                }],
            };
            
            expect(reducer(previousState, selectCardInHand('c'))).toEqual({
                deck: [],
                sequences: [{
                    id: 'mockid',
                    type: 'any',
                    cards: [],
                    selectionColor: 'lightgreen',
                }],
                hand: [{
                    id: 'a',
                    name: '3',
                    suit: 'hearts',
                    selectionColor: 'lightgreen',
                }, {
                    id: 'b',
                    name: '3',
                    suit: 'diamonds',
                    selectionColor: 'lightgreen',
                }, {
                    id: 'c',
                    name: '3',
                    suit: 'cloves',
                    selectionColor: 'lightgreen',
                }, {
                    id: 'd',
                    name: '4',
                    suit: 'diamonds',
                }],
            });
        });
        test('should remove highlight when more than a triple is selected', () => {
            const previousState: GameSliceState = {
                deck: [],
                sequences: [{
                    id: 'mockid',
                    type: 'any',
                    cards: [],
                    selectionColor: 'lightgreen',
                }],
                hand: [{
                    id: 'a',
                    name: '3',
                    suit: 'hearts',
                    selectionColor: 'lightgreen',
                }, {
                    id: 'b',
                    name: '3',
                    suit: 'diamonds',
                    selectionColor: 'lightgreen',
                }, {
                    id: 'c',
                    name: '3',
                    suit: 'cloves',
                    selectionColor: 'lightgreen',
                }, {
                    id: 'd',
                    name: '4',
                    suit: 'diamonds',
                }],
            };
            
            expect(reducer(previousState, selectCardInHand('d'))).toEqual({
                deck: [],
                sequences: [{
                    id: 'mockid',
                    type: 'any',
                    cards: [],
                    selectionColor: '',
                }],
                hand: [{
                    id: 'a',
                    name: '3',
                    suit: 'hearts',
                    selectionColor: 'lightblue',
                }, {
                    id: 'b',
                    name: '3',
                    suit: 'diamonds',
                    selectionColor: 'lightblue',
                }, {
                    id: 'c',
                    name: '3',
                    suit: 'cloves',
                    selectionColor: 'lightblue',
                }, {
                    id: 'd',
                    name: '4',
                    suit: 'diamonds',
                    selectionColor: 'lightblue',
                }],
            });
        });
        test('should highlight triple again when extra card is deselected', () => {
            const previousState: GameSliceState = {
                deck: [],
                sequences: [{
                    id: 'mockid',
                    type: 'any',
                    cards: [],
                    selectionColor: '',
                }],
                hand: [{
                    id: 'a',
                    name: '3',
                    suit: 'hearts',
                    selectionColor: 'lightblue',
                }, {
                    id: 'b',
                    name: '3',
                    suit: 'diamonds',
                    selectionColor: 'lightblue',
                }, {
                    id: 'c',
                    name: '3',
                    suit: 'cloves',
                    selectionColor: 'lightblue',
                }, {
                    id: 'd',
                    name: '4',
                    suit: 'diamonds',
                    selectionColor: 'lightblue',
                }],
            };
            
            expect(reducer(previousState, selectCardInHand('d'))).toEqual({
                deck: [],
                sequences: [{
                    id: 'mockid',
                    type: 'any',
                    cards: [],
                    selectionColor: 'lightgreen',
                }],
                hand: [{
                    id: 'a',
                    name: '3',
                    suit: 'hearts',
                    selectionColor: 'lightgreen',
                }, {
                    id: 'b',
                    name: '3',
                    suit: 'diamonds',
                    selectionColor: 'lightgreen',
                }, {
                    id: 'c',
                    name: '3',
                    suit: 'cloves',
                    selectionColor: 'lightgreen',
                }, {
                    id: 'd',
                    name: '4',
                    suit: 'diamonds',
                    selectionColor: '',
                }],
            });
        });
        test('should highlight sequence of type triple when matching card is selected', () => {
            const previousState: GameSliceState = {
                deck: [],
                sequences: [{
                    id: 'mockid',
                    type: 'triple',
                    cards: [{
                        id: 's1',
                        name: '3',
                        suit: 'hearts',
                    }, {
                        id: 's2',
                        name: '3',
                        suit: 'diamonds',
                    }, {
                        id: 's3',
                        name: '3',
                        suit: 'cloves',
                    }],
                    selectionColor: '',
                }, {
                    id: 'mockid',
                    type: 'any',
                    cards: [],
                    selectionColor: '',
                }],
                hand: [{
                    id: 'a',
                    name: '3',
                    suit: 'spades',
                    selectionColor: '',
                }],
            };
            
            expect(reducer(previousState, selectCardInHand('a'))).toEqual({
                deck: [],
                sequences: [{
                    id: 'mockid',
                    type: 'triple',
                    cards: [{
                        id: 's1',
                        name: '3',
                        suit: 'hearts',
                        selectionColor: 'lightgreen',
                    }, {
                        id: 's2',
                        name: '3',
                        suit: 'diamonds',
                        selectionColor: '',
                    }, {
                        id: 's3',
                        name: '3',
                        suit: 'cloves',
                        selectionColor: '',
                    }],
                    selectionColor: '',
                }, {
                    id: 'mockid',
                    type: 'any',
                    cards: [],
                    selectionColor: '',
                }],
                hand: [{
                    id: 'a',
                    name: '3',
                    suit: 'spades',
                    selectionColor: 'lightgreen',
                }],
            });
        });
        test('should remove highlight of sequence of type triple when matching card is deselected', () => {
            const previousState: GameSliceState = {
                deck: [],
                sequences: [{
                    id: 'mockid',
                    type: 'triple',
                    cards: [{
                        id: 's1',
                        name: '3',
                        suit: 'hearts',
                        selectionColor: 'lightgreen',
                    }, {
                        id: 's2',
                        name: '3',
                        suit: 'diamonds',
                        selectionColor: '',
                    }, {
                        id: 's3',
                        name: '3',
                        suit: 'cloves',
                        selectionColor: '',
                    }],
                    selectionColor: '',
                }, {
                    id: 'mockid',
                    type: 'any',
                    cards: [],
                    selectionColor: '',
                }],
                hand: [{
                    id: 'a',
                    name: '3',
                    suit: 'spades',
                    selectionColor: 'lightgreen',
                }],
            };
            
            expect(reducer(previousState, selectCardInHand('a'))).toEqual({
                deck: [],
                sequences: [{
                    id: 'mockid',
                    type: 'triple',
                    cards: [{
                        id: 's1',
                        name: '3',
                        suit: 'hearts',
                        selectionColor: '',
                    }, {
                        id: 's2',
                        name: '3',
                        suit: 'diamonds',
                        selectionColor: '',
                    }, {
                        id: 's3',
                        name: '3',
                        suit: 'cloves',
                        selectionColor: '',
                    }],
                    selectionColor: '',
                }, {
                    id: 'mockid',
                    type: 'any',
                    cards: [],
                    selectionColor: '',
                }],
                hand: [{
                    id: 'a',
                    name: '3',
                    suit: 'spades',
                    selectionColor: '',
                }],
            });
        });
    });
    describe('sequences', () => {
        test('should highlight when a sequence is selected', () => {
            const previousState: GameSliceState = {
                deck: [],
                sequences: [{
                    id: 'mockid',
                    type: 'any',
                    cards: [],
                    selectionColor: '',
                }],
                hand: [{
                    id: 'a',
                    name: '3',
                    suit: 'hearts',
                    selectionColor: 'lightblue',
                }, {
                    id: 'b',
                    name: '4',
                    suit: 'hearts',
                    selectionColor: 'lightblue',
                }, {
                    id: 'c',
                    name: '5',
                    suit: 'hearts',
                }, {
                    id: 'd',
                    name: '4',
                    suit: 'diamonds',
                }],
            };
            
            expect(reducer(previousState, selectCardInHand('c'))).toEqual({
                deck: [],
                sequences: [{
                    id: 'mockid',
                    type: 'any',
                    cards: [],
                    selectionColor: 'lightgreen',
                }],
                hand: [{
                    id: 'a',
                    name: '3',
                    suit: 'hearts',
                    selectionColor: 'lightgreen',
                }, {
                    id: 'b',
                    name: '4',
                    suit: 'hearts',
                    selectionColor: 'lightgreen',
                }, {
                    id: 'c',
                    name: '5',
                    suit: 'hearts',
                    selectionColor: 'lightgreen',
                }, {
                    id: 'd',
                    name: '4',
                    suit: 'diamonds',
                }],
            });
        });
        test('should remove highlight when more than a sequence is selected', () => {
            const previousState: GameSliceState = {
                deck: [],
                sequences: [{
                    id: 'mockid',
                    type: 'any',
                    cards: [],
                    selectionColor: 'lightgreen',
                }],
                hand: [{
                    id: 'a',
                    name: '3',
                    suit: 'hearts',
                    selectionColor: 'lightgreen',
                }, {
                    id: 'b',
                    name: '4',
                    suit: 'hearts',
                    selectionColor: 'lightgreen',
                }, {
                    id: 'c',
                    name: '5',
                    suit: 'hearts',
                    selectionColor: 'lightgreen',
                }, {
                    id: 'd',
                    name: '4',
                    suit: 'diamonds',
                }],
            };
            
            expect(reducer(previousState, selectCardInHand('d'))).toEqual({
                deck: [],
                sequences: [{
                    id: 'mockid',
                    type: 'any',
                    cards: [],
                    selectionColor: '',
                }],
                hand: [{
                    id: 'a',
                    name: '3',
                    suit: 'hearts',
                    selectionColor: 'lightblue',
                }, {
                    id: 'b',
                    name: '4',
                    suit: 'hearts',
                    selectionColor: 'lightblue',
                }, {
                    id: 'c',
                    name: '5',
                    suit: 'hearts',
                    selectionColor: 'lightblue',
                }, {
                    id: 'd',
                    name: '4',
                    suit: 'diamonds',
                    selectionColor: 'lightblue',
                }],
            });
        });
        test('should highlight sequence again when extra card is deselected', () => {
            const previousState: GameSliceState = {
                deck: [],
                sequences: [{
                    id: 'mockid',
                    type: 'any',
                    cards: [],
                    selectionColor: '',
                }],
                hand: [{
                    id: 'a',
                    name: '3',
                    suit: 'hearts',
                    selectionColor: 'lightblue',
                }, {
                    id: 'b',
                    name: '4',
                    suit: 'hearts',
                    selectionColor: 'lightblue',
                }, {
                    id: 'c',
                    name: '5',
                    suit: 'hearts',
                    selectionColor: 'lightblue',
                }, {
                    id: 'd',
                    name: '4',
                    suit: 'diamonds',
                    selectionColor: 'lightblue',
                }],
            };
            
            expect(reducer(previousState, selectCardInHand('d'))).toEqual({
                deck: [],
                sequences: [{
                    id: 'mockid',
                    type: 'any',
                    cards: [],
                    selectionColor: 'lightgreen',
                }],
                hand: [{
                    id: 'a',
                    name: '3',
                    suit: 'hearts',
                    selectionColor: 'lightgreen',
                }, {
                    id: 'b',
                    name: '4',
                    suit: 'hearts',
                    selectionColor: 'lightgreen',
                }, {
                    id: 'c',
                    name: '5',
                    suit: 'hearts',
                    selectionColor: 'lightgreen',
                }, {
                    id: 'd',
                    name: '4',
                    suit: 'diamonds',
                    selectionColor: '',
                }],
            });
        });
        test('should highlight sequence of type sequence when matching card is selected (lower bound and 2 as joker)', () => {
            const previousState: GameSliceState = {
                deck: [],
                sequences: [{
                    id: 'mockid',
                    type: 'sequence',
                    cards: [{
                        id: 's1',
                        name: '3',
                        suit: 'hearts',
                    }, {
                        id: 's2',
                        name: '4',
                        suit: 'hearts',
                    }, {
                        id: 's3',
                        name: '5',
                        suit: 'hearts',
                    }],
                    selectionColor: '',
                }, {
                    id: 'mockid',
                    type: 'any',
                    cards: [],
                    selectionColor: '',
                }],
                hand: [{
                    id: 'a',
                    name: '2',
                    suit: 'hearts',
                    selectionColor: '',
                }],
            };
            
            expect(reducer(previousState, selectCardInHand('a'))).toEqual({
                deck: [],
                sequences: [{
                    id: 'mockid',
                    type: 'sequence',
                    cards: [{
                        id: 's1',
                        name: '3',
                        suit: 'hearts',
                        selectionColor: 'lightgreen',
                    }, {
                        id: 's2',
                        name: '4',
                        suit: 'hearts',
                        selectionColor: '',
                    }, {
                        id: 's3',
                        name: '5',
                        suit: 'hearts',
                        selectionColor: 'lightgreen',
                    }],
                    selectionColor: '',
                }, {
                    id: 'mockid',
                    type: 'any',
                    cards: [],
                    selectionColor: '',
                }],
                hand: [{
                    id: 'a',
                    name: '2',
                    suit: 'hearts',
                    selectionColor: 'lightgreen',
                }],
            });
        });
        test('should highlight sequence of type sequence when matching card is selected (lower bound)', () => {
            const previousState: GameSliceState = {
                deck: [],
                sequences: [{
                    id: 'mockid',
                    type: 'sequence',
                    cards: [{
                        id: 's1',
                        name: '4',
                        suit: 'hearts',
                    }, {
                        id: 's2',
                        name: '5',
                        suit: 'hearts',
                    }, {
                        id: 's3',
                        name: '6',
                        suit: 'hearts',
                    }],
                    selectionColor: '',
                }, {
                    id: 'mockid',
                    type: 'any',
                    cards: [],
                    selectionColor: '',
                }],
                hand: [{
                    id: 'a',
                    name: '3',
                    suit: 'hearts',
                    selectionColor: '',
                }],
            };
            
            expect(reducer(previousState, selectCardInHand('a'))).toEqual({
                deck: [],
                sequences: [{
                    id: 'mockid',
                    type: 'sequence',
                    cards: [{
                        id: 's1',
                        name: '4',
                        suit: 'hearts',
                        selectionColor: 'lightgreen',
                    }, {
                        id: 's2',
                        name: '5',
                        suit: 'hearts',
                        selectionColor: '',
                    }, {
                        id: 's3',
                        name: '6',
                        suit: 'hearts',
                        selectionColor: '',
                    }],
                    selectionColor: '',
                }, {
                    id: 'mockid',
                    type: 'any',
                    cards: [],
                    selectionColor: '',
                }],
                hand: [{
                    id: 'a',
                    name: '3',
                    suit: 'hearts',
                    selectionColor: 'lightgreen',
                }],
            });
        });
        test('should remove highlight of sequence of type sequence when matching card is deselected', () => {
            const previousState: GameSliceState = {
                deck: [],
                sequences: [{
                    id: 'mockid',
                    type: 'sequence',
                    cards: [{
                        id: 's1',
                        name: '3',
                        suit: 'hearts',
                        selectionColor: 'lightgreen',
                    }, {
                        id: 's2',
                        name: '4',
                        suit: 'hearts',
                        selectionColor: '',
                    }, {
                        id: 's3',
                        name: '5',
                        suit: 'hearts',
                        selectionColor: '',
                    }],
                    selectionColor: '',
                }, {
                    id: 'mockid',
                    type: 'any',
                    cards: [],
                    selectionColor: '',
                }],
                hand: [{
                    id: 'a',
                    name: '2',
                    suit: 'hearts',
                    selectionColor: 'lightgreen',
                }],
            };
            
            expect(reducer(previousState, selectCardInHand('a'))).toEqual({
                deck: [],
                sequences: [{
                    id: 'mockid',
                    type: 'sequence',
                    cards: [{
                        id: 's1',
                        name: '3',
                        suit: 'hearts',
                        selectionColor: '',
                    }, {
                        id: 's2',
                        name: '4',
                        suit: 'hearts',
                        selectionColor: '',
                    }, {
                        id: 's3',
                        name: '5',
                        suit: 'hearts',
                        selectionColor: '',
                    }],
                    selectionColor: '',
                }, {
                    id: 'mockid',
                    type: 'any',
                    cards: [],
                    selectionColor: '',
                }],
                hand: [{
                    id: 'a',
                    name: '2',
                    suit: 'hearts',
                    selectionColor: '',
                }],
            });
        });
        test('should highlight sequence of type sequence when matching card is selected (upper bound)', () => {
            const previousState: GameSliceState = {
                deck: [],
                sequences: [{
                    id: 'mockid',
                    type: 'sequence',
                    cards: [{
                        id: 's1',
                        name: '3',
                        suit: 'hearts',
                    }, {
                        id: 's2',
                        name: '4',
                        suit: 'hearts',
                    }, {
                        id: 's3',
                        name: '5',
                        suit: 'hearts',
                    }],
                    selectionColor: '',
                }, {
                    id: 'mockid',
                    type: 'any',
                    cards: [],
                    selectionColor: '',
                }],
                hand: [{
                    id: 'a',
                    name: '6',
                    suit: 'hearts',
                    selectionColor: '',
                }],
            };
            
            expect(reducer(previousState, selectCardInHand('a'))).toEqual({
                deck: [],
                sequences: [{
                    id: 'mockid',
                    type: 'sequence',
                    cards: [{
                        id: 's1',
                        name: '3',
                        suit: 'hearts',
                        selectionColor: '',
                    }, {
                        id: 's2',
                        name: '4',
                        suit: 'hearts',
                        selectionColor: '',
                    }, {
                        id: 's3',
                        name: '5',
                        suit: 'hearts',
                        selectionColor: 'lightgreen',
                    }],
                    selectionColor: '',
                }, {
                    id: 'mockid',
                    type: 'any',
                    cards: [],
                    selectionColor: '',
                }],
                hand: [{
                    id: 'a',
                    name: '6',
                    suit: 'hearts',
                    selectionColor: 'lightgreen',
                }],
            });
        });
    });
});

describe('moveSelectedHandToSequence', () => {
    test('should throw when sequence not found', () => {
        const previousState: GameSliceState = {
            deck: [],
            sequences: [],
            hand: [],
        };
        
        expect(() => reducer(previousState, moveSelectedHandToSequence({ sequenceId: 'notavailable', cardId: '' })))
            .toThrow('could not find sequence notavailable');
    });
    test('should do nothing when selected cards are neither a sequence nor triple', () => {
        const previousState: GameSliceState = {
            deck: [],
            sequences: [{
                id: 'mockid',
                type: 'any',
                cards: [],
                selectionColor: '',
            }],
            hand: [{
                id: 'a',
                name: '3',
                suit: 'hearts',
                selectionColor: 'lightblue',
            }, {
                id: 'b',
                name: '4',
                suit: 'hearts',
                selectionColor: 'lightblue',
            }, {
                id: 'c',
                name: '5',
                suit: 'hearts',
            }, {
                id: 'd',
                name: '5',
                suit: 'diamonds',
                selectionColor: 'lightblue',
            }],
        };
        
        expect(reducer(previousState, moveSelectedHandToSequence({ sequenceId: 'mockid', cardId: '' }))).toEqual({
            deck: [],
            sequences: [{
                id: 'mockid',
                type: 'any',
                cards: [],
                selectionColor: '',
            }],
            hand: [{
                id: 'a',
                name: '3',
                suit: 'hearts',
                selectionColor: 'lightblue',
            }, {
                id: 'b',
                name: '4',
                suit: 'hearts',
                selectionColor: 'lightblue',
            }, {
                id: 'c',
                name: '5',
                suit: 'hearts',
            }, {
                id: 'd',
                name: '5',
                suit: 'diamonds',
                selectionColor: 'lightblue',
            }],
        });
    });
    test('should set sequence type to triple when moving triple to empty sequence', () => {
        const previousState: GameSliceState = {
            deck: [],
            sequences: [{
                id: 'mockid',
                type: 'any',
                cards: [],
                selectionColor: '',
            }],
            hand: [{
                id: 'a',
                name: 'A',
                suit: 'hearts',
                selectionColor: 'lightgreen',
            }, {
                id: 'b',
                name: 'A',
                suit: 'diamonds',
                selectionColor: 'lightgreen',
            }, {
                id: 'c',
                name: 'A',
                suit: 'cloves',
                selectionColor: 'lightgreen',
            }, {
                id: 'd',
                name: '5',
                suit: 'diamonds',
                selectionColor: '',
            }],
        };
        
        expect(reducer(previousState, moveSelectedHandToSequence({ sequenceId: 'mockid', cardId: '' }))).toEqual({
            deck: [],
            sequences: [{
                id: 'mockid',
                type: 'triple',
                cards: [{
                    id: 'a',
                    name: 'A',
                    suit: 'hearts',
                    selectionColor: '',
                }, {
                    id: 'b',
                    name: 'A',
                    suit: 'diamonds',
                    selectionColor: '',
                }, {
                    id: 'c',
                    name: 'A',
                    suit: 'cloves',
                    selectionColor: '',
                }],
                selectionColor: '',
            }, {
                id: 'mockid',
                type: 'any',
                cards: [],
                selectionColor: '',
            }],
            hand: [{
                id: 'd',
                name: '5',
                suit: 'diamonds',
                selectionColor: '',
            }],
        });
    });
    test('should move a single card to a sequence of type triple', () => {
        const previousState: GameSliceState = {
            deck: [],
            sequences: [{
                id: 'tripleid',
                type: 'triple',
                cards: [{
                    id: 'a',
                    name: 'A',
                    suit: 'hearts',
                    selectionColor: 'lightgreen',
                }, {
                    id: 'b',
                    name: 'A',
                    suit: 'diamonds',
                    selectionColor: 'lightgreen',
                }, {
                    id: 'c',
                    name: 'A',
                    suit: 'cloves',
                    selectionColor: 'lightgreen',
                }],
                selectionColor: '',
            }, {
                id: 'mockid',
                type: 'any',
                cards: [],
                selectionColor: '',
            }],
            hand: [{
                id: 'd',
                name: 'A',
                suit: 'spades',
                selectionColor: 'lightgreen',
            }],
        };
        
        expect(reducer(previousState, moveSelectedHandToSequence({ sequenceId: 'tripleid', cardId: '' }))).toEqual({
            deck: [],
            sequences: [{
                id: 'tripleid',
                type: 'triple',
                cards: [{
                    id: 'a',
                    name: 'A',
                    suit: 'hearts',
                    selectionColor: '',
                }, {
                    id: 'b',
                    name: 'A',
                    suit: 'diamonds',
                    selectionColor: '',
                }, {
                    id: 'c',
                    name: 'A',
                    suit: 'cloves',
                    selectionColor: '',
                }, {
                    id: 'd',
                    name: 'A',
                    suit: 'spades',
                    selectionColor: '',
                }],
                selectionColor: '',
            }, {
                id: 'mockid',
                type: 'any',
                cards: [],
                selectionColor: '',
            }],
            hand: [],
        });
    });
    test('should set sequence type to sequence when moving sequence to empty sequence', () => {
        const previousState: GameSliceState = {
            deck: [],
            sequences: [{
                id: 'mockid',
                type: 'any',
                cards: [],
                selectionColor: '',
            }],
            hand: [{
                id: 'a',
                name: 'A',
                suit: 'hearts',
                selectionColor: 'lightgreen',
            }, {
                id: 'b',
                name: '2',
                suit: 'hearts',
                selectionColor: 'lightgreen',
            }, {
                id: 'c',
                name: '3',
                suit: 'hearts',
                selectionColor: 'lightgreen',
            }, {
                id: 'd',
                name: '5',
                suit: 'diamonds',
                selectionColor: '',
            }],
        };
        
        expect(reducer(previousState, moveSelectedHandToSequence({ sequenceId: 'mockid', cardId: '' }))).toEqual({
            deck: [],
            sequences: [{
                id: 'mockid',
                type: 'sequence',
                cards: [{
                    id: 'a',
                    name: 'A',
                    suit: 'hearts',
                    selectionColor: '',
                }, {
                    id: 'b',
                    name: '2',
                    suit: 'hearts',
                    selectionColor: '',
                }, {
                    id: 'c',
                    name: '3',
                    suit: 'hearts',
                    selectionColor: '',
                }],
                selectionColor: '',
            }, {
                id: 'mockid',
                type: 'any',
                cards: [],
                selectionColor: '',
            }],
            hand: [{
                id: 'd',
                name: '5',
                suit: 'diamonds',
                selectionColor: '',
            }],
        });
    });
    test('should move a single card to a sequence of type sequence (upper bound)', () => {
        const previousState: GameSliceState = {
            deck: [],
            sequences: [{
                id: 'sequenceid',
                type: 'sequence',
                cards: [{
                    id: 'a',
                    name: 'A',
                    suit: 'hearts',
                    selectionColor: 'lightgreen',
                }, {
                    id: 'b',
                    name: '2',
                    suit: 'hearts',
                    selectionColor: 'lightgreen',
                }, {
                    id: 'c',
                    name: '3',
                    suit: 'hearts',
                    selectionColor: 'lightgreen',
                }],
                selectionColor: '',
            }, {
                id: 'mockid',
                type: 'any',
                cards: [],
                selectionColor: '',
            }],
            hand: [{
                id: 'd',
                name: '4',
                suit: 'hearts',
                selectionColor: 'lightgreen',
            }],
        };
        
        expect(reducer(previousState, moveSelectedHandToSequence({ sequenceId: 'sequenceid', cardId: '' }))).toEqual({
            deck: [],
            sequences: [{
                id: 'sequenceid',
                type: 'sequence',
                cards: [{
                    id: 'a',
                    name: 'A',
                    suit: 'hearts',
                    selectionColor: '',
                }, {
                    id: 'b',
                    name: '2',
                    suit: 'hearts',
                    selectionColor: '',
                }, {
                    id: 'c',
                    name: '3',
                    suit: 'hearts',
                    selectionColor: '',
                }, {
                    id: 'd',
                    name: '4',
                    suit: 'hearts',
                    selectionColor: '',
                }],
                selectionColor: '',
            }, {
                id: 'mockid',
                type: 'any',
                cards: [],
                selectionColor: '',
            }],
            hand: [],
        });
    });
    test('should move a single card to a sequence of type sequence (lower bound)', () => {
        const previousState: GameSliceState = {
            deck: [],
            sequences: [{
                id: 'sequenceid',
                type: 'sequence',
                cards: [{
                    id: 'a',
                    name: '2',
                    suit: 'hearts',
                    selectionColor: 'lightgreen',
                }, {
                    id: 'b',
                    name: '3',
                    suit: 'hearts',
                    selectionColor: 'lightgreen',
                }, {
                    id: 'c',
                    name: '4',
                    suit: 'hearts',
                    selectionColor: 'lightgreen',
                }],
                selectionColor: '',
            }, {
                id: 'mockid',
                type: 'any',
                cards: [],
                selectionColor: '',
            }],
            hand: [{
                id: 'd',
                name: 'A',
                suit: 'hearts',
                selectionColor: 'lightgreen',
            }],
        };
        
        expect(reducer(previousState, moveSelectedHandToSequence({ sequenceId: 'sequenceid', cardId: '' }))).toEqual({
            deck: [],
            sequences: [{
                id: 'sequenceid',
                type: 'sequence',
                cards: [{
                    id: 'd',
                    name: 'A',
                    suit: 'hearts',
                    selectionColor: '',
                }, {
                    id: 'a',
                    name: '2',
                    suit: 'hearts',
                    selectionColor: '',
                }, {
                    id: 'b',
                    name: '3',
                    suit: 'hearts',
                    selectionColor: '',
                }, {
                    id: 'c',
                    name: '4',
                    suit: 'hearts',
                    selectionColor: '',
                }],
                selectionColor: '',
            }, {
                id: 'mockid',
                type: 'any',
                cards: [],
                selectionColor: '',
            }],
            hand: [],
        });
    });
});