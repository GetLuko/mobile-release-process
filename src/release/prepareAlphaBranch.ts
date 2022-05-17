import { prompt } from "enquirer";
import Listr from "listr";
import { isNil, pipe } from "lodash/fp";

import { alpha } from "../git/git.config";
import { changelog, fetch, commit, checkout } from "../git/git.utils";
import { invariant, print } from "../script.utils";
import { checkReleaseNumber, getCurrentAppVersion } from "./release.utils";

export type AnswerReleaseNumber = {
  releaseNumber: string;
};

export type CheckSubmitCommit = {
  submitCommit: boolean;
};

const checkSubmitCommit = (answer: any): answer is CheckSubmitCommit => {
  if (isNil(answer) || isNil(answer?.submitCommit)) {
    return;
  }

  return typeof answer?.submitCommit === "boolean";
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

  invariant(checkReleaseNumber(answer), "Release script", "release number is not valid");

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
      task: async () => await pipe(alpha, checkout)(releaseNumber),
    },
    {
      title: "Generate the changelog",
      task: changelog,
    },
    {
      title: "Save the changelog",
      task: async () => await saveChangelog(releaseNumber),
    },
  ]);

  await tasks.run();
};

const saveChangelog = async (releaseNumber: string) => {
  const answer = await prompt({
    type: "confirm",
    name: "submitCommit",
    message: "Check the changelog and save it before continue \nDo you want to commit the changelog ?",
  });

  invariant(checkSubmitCommit(answer), "release script", "submitCommit answer is not valid");

  if (answer.submitCommit) {
    await commit({ message: `v${releaseNumber}`, noVerify: true });
    return;
  }
  process.exit(1);
};

async function prepareAlphaBranch() {
  const releaseNumber = await askReleaseNumber();
  print({ message: "Prepare the alpha branch & generate the changelog" });
  await generateChangelog(releaseNumber);
  return releaseNumber;
}

export default prepareAlphaBranch;
