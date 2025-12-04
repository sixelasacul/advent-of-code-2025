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

export function runPart2(input: string) {
  const map = input
    .trim()
    .split("\n")
    .map((line) => line.split(""));

  let canContinue = true;
  let count = 0;

  // sub-optimal here too, that's a lot of loops
  // another to do it would be to go through the map once, and do a proper mapping of all the paper rolls, and store connected paper rolls
  // once we remove a paper roll, we can do like a render, and check connected paper rolls, update their connections, see if they would be accessible,
  // and "re-render" again. That'd be more localized, and wouldn't require a full loop on the whole map
  // we'd need a graph
  while (canContinue) {
    const accessiblePaperRolls = new Set<Coordinates>();

    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y]!.length; x++) {
        const cell = map[y]![x];
        if (cell !== "@") continue;

        const paperRolls = getAdjacentPaperRolls(map, x, y);

        if (paperRolls.length < 4) {
          accessiblePaperRolls.add({ x, y });
          count++;
        }
      }
    }

    if (accessiblePaperRolls.size === 0) {
      canContinue = false;
      break;
    }

    for (const { x, y } of accessiblePaperRolls) {
      map[y]![x] = ".";
    }
  }

  return count;
}
