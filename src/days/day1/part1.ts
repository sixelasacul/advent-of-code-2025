import { regex } from "arkregex";

const DEFAULT_POSITION = 50;
const MAX_POSITION = 100;
const ROTATION_REGEX = regex("^(L|R)(\\d+)");

export function runPart1(input: string) {
  const rotations = input.trim().split("\n");
  let countLeftPointingAtZero = 0;
  let position = DEFAULT_POSITION;

  for (const rotation of rotations) {
    const parts = ROTATION_REGEX.exec(rotation);
    if (parts === null) continue;

    const [_, direction, distance] = parts;
    const directionNumber = direction === "L" ? -1 : 1;
    position += directionNumber * parseInt(distance);

    if (Math.abs(position % MAX_POSITION) === 0) countLeftPointingAtZero++;
  }

  return countLeftPointingAtZero;
}
