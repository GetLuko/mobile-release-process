import Listr from "listr";

import { checkout, fetch, pull } from "../../git/commands";
import { DEV_BRANCH } from "../../git/git.config";
import { print } from "../../utils/print";

const alphaPatchPreparations = async () => {
  print({ message: "Groundwork" });

  const tasks = new Listr([
    {
      title: "Fetch branches and tags",
      task: () => fetch(),
    },
    {
      title: `Checkout on ${DEV_BRANCH} branch`,
      task: () => checkout(DEV_BRANCH),
    },
    {
      title: `Update the ${DEV_BRANCH} branch`,
      task: () => pull(DEV_BRANCH),
    },
  ]);

  return tasks.run();
};

export default alphaPatchPreparations;
