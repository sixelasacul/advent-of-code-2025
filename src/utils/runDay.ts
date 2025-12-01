import chalk from "chalk";
import { measurePerformance } from "./mesurePerformance.js";
import { readDayInput } from "./readInput.js";

function logPart(partNumber: number, partFunction: () => unknown) {
  const { duration, result } = measurePerformance(partFunction);
  console.log(
    `${chalk.dim(
      `[${duration.toFixed(2)}ms]`
    )} Part ${partNumber}: ${chalk.green(result)}`
  );
}

type PartFunction = (input: string) => number | void;

export function runDay(
  day: number,
  part1Function: PartFunction,
  part2Function: PartFunction = () => {}
) {
  console.group(chalk.underline(`Day ${day}`));
  const input = readDayInput(day);

  logPart(1, () => part1Function(input));
  logPart(2, () => part2Function(input));

  console.log("-----");
  console.groupEnd();
}
