import { regex } from "arkregex";

const OPERATOR_REGEX = regex("\\s*([+*])\\s*", "g");
const OPERAND_REGEX = regex("\\s*(\\d+)\\s*");

export function runPart1(input: string) {
  const lines = input.trim().split("\n");

  // okay I think it should go like this:
  // first we get all the operators and their position on the sheet
  // then we go search for the operator position but on other lines
  // using a regex to allow for multiple spaces at the beginning (optional) or at the end (mandatory)
  // and that will construct the operation to be executed

  let sum = 0;
  const operators = lines.at(-1)!;

  let matches;
  while ((matches = OPERATOR_REGEX.exec(operators))) {
    const [, operator] = matches;
    const { index } = matches;

    let operation = operator === "+" ? 0 : 1;
    for (let i = 0; i < lines.length - 1; i++) {
      const toSearch = lines[i]?.slice(index)!;
      const operandMatches = OPERAND_REGEX.exec(toSearch)!;
      const operand = parseInt(operandMatches[1]);

      operation = operator === "+" ? operation + operand : operation * operand;
    }

    sum += operation;
  }

  return sum;
}
