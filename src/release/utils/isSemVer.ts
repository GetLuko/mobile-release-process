import overEvery from "lodash.overevery";

import { AnswerReleaseNumber } from "../patch/prepareAlphaBranch";

export const isSemVer = overEvery<AnswerReleaseNumber["releaseNumber"]>([
  (releaseNumber) => typeof releaseNumber === "string",
  (releaseNumber) => releaseNumber.split(".").length === 3,
  (releaseNumber) => releaseNumber.split(".").every((number) => number.match(/^\d+$/)),
]);
