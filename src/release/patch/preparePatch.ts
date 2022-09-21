import { prompt } from "enquirer";
import Listr from "listr";

import { changelog, cherryPick, commit } from "../../git/commands";
import { GIT_FUSION_CONFLICT } from "../../git/git.config";
import { ask } from "../../utils/ask";
import invariant from "../../utils/invariant";
import { print } from "../../utils/print";
import { throwError } from "../../utils/throwError";
import { ExecException } from "../../utils/types";
import { bumpBuildNumber } from "../buildNumber/bumpBuildNumber";
import { bumpVersionNumber } from "../buildNumber/bumpVersionNumber";
import { checkCommitList } from "../utils/checkCommitList";
import { getCurrentBuildNumber } from "../utils/getCurrentBuildNumber";
import { incrementBuildNumber } from "../utils/incrementBuildNumber";
import { saveChangelog } from "./saveChangelog";

type Key = string;

export type Answer = {
  commitList: Key[];
};

const onCherryPickError = async (error: ExecException) => {
  if (error?.code === GIT_FUSION_CONFLICT) {
    print({ message: error?.stdout ?? "", type: "warning" });
    print({ message: error?.stderr ?? "", type: "warning" });
    await ask({
      message: "Have you resolved the conflicts ?",
      onAccept: () => cherryPick("--continue", onCherryPickError),
      onDenied: () => {
        cherryPick("--abort");
        throwError("Can not apply patches");
      },
    });
    return;
  }

  print({
    message: `❌ ${error?.message}`,
    type: "error",
  });

  throwError("Can not apply patches");
};

const applyPatches = async (commitList: string[]) => {
  const commits = commitList.join(" ");
  await cherryPick(commits, onCherryPickError);
};

export const preparePatch = async ({ appVersion }: { appVersion: string }) => {
  print({ message: "\nPatch preparation" });
  const answer = await prompt<Answer>({
    type: "list",
    name: "commitList",
    message: "Type a commit list to cherry-pick <SHA KEY>, <SHA KEY>, ...",
  });

  const commitList = answer?.commitList;

  invariant(
    checkCommitList(commitList),
    "Alpha patch script",
    "commit list is invalid"
  );

  await applyPatches(commitList);

  const tasks = new Listr([
    {
      title: "Bump app version",
      task: () => bumpVersionNumber(appVersion),
    },
    {
      title: "Bump build number",
      task: async () => {
        const currentBuildNumber = await getCurrentBuildNumber();
        const nextBuildNumber = incrementBuildNumber({
          buildNumber: currentBuildNumber,
          by: 1,
        });
        await bumpBuildNumber(nextBuildNumber);
      },
    },
    {
      title: "Commit build and version number",
      task: () =>
        commit({ message: `build and version number`, noVerify: true }),
    },
    {
      title: "Generate the changelog",
      task: changelog,
    },
    {
      title: "Save the changelog",
      task: () => saveChangelog(appVersion),
    },
  ]);

  await tasks.run();
};
