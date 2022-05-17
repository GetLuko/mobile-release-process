import Listr from "listr";
import { pipe } from "lodash/fp";

import { alpha, dev } from "../git/git.config";
import { checkout, commit, merge, pull, push } from "../git/git.utils";
import { print } from "../script.utils";
import { bumpBuildNumber } from "./bumpBuildNumber";
import { bumpVersionNumber } from "./bumpVersionNumber";
import {
  getCurrentAppVersion,
  getCurrentBuildNumber,
  incrementAppVersion,
  incrementBuildNumber,
} from "./release.utils";

async function prepareNextRelease(releaseNumber: string) {
  print({ message: "Prepare next release 🚀" });

  const tasks = new Listr([
    {
      title: "Switch on alpha branch",
      task: async () => pipe(alpha, checkout)(releaseNumber),
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
      task: () => checkout(dev),
    },
    {
      title: "Update dev branch",
      task: () => pull(dev),
    },
    {
      title: "Merge local alpha branch on dev",
      task: async () => pipe(alpha, merge)(releaseNumber),
    },
    {
      title: "Update the remote branch dev",
      task: async () => push(dev),
    },
  ]);

  await tasks.run();
}

export default prepareNextRelease;
