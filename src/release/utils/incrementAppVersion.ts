import isNil from "lodash.isnil";

import { isSemVer } from "./isSemVer";

export const incrementAppVersion = ({
  version,
  by = 10,
}: {
  version: any;
  by?: number;
}) => {
  if (isNil(version) || !isSemVer(version)) {
    return;
  }

  const major = version.split(".")[0];
  const minor = version.split(".")[1];
  const patch = version.split(".")[2];
  const bumpedPatch = Number(patch) + by;

  return `${major}.${minor}.${bumpedPatch}`;
};
