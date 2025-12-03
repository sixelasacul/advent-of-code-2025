// idea: building a regex from 999999999999 and decrement it? that means potentially
// a too large amount of iterations, but benefits from regex speed/simplicity?

// use bigint?

const MAX = Math.pow(10, 12);

// NOT WORKING YET
function findDigit(
  bank: string,
  startingIndex: number,
  digit: number,
  max: number,
) {
  const index = bank.indexOf(digit.toString(), startingIndex);

  if (index === -1) {
    if (digit > 0) {
      return findDigit(bank, startingIndex, digit - 1, max);
    }
    return findDigit(bank, startingIndex + 1, 9, max);
  }

  if (index + 11 > bank.length - 1)
    return findDigit(bank, startingIndex, digit - 1, max);

  const batteries = max * 10 + parseInt(bank[index] ?? "0");

  console.log("stuck", batteries, batteries > MAX);
  console.log(bank, index + 1, digit, max);
  if (batteries > MAX) return max;

  max = Math.max(max, batteries);

  return findDigit(bank, index + 1, digit, max);
}

export function runPart2(input: string) {
  const banks = input.trim().split("\n");
  let sum = 0;

  for (const bank of banks) {
    // let max = 0;

    // go through the bank finding the highest digit and checking if it has
    // 11 following digits, and if they are multiple same starting digit, keeping
    // the highest
    // then still have to try different combinations after the 11 digits
    // for (let startingDigit = 9; startingDigit > 0; startingDigit--) {
    //   let previousDigitIndex = 0;

    //   while (previousDigitIndex > -1) {
    //     const index = bank.indexOf(
    //       startingDigit.toString(),
    //       previousDigitIndex,
    //     );
    //     if (index === -1) break;

    //     previousDigitIndex = index + 1;

    //     if (index + 11 > bank.length - 1) break;

    //     // here that's where I should check all the combinations
    //     // probably do recursion to find first possible 9, then 8, etc.
    //     const batteries = parseInt(bank.slice(index, index + 12));
    //     max = Math.max(max, batteries);
    //   }
    // }

    const max = findDigit(bank, 0, 9, 0);
    console.log(max);

    sum += max;
  }

  return sum;
}
