type Coordinates = { x: number; y: number };

function retrieveCoordinates(map: string[][], coordinates: Coordinates[]) {
  return coordinates.map(
    (coordinate) => map[coordinate.y]?.[coordinate.x] ?? "",
  );
}

function getAdjacentPaperRolls(map: string[][], x: number, y: number) {
  return retrieveCoordinates(map, [
    // same line
    { x: x - 1, y },
    { x: x + 1, y },
    // line above
    { x, y: y - 1 },
    { x: x - 1, y: y - 1 },
    { x: x + 1, y: y - 1 },
    // line below
    { x, y: y + 1 },
    { x: x - 1, y: y + 1 },
    { x: x + 1, y: y + 1 },
  ]).filter((character) => character === "@");
}

export function runPart1(input: string) {
  // can do everything in a single line map, that's probably more performant
  const map = input
    .trim()
    .split("\n")
    .map((line) => line.split(""));

  let count = 0;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y]!.length; x++) {
      const cell = map[y]![x];
      if (cell !== "@") continue;

      const paperRolls = getAdjacentPaperRolls(map, x, y);

      if (paperRolls.length < 4) {
        count++;
      }
    }
  }

  return count;
}
