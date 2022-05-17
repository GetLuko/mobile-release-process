import Listr from "listr";
import { pipe } from "lodash/fp";

import { alpha, master } from "../git/git.config";
import { checkout, pull, push, merge, tag } from "../git/git.utils";
import { print } from "../script.utils";

async function prepareMasterBranch(releaseNumber: string) {
  print({ message: "\nPrepare master branch 🚀" });

  const tasks = new Listr([
    {
      title: "Switch on master branch",
      task: () => checkout(master),
    },
    {
      title: "Pull changes from the master remote branch",
      task: () => pull(master),
    },
    {
      title: "Merge master with the alpha branch changes",
      task: () => pipe(alpha, merge)(releaseNumber),
    },
    {
      title: `Tag the release ${releaseNumber}`,
      task: () => tag(releaseNumber),
    },
    {
      title: "Update remote master branch and trigger Bitrise pipeline",
      task: async () => {
        await push(master);
        await push(`v${releaseNumber}`);
      },
    },
  ]);

  await tasks.run();
}

export default prepareMasterBranch;
