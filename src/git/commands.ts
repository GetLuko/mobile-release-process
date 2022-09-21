import { asyncExec, AsyncExecParameters } from "../utils/asyncExec";

export const checkout = (branch: string) =>
  asyncExec({ command: `git checkout`, args: [branch], onError: "throw" });

export const createBranch = (
  branch: string,
  onError: AsyncExecParameters["onError"] = "throw"
) => asyncExec({ command: `git branch`, args: [branch], onError });

export const pull = (branch: string) =>
  asyncExec({
    command: `git pull origin`,
    args: [branch],
    onError: "throw",
  });

export const fetch = (args = "--tags -f") =>
  asyncExec({ command: `git fetch`, args: [args], onError: "throw" });

export const changelog = () =>
  asyncExec({
    command: `yarn changelog`,
    args: [],
    onError: "throw",
  });

export const commit = ({
  message,
  noVerify = false,
}: {
  message: string;
  noVerify?: boolean;
}) =>
  asyncExec({
    command: `git commit`,
    args: ["-am", `"${message}"`, noVerify ? "--no-verify" : ""],
    onError: "throw",
  });

export const push = (branch: string) =>
  asyncExec({
    command: `git push origin`,
    args: [branch],
    onError: "throw",
  });

export const merge = (branch: string) =>
  asyncExec({
    command: `git merge`,
    args: [branch],
    onError: "throw",
  });

export const tag = (args: string) =>
  asyncExec({
    command: `git tag`,
    args: [args],
    onError: "throw",
  });

export const deleteLocalBranch = (branch: string) =>
  asyncExec({
    command: `git branch `,
    args: ["-D", branch],
    onError: "throw",
  });

export const deleteRemoteBranch = (branch: string) =>
  asyncExec({
    command: `git push origin `,
    args: ["--delete", branch],
    onError: "throw",
  });

export const cherryPick = (
  commit: string,
  onError: AsyncExecParameters["onError"] = "throw"
) =>
  asyncExec({
    command: `git cherry-pick`,
    args: [commit],
    onError,
  });
