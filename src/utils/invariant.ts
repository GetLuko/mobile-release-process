const isProduction: boolean = process.env.NODE_ENV === "production";
const prefix = "[invariant]";

export default function invariant(
  condition: boolean,
  context: string,
  message: string
): asserts condition {
  if (condition) {
    return;
  }

  if (isProduction) {
    throw new Error(prefix);
  }

  const value = `${prefix} ${context} ${message}`;

  throw new Error(value);
}
