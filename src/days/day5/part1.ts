export function runPart1(input: string) {
  const [ranges, products] = input
    .trim()
    .split("\n\n")
    .map((section) => section.split("\n"));

  let count = 0;
  for (const product of products ?? []) {
    const productId = parseInt(product);

    for (const range of ranges ?? []) {
      // could be done once before going through products
      const [min = Number.MAX_SAFE_INTEGER, max = Number.MIN_SAFE_INTEGER] =
        range.split("-").map((value) => parseInt(value));

      if (productId >= min && productId <= max) {
        count++;
        break;
      }
    }
  }

  return count;
}
