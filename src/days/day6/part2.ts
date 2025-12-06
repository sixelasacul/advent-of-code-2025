import { regex } from "arkregex";

const OPERATOR_REGEX = regex("\\s*([+*])\\s*", "g");
const OPERAND_REGEX = regex("(\\s*\\d+\\s*)");

/*
abcd
efgh
ijkl
--->
dhl
cgk
bfj
aei
*/
function flipMatrix(matrix: string[][]) {
  const newMatrix: string[][] = [];
  const maxX = matrix[0]!.length - 1;

  for (let x = maxX; x >= 0; x--) {
    for (let y = 0; y < matrix.length; y++) {
      const value = matrix[y]![x]!;
      const newX = y;
      const newY = maxX - x;

      newMatrix[newY] = newMatrix[newY] ?? [];
      newMatrix[newY]![newX] = newMatrix[newY]![newX]! ?? [];
      newMatrix[newY]![newX]! = value;
    }
  }
  return newMatrix;
}

function formatOperands(matrix: string[][]) {
  return matrix.map((row) => parseInt(row.join("")));
}

// REALLY MAKE SURE THAT THE INPUT FILE ISN'T FORMATTED BY THE IDE
export function runPart2(input: string) {
  console.log(
    "REALLY MAKE SURE THAT THE INPUT FILE ISN'T FORMATTED BY THE IDE",
  );
  const lines = input.split("\n");
  const operators = lines.at(-1)!;

  let sum = 0;
  let matches;

  while ((matches = OPERATOR_REGEX.exec(operators))) {
    const [group, operator] = matches;
    const { index } = matches;
    // edge case, can't find a way to make remove the extra space between operations except at the end
    const operandLength =
      index + group.length === operators.length
        ? group.length
        : group.length - 1;

    let operands: string[][] = [];
    for (let i = 0; i < lines.length - 1; i++) {
      const toSearch = lines[i]?.slice(index)!;
      const operandMatches = OPERAND_REGEX.exec(toSearch)!;
      operands.push(operandMatches[1].slice(0, operandLength).split(""));
    }
    const flippedOperands = formatOperands(flipMatrix(operands));

    const operation = flippedOperands.reduce(
      (total, operand) =>
        operator === "+" ? total + operand : total * operand,
      operator === "+" ? 0 : 1,
    );

    sum += operation;
  }

  return sum;
}
