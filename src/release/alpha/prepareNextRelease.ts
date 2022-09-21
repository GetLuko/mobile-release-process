import Listr from "listr";
import pipe from "lodash/fp/pipe";

import { checkout, commit, merge, pull, push } from "../../git/commands";
import { alpha, DEV_BRANCH } from "../../git/git.config";
import { print } from "../../utils/print";
import { bumpBuildNumber } from "../buildNumber/bumpBuildNumber";
import { bumpVersionNumber } from "../buildNumber/bumpVersionNumber";
import { getCurrentAppVersion } from "../utils/getCurrentAppVersion";
import { getCurrentBuildNumber } from "../utils/getCurrentBuildNumber";
import { incrementAppVersion } from "../utils/incrementAppVersion";
import { incrementBuildNumber } from "../utils/incrementBuildNumber";

async function prepareNextRelease(releaseNumber: string) {
  print({ message: "Prepare next release 🚀" });

  const tasks = new Listr([
    {
      title: "Switch on alpha branch",
      task: async () => await pipe(alpha, checkout)(releaseNumber),
    },
    {
      title: "Bump app version",
      task: async () => {
        const currentVersion = await getCurrentAppVersion();
        const nextVersion = incrementAppVersion({ version: currentVersion });
        await bumpVersionNumber(nextVersion);
      },
    },
    {
      title: "Bump build number",
      task: async () => {
        const currentBuildNumber = await getCurrentBuildNumber();
        const nextBuildNumber = incrementBuildNumber({
          buildNumber: currentBuildNumber,
        });
        await bumpBuildNumber(nextBuildNumber);
      },
    },
    {
      title: "Commit build & app bump",
      task: () =>
        commit({
          message: "Core - Release feat: bump version",
          noVerify: true,
        }),
    },
    {
      title: "Checkout on dev",
      task: () => checkout(DEV_BRANCH),
    },
    {
      title: "Update dev branch",
      task: () => pull(DEV_BRANCH),
    },
    {
      title: "Merge local alpha branch on dev",
      task: async () => await pipe(alpha, merge)(releaseNumber),
    },
    {
      title: "Update the remote branch dev",
      task: async () => await push(DEV_BRANCH),
    },
  ]);

  await tasks.run();
}

export default prepareNextRelease;
