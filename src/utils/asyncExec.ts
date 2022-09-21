import { exec } from "child_process";
import util from "util";

import { prepareShellCommand } from "./prepareShellCommand";
import { print } from "./print";
import { throwError } from "./throwError";

export type AsyncExecParameters = {
  command: string;
  args: string[];
  onError: ((error: any) => Promise<void>) | "throw" | "ignore" | "exit";
};

export const execute = util.promisify(exec);

export const asyncExec = async (params: AsyncExecParameters) => {
  const command = prepareShellCommand(params);
  try {
    const output = await execute(command);
    return output.stdout?.trim() || "";
  } catch (error: any) {
    if (params.onError === "ignore") {
      return;
    }

    if (typeof params.onError === "function") {
      await params.onError(error);
      return;
    }

    const fallback = `command "${command}" failed`;

    print({
      message: `❌ ${error?.message ?? fallback}`,
      type: "error",
    });

    if (params.onError === "throw") {
      throw error;
    }

    return throwError(error?.message ?? command);
  }
};
