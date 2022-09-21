export const splitByLines = (str: string) => {
  if (typeof str === "string") {
    return str.split("\n").filter((l) => l.length > 0);
  }
  return [];
};
