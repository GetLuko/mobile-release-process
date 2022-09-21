import { prompt } from "enquirer";

import { commit } from "../../git/commands";
import invariant from "../../utils/invariant";
import { checkSubmitCommit } from "../utils/checkSubmitCommit";

export const saveChangelog = async (releaseNumber: string) => {
  const answer = await prompt({
    type: "confirm",
    name: "submitCommit",
    message:
      "Check the changelog and save it before continue \nDo you want to commit the changelog ?",
  });

  invariant(
    checkSubmitCommit(answer),
    "release script",
    "submitCommit answer is not valid"
  );

  if (answer.submitCommit) {
    await commit({ message: `v${releaseNumber}`, noVerify: true });
    return;
  }
  process.exit(1);
};
