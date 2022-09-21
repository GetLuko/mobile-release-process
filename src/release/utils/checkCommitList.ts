import isNil from "lodash.isnil";

import { isStringList } from "./isStringList";

export const checkCommitList = (commitList: any): boolean => {
  if (isNil(commitList)) {
    return false;
  }
  return isStringList(commitList);
};
