import { regex } from "arkregex";

const DEFAULT_POSITION = 50;
const MAX_POSITION = 100;
const ROTATION_REGEX = regex("^(L|R)(\\d+)$");

export function runPart2(input: string) {
  const rotations = input.trim().split("\n");
  let countPassedZero = 0;
  let position = DEFAULT_POSITION;

  for (const rotation of rotations) {
    const parts = ROTATION_REGEX.exec(rotation);
    if (parts === null) continue;

    const [_, direction, _distance] = parts;
    const directionNumber = direction === "L" ? -1 : 1;
    const distance = parseInt(_distance);

    for (let i = 0; i < distance; i++) {
      position += directionNumber;

      if (position === 100) {
        position = 0;
      }
      if (position === -1) {
        position = 99;
      }

      if (position === 0) {
        countPassedZero++;
      }
    }
  }

  return countPassedZero;
}

// initial try
// export function runPart2(input: string) {
//   const rotations = input.trim().split("\n");
//   let countPassedZero = 0;
//   let position = DEFAULT_POSITION;

//   for (const rotation of rotations) {
//     const parts = ROTATION_REGEX.exec(rotation);
//     if (parts === null) continue;

//     const [_, direction, distance] = parts;
//     const directionNumber = direction === "L" ? -1 : 1;

//     const prevFullRotations = Math.floor(position / MAX_POSITION);
//     const wasStoppedAtZero = Math.abs(position % MAX_POSITION) === 0;

//     const newPosition = position + directionNumber * parseInt(distance);
//     const nextFullRotations = Math.floor(newPosition / MAX_POSITION);
//     const hasStoppedAtZero = Math.abs(newPosition % MAX_POSITION) === 0;

//     position = newPosition;

//     const diff = Math.abs(nextFullRotations - prevFullRotations);

//     const count = Math.max(
//       hasStoppedAtZero ? 1 : 0,
//       wasStoppedAtZero && diff > 0 ? diff - 1 : diff,
//     );

//     countPassedZero += count;
//   }

//   return countPassedZero;
// }
