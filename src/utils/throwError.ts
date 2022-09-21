import { print } from "./print";

export const throwError = (message: string) => {
  print({ message: "ERROR: " + message });
  process.exit(1);
};
