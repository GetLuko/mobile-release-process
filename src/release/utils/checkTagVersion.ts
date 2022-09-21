import isNil from "lodash.isnil";
import isString from "lodash.isstring";

import { CheckTagVersion } from "../patch/prepareAlphaPatchBranch";
import { getAppVersionFromTag } from "./getAppVersionFromTag";
import { isSemVer } from "./isSemVer";

export const checkTagVersion = (answer: any): answer is CheckTagVersion => {
  const versionTag = answer?.versionTag;

  if (isNil(versionTag) || !isString(versionTag)) {
    return false;
  }

  const version = getAppVersionFromTag(versionTag);

  if (version === undefined) {
    return false;
  }

  return isSemVer(version);
};
