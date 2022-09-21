import { prompt } from "enquirer";
import { RELEASE_BRANCH } from "../../config";

import { checkout, createBranch } from "../../git/commands";
import { getLatestTag } from "../../git/getLatestTag";
import { GIT_BRANCH_ALREADY_EXISTS } from "../../git/git.config";
import invariant from "../../utils/invariant";
import { print } from "../../utils/print";
import { throwError } from "../../utils/throwError";
import { checkTagVersion } from "../utils/checkTagVersion";
import { getAppVersionFromTag } from "../utils/getAppVersionFromTag";
import { incrementAppVersion } from "../utils/incrementAppVersion";

export type CheckTagVersion = {
  versionTag: string;
};

const askVersionTag = async () => {
  const latestTag = await getLatestTag();
  const answer = await prompt<CheckTagVersion>({
    type: "input",
    name: "versionTag",
    message: "What is the version tag of the app you need to patch v.X.Y.ZZZ ?",
    initial: latestTag,
    required: true,
  });

  invariant(checkTagVersion(answer), "Alpha patch script", "tag version is not valid");
  return answer.versionTag;
};

const onCreateReleaseBranchError = async (error: any) => {
  if (error?.code === GIT_BRANCH_ALREADY_EXISTS) {
    print({
      message: `⚠️ ${RELEASE_BRANCH} branch already exists`,
      type: "warning",
    });
    return;
  }
  throwError(`${RELEASE_BRANCH} branch creation aborted`);
};

const createReleaseBranch = async (versionTag: string) => {
  await checkout(versionTag);
  const version = getAppVersionFromTag(versionTag);
  const bumpedAppVersion = incrementAppVersion({
    version,
    by: 1,
  });

  if (bumpedAppVersion === undefined) {
    return throwError(`${RELEASE_BRANCH} branch creation aborted, can not bump app version`);
  }

  const releaseBranch = `${RELEASE_BRANCH}-${bumpedAppVersion}`;

  const answer = await prompt({
    type: "confirm",
    name: "question",
    message: `${releaseBranch} branch will be created. Do you want to continue ?`,
  });

  if (!answer) {
    throwError(`${RELEASE_BRANCH} branch creation aborted`);
  }
  await checkout(versionTag);
  await createBranch(releaseBranch, onCreateReleaseBranchError);

  return { bumpedAppVersion, releaseBranch };
};

export const prepareAlphaPatchBranch = async () => {
  print({ message: "\nRelease branch creation" });
  const versionTag = await askVersionTag();
  const { bumpedAppVersion, releaseBranch } = await createReleaseBranch(versionTag);
  await checkout(releaseBranch);
  return bumpedAppVersion;
};
