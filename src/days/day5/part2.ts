export function runPart2(input: string) {
  const [ranges] = input
    .trim()
    .split("\n\n")
    .map((section) => section.split("\n"));

  const newRanges: [number, number][] = [];

  const sortedRanges = (ranges ?? [])
    .map((range) => range.split("-").map((value) => parseInt(value)))
    .toSorted(([aMin = 0], [bMin = 0]) => aMin - bMin);

  for (const [
    min = Number.MAX_SAFE_INTEGER,
    max = Number.MIN_SAFE_INTEGER,
  ] of sortedRanges) {
    let shouldPush = true;

    if (newRanges.length === 0) {
      newRanges.push([min, max]);
      shouldPush = false;
    }

    for (let i = 0; i < newRanges.length; i++) {
      const [rangeMin, rangeMax] = newRanges[i] ?? [0, 0];

      // 8-14 is larger than 10-12
      if (min < rangeMin && max > rangeMax) {
        newRanges[i] = [min, max];
        shouldPush = false;
        break;
      }

      // 10-12 is included in 8-14
      if (min > rangeMin && max < rangeMax) {
        shouldPush = false;
        break;
      }

      // 10-14 and 12-16 partially overlaps
      if (min >= rangeMin && min <= rangeMax && max >= rangeMax) {
        newRanges[i] = [rangeMin, max];
        shouldPush = false;
        break;
      }

      // 10-14 and 8-12 partially overlaps
      if (max >= rangeMin && max <= rangeMax && min <= rangeMin) {
        newRanges[i] = [min, rangeMax];
        shouldPush = false;
        break;
      }
    }

    if (shouldPush) {
      newRanges.push([min, max]);
    }
  }

  let total = 0;
  for (const [min, max] of newRanges) {
    total += max - min + 1;
  }

  return total;
}
