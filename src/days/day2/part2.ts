import { regex } from "arkregex";

const DUPLICATE_ID = regex("^(\\d+)(\\1)+$");

// 4174379265 too low

export function runPart2(input: string) {
  const ranges = input.split(",");
  let sumDuplicates = 0;

  for (const range of ranges) {
    const [start = "0", end = "0"] = range.split("-");

    // definitely not opti
    for (let id = parseInt(start); id <= parseInt(end); id++) {
      if (DUPLICATE_ID.test(id.toString())) {
        sumDuplicates += id;
      }
    }
  }

  return sumDuplicates;
}
