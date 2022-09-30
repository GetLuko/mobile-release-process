import { RELEASE_CI_URL, RELEASE_BRANCH, STAGING_BRANCH } from "../../config";
import { checkout, createBranch, push } from "../../git/commands";
import { ask } from "../../utils/ask";
import { print } from "../../utils/print";

export const createStagingBranch = async (appVersion: string) => {
  print({ message: `\nCreate a ${STAGING_BRANCH} branch` });

  const answer = await ask({
    message: `Do you want to create a ${STAGING_BRANCH} build for this patch?`,
  });

  if (answer === true) {
    const stagingBranch = `${STAGING_BRANCH}-${appVersion}`;

    await createBranch(stagingBranch);
    await push(stagingBranch);

    print({
      message: `Create manualy your Bitrise build here => ${RELEASE_CI_URL}`,
    });

    const qaAnswer = await ask({
      message: `Time for QA ! We don't want to introduce a new bug directly into production, do we?
      Enter Yes if you want to continue
      Enter No if you want to stop here
      
      you can run: 
      git tag v${appVersion}
      git push origin ${RELEASE_BRANCH}-${appVersion} to ship the patch later`,
    });

    if (qaAnswer === false) {
      await checkout(`dev`);
      process.exit();
    }

    await checkout(`${RELEASE_BRANCH}-${appVersion}`);
  }
};
