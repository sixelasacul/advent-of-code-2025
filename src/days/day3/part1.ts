export function runPart1(input: string) {
  const banks = input.trim().split("\n");
  let sum = 0;

  for (const batteries of banks) {
    // sliding window, could be optimized i guess
    let max = 0;
    for (let i = 0; i < batteries.length; i++) {
      for (let j = i + 1; j < batteries.length; j++) {
        const battery = parseInt(`${batteries[i]}${batteries[j]}`);
        max = Math.max(max, battery);
      }
    }

    sum += max;
  }

  return sum;
}
