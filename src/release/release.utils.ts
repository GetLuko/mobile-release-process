import fs from "fs";
import { isNil, overEvery } from "lodash";
import path from "path";

import { files } from "../configuration";
import { AnswerReleaseNumber } from "./prepareAlphaBranch";

export const isSemVer = overEvery<AnswerReleaseNumber["releaseNumber"]>([
  (releaseNumber) => typeof releaseNumber === "string",
  (releaseNumber) => releaseNumber.split(".").length === 3,
  (releaseNumber) => releaseNumber.split(".").every((number) => number.match(/^\d+$/)),
  (releaseNumber) => releaseNumber.split(".").every((number) => typeof Number(number) === "number" && !isNaN(Number(number))),
]);

export const checkReleaseNumber = (answer: { releaseNumber?: string }): answer is AnswerReleaseNumber => {
  if (isNil(answer) || isNil(answer.releaseNumber)) {
    return false;
  }

  return isSemVer(answer.releaseNumber);
};

export const incrementAppVersion = ({ version, by = 10 }: { version: any; by?: number }) => {
  if (isNil(version) || !isSemVer(version)) {
    return;
  }

  const major = version.split(".")[0];
  const minor = version.split(".")[1];
  const patch = version.split(".")[2];
  const bumpedPatch = Number(patch) + by;

  return `${major}.${minor}.${bumpedPatch}`;
};

export const incrementBuildNumber = ({ buildNumber, by = 10 }: { buildNumber: any; by?: number }) => {
  const number = Number(buildNumber);

  if (isNil(buildNumber) || isNaN(number)) {
    return;
  }

  return (number + by).toString();
};

export const getPackageJson = () => {
  const baseDir = path.join(__dirname, "../../");
  return fs.readFileSync(path.join(baseDir, files.packageJson), "utf8");
};

export const getCurrentAppVersion = () => {
  const packageJson = getPackageJson();
  const packageJsonVersionNumberSearchResult = packageJson.match(/"version": "(\d|\.)+"/);

  if (packageJsonVersionNumberSearchResult === null) {
    throw new Error("Could not find 'version' in package.json");
  }

  return packageJsonVersionNumberSearchResult[0].match(/(\d|\.)+/)?.[0]!;
};

export const getCurrentBuildNumber = () => {
  const packageJson = getPackageJson();

  const packageJsonBuildNumberSearchResult = packageJson.match(/"buildNumber": "(\d)+"/);

  if (packageJsonBuildNumberSearchResult !== null) {
    return packageJsonBuildNumberSearchResult[0].match(/(\d)+/)![0];
  }
};
