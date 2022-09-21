import isArray from "lodash.isarray";
import isEmpty from "lodash.isempty";
import overEvery from "lodash.overevery";

import { Answer } from "../patch/preparePatch";

export const isStringList = overEvery<Answer["commitList"]>([
  isArray,
  (list) => !isEmpty(list),
  (list) => list.every((commit) => typeof commit === "string"),
]);
