import chalk from "chalk";

export type Print = {
  message: string;
  type?: "error" | "warning" | "neutral" | "success";
};

// eslint-disable-next-line no-console
export const log = console.log;

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
