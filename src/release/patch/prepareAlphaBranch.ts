import { prompt } from "enquirer";
import Listr from "listr";
import pipe from "lodash/fp/pipe";

import { changelog, fetch, checkout } from "../../git/commands";
import { alpha } from "../../git/git.config";
import invariant from "../../utils/invariant";
import { print } from "../../utils/print";
import { checkReleaseNumber } from "../utils/checkReleaseNumber";
import { getCurrentAppVersion } from "../utils/getCurrentAppVersion";
import { saveChangelog } from "./saveChangelog";

export type AnswerReleaseNumber = {
  releaseNumber: string;
};

export type CheckSubmitCommit = {
  submitCommit: boolean;
};

const askReleaseNumber = async () => {
  const currentAppVersion = await getCurrentAppVersion();
  const answer = await prompt({
    type: "input",
    name: "releaseNumber",
    message: "What is the release number X.Y.ZZZ ?",
    initial: currentAppVersion,
    required: true,
  });

  invariant(
    checkReleaseNumber(answer),
    "Release script",
    "release number is not valid"
  );

  return answer.releaseNumber;
};

const generateChangelog = async (releaseNumber: string) => {
  const tasks = new Listr([
    {
      title: "Fetch branches and tags",
      task: fetch,
    },
    {
      title: "Checkout on current alpha branch",
      task: async () => pipe(alpha, checkout)(releaseNumber),
    },
    {
      title: "Generate the changelog",
      task: changelog,
    },
    {
      title: "Save the changelog",
      task: async () => saveChangelog(releaseNumber),
    },
  ]);

  await tasks.run();
};

async function prepareAlphaBranch() {
  const releaseNumber = await askReleaseNumber();
  print({ message: "Prepare the alpha branch & generate the changelog" });
  await generateChangelog(releaseNumber);
  return releaseNumber;
}

export default prepareAlphaBranch;
