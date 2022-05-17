import chalk from "chalk";
import util from "util";

const exec = util.promisify(require("child_process").exec);

const genericCommandError = (command: string) => `command "${command}" failed`;

export const asyncExec = async (command: string) => {
  try {
    await exec(command);
  } catch (error: any) {
    print({
      message: `❌ ${error?.message ?? genericCommandError(command)}`,
      type: "error",
    });
    process.exit(1);
  }
};

export const log = console.log;

type Print = {
  message: string;
  type?: "error" | "warning" | "neutral" | "success";
};

export const print = ({ message, type }: Print) => {
  switch (type) {
    case "error":
      log(chalk.red.bold(message));
      break;
    case "warning":
      log(chalk.yellow.bold(message));
      break;
    case "neutral":
      log(chalk.blue.bold(message));
      break;
    case "success":
      log(chalk.green.bold(message));
      break;
    default:
      log(chalk.blue.bold(message));
      break;
  }
};

export const throwError = (message: string) => {
  print({ message: "ERROR: " + message });
  process.exit(1);
};

const isProduction: boolean = process.env.NODE_ENV === "production";
const prefix = "[invariant]";

export function invariant(
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

export const getErrorMessage = ({
  error,
  fallbackMessage,
}: {
  error: unknown;
  fallbackMessage: string;
}) => {
  if (error instanceof Error) {
    return error.message;
  } else {
    return fallbackMessage;
  }
};
