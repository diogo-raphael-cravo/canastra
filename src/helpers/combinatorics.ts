

export function getNextSublist(from: string[], length: number, lastCombination?: string[] | null): string[] | null {
  if (from.length < length) {
    return null;
  }
  if (0 === from.length) {
    return null;
  }
  if (!lastCombination) {
    return from.slice(0, length);
  }
  if (length !== lastCombination.length) {
    throw new Error(`length ${length} is different than last combination length ${lastCombination.length}`);
  }
  if (1 === length) {
    const lastIndex = from.findIndex(x => x === lastCombination[0]);
    if (-1 === lastIndex) {
      throw new Error(`element ${lastCombination[0]} of last combination is not in [${from}]`);
    }
    if (lastIndex === from.length - 1) {
      return null;
    }
    return [from[lastIndex + 1]];
  }

  // try with same first
  let foundFirst = false;
  const withoutFirst = from.filter(x => {
    if (x === lastCombination[0]) {
      foundFirst = true;
      return false;
    }
    return foundFirst;
  });
  let subCombination = getNextSublist(withoutFirst, length - 1, lastCombination.slice(1, lastCombination.length));
  if (null !== subCombination) {
    return [lastCombination[0], ...subCombination];
  }

  if (1 === withoutFirst.length) {
    return null;
  }

  // change first
  subCombination = getNextSublist(withoutFirst.slice(1, withoutFirst.length), length - 1);
  if (null !== subCombination) {
    return [withoutFirst[0], ...subCombination];
  }

  return null;
}