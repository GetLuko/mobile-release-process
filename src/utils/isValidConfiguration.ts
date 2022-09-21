import get from "lodash.get";
import isString from "lodash.isstring";
import overEvery from "lodash.overevery";
import { isStringOrUndefined } from "./isStringOrUndefined";
import { print } from "./print";

export type Configuration = {
  buildGradle: string;
  infoPlist: string;
  bitrise?: string;
  testflight?: string;
  playConsole?: string;
  notion?: string;
  git?: {
    devBranch?: string;
    alphaBranch?: string;
    masterBranch?: string;
    releaseBranch?: string;
    stagingBranch?: string;
  };
};

export const isValidConfiguration = (
  configuration: unknown
): configuration is Configuration => {
  const isValid = overEvery([
    (obj) => isString(get(obj, "buildGradle")),
    (obj) => isString(get(obj, "infoPlist")),
    isStringOrUndefined("bitrise"),
    isStringOrUndefined("testflight"),
    isStringOrUndefined("playConsole"),
    isStringOrUndefined("notion"),
    isStringOrUndefined("git.devBranch"),
    isStringOrUndefined("git.alphaBranch"),
    isStringOrUndefined("git.masterBranch"),
    isStringOrUndefined("git.releaseBranch"),
    isStringOrUndefined("git.stagingBranch"),
  ])(configuration);

  if (!isValid) {
    print({
      message: "Config file is not valid",
      type: "error",
    });
    return false;
  }
  return true;
};
