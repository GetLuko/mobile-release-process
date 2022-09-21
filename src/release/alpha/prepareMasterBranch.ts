import Listr from "listr";
import pipe from "lodash/fp/pipe";

import { checkout, pull, push, merge, tag } from "../../git/commands";
import { alpha, MASTER_BRANCH } from "../../git/git.config";
import { print } from "../../utils/print";

async function releaseMasterBranch(releaseNumber: string) {
  print({ message: "\nRelease master branch 🚀" });

  const tasks = new Listr([
    {
      title: "Switch on master branch",
      task: () => checkout(MASTER_BRANCH),
    },
    {
      title: "Pull changes from the master remote branch",
      task: () => pull(MASTER_BRANCH),
    },
    {
      title: "Merge master with the alpha branch changes",
      task: () => pipe(alpha, merge)(releaseNumber),
    },
    {
      title: `Tag the release ${releaseNumber}`,
      task: () => tag(`v${releaseNumber}`),
    },
    {
      title: "Update remote master branch and trigger Bitrise pipeline",
      task: async () => {
        await push(MASTER_BRANCH);
        await push(`v${releaseNumber}`);
      },
    },
  ]);

  await tasks.run();
}

export default releaseMasterBranch;
