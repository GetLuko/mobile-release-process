import isNil from "lodash.isnil";

import { CheckSubmitCommit } from "../patch/prepareAlphaBranch";

export const checkSubmitCommit = (answer: any): answer is CheckSubmitCommit => {
  if (isNil(answer?.submitCommit)) {
    return false;
  }

  return typeof answer.submitCommit === "boolean";
};
