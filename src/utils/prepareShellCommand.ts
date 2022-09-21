import { AsyncExecParameters } from "./asyncExec";

export const prepareShellCommand = ({ command, args }: AsyncExecParameters) =>
  [command, args.join(" ")].join(" ");
