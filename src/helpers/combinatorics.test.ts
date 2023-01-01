import { getNextSublist } from './combinatorics';

describe('combinatorics', () => {
  it('returns first combination', () => {
    expect(getNextSublist(['a', 'b', 'c', 'd', 'e'], 3)).toStrictEqual(['a', 'b', 'c']);
  });
  it('returns next combination of length 1', () => {
    let lastSublist: string[] | null | undefined;
    
    lastSublist = getNextSublist(['a', 'b', 'c', 'd', 'e'], 1);
    expect(lastSublist).toStrictEqual(['a']);

    lastSublist = getNextSublist(['a', 'b', 'c', 'd', 'e'], 1, lastSublist);
    expect(lastSublist).toStrictEqual(['b']);

    lastSublist = getNextSublist(['a', 'b', 'c', 'd', 'e'], 1, lastSublist);
    expect(lastSublist).toStrictEqual(['c']);

    lastSublist = getNextSublist(['a', 'b', 'c', 'd', 'e'], 1, lastSublist);
    expect(lastSublist).toStrictEqual(['d']);

    lastSublist = getNextSublist(['a', 'b', 'c', 'd', 'e'], 1, lastSublist);
    expect(lastSublist).toStrictEqual(['e']);

    lastSublist = getNextSublist(['a', 'b', 'c', 'd', 'e'], 1, lastSublist);
    expect(lastSublist).toStrictEqual(null);
  });
  it('exhausts all possibilities (2 out of 4)', () => {
    let lastSublist: string[] | null | undefined;
    
    lastSublist = getNextSublist(['a', 'b', 'c', 'd'], 2);
    expect(lastSublist).toStrictEqual(['a', 'b']);

    lastSublist = getNextSublist(['a', 'b', 'c', 'd'], 2, lastSublist);
    expect(lastSublist).toStrictEqual(['a', 'c']);

    lastSublist = getNextSublist(['a', 'b', 'c', 'd'], 2, lastSublist);
    expect(lastSublist).toStrictEqual(['a', 'd']);

    lastSublist = getNextSublist(['a', 'b', 'c', 'd'], 2, lastSublist);
    expect(lastSublist).toStrictEqual(['b', 'c']);

    lastSublist = getNextSublist(['a', 'b', 'c', 'd'], 2, lastSublist);
    expect(lastSublist).toStrictEqual(['b', 'd']);

    lastSublist = getNextSublist(['a', 'b', 'c', 'd'], 2, lastSublist);
    expect(lastSublist).toStrictEqual(['c', 'd']);
    
    lastSublist = getNextSublist(['a', 'b', 'c', 'd'], 2, lastSublist);
    expect(lastSublist).toStrictEqual(null);
  });
  it('exhausts all possibilities (3 out of 4)', () => {
    let lastSublist: string[] | null | undefined;
    
    lastSublist = getNextSublist(['a', 'b', 'c', 'd'], 3);
    expect(lastSublist).toStrictEqual(['a', 'b', 'c']);

    lastSublist = getNextSublist(['a', 'b', 'c', 'd'], 3, lastSublist);
    expect(lastSublist).toStrictEqual(['a', 'b', 'd']);

    lastSublist = getNextSublist(['a', 'b', 'c', 'd'], 3, lastSublist);
    expect(lastSublist).toStrictEqual(['a', 'c', 'd']);

    lastSublist = getNextSublist(['a', 'b', 'c', 'd'], 3, lastSublist);
    expect(lastSublist).toStrictEqual(['b', 'c', 'd']);
    
    lastSublist = getNextSublist(['a', 'b', 'c', 'd'], 3, lastSublist);
    expect(lastSublist).toStrictEqual(null);
  });
  it('exhausts all possibilities (3 out of 5)', () => {
    let lastSublist: string[] | null | undefined;
    
    lastSublist = getNextSublist(['a', 'b', 'c', 'd', 'e'], 3);
    expect(lastSublist).toStrictEqual(['a', 'b', 'c']);

    lastSublist = getNextSublist(['a', 'b', 'c', 'd', 'e'], 3, lastSublist);
    expect(lastSublist).toStrictEqual(['a', 'b', 'd']);

    lastSublist = getNextSublist(['a', 'b', 'c', 'd', 'e'], 3, lastSublist);
    expect(lastSublist).toStrictEqual(['a', 'b', 'e']);

    lastSublist = getNextSublist(['a', 'b', 'c', 'd', 'e'], 3, lastSublist);
    expect(lastSublist).toStrictEqual(['a', 'c', 'd']);

    lastSublist = getNextSublist(['a', 'b', 'c', 'd', 'e'], 3, lastSublist);
    expect(lastSublist).toStrictEqual(['a', 'c', 'e']);

    lastSublist = getNextSublist(['a', 'b', 'c', 'd', 'e'], 3, lastSublist);
    expect(lastSublist).toStrictEqual(['a', 'd', 'e']);

    lastSublist = getNextSublist(['a', 'b', 'c', 'd', 'e'], 3, lastSublist);
    expect(lastSublist).toStrictEqual(['b', 'c', 'd']);
    
    lastSublist = getNextSublist(['a', 'b', 'c', 'd', 'e'], 3, lastSublist);
    expect(lastSublist).toStrictEqual(['b', 'c', 'e']);

    lastSublist = getNextSublist(['a', 'b', 'c', 'd', 'e'], 3, lastSublist);
    expect(lastSublist).toStrictEqual(['b', 'd', 'e']);

    lastSublist = getNextSublist(['a', 'b', 'c', 'd', 'e'], 3, lastSublist);
    expect(lastSublist).toStrictEqual(['c', 'd', 'e']);

    lastSublist = getNextSublist(['a', 'b', 'c', 'd', 'e'], 3, lastSublist);
    expect(lastSublist).toStrictEqual(null);
  });
});