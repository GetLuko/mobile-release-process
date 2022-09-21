import isNil from "lodash.isnil";

import { AnswerReleaseNumber } from "../patch/prepareAlphaBranch";
import { isSemVer } from "./isSemVer";

export const checkReleaseNumber = (answer: {
  releaseNumber?: string;
}): answer is AnswerReleaseNumber => {
  if (isNil(answer) || isNil(answer.releaseNumber)) {
    return false;
  }

  return isSemVer(answer.releaseNumber);
};
