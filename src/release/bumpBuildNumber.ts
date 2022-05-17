import { prompt } from "enquirer";
import fs from "fs";
import path from "path";

import { files } from "../configuration";
import { throwError } from "../script.utils";
import { incrementBuildNumber } from "./release.utils";

const askNextBuildNumber = async (currentBuildNumber: string) => {
  const { newBuildNumber } = await prompt<{ newBuildNumber: string }>({
    type: "input",
    name: "newBuildNumber",
    message: "What is the new buildNumber to bump to?",
    initial: incrementBuildNumber({ buildNumber: currentBuildNumber }),
  });

  return newBuildNumber;
};

export async function bumpBuildNumber(nextBuildNumber?: string) {
  const baseDir = path.join(__dirname, "../../");

  const packageJson = fs.readFileSync(
    path.join(baseDir, files.packageJson),
    "utf8"
  );

  const packageJsonBuildNumberSearchResult = packageJson.match(
    /"buildNumber": "(\d)+"/
  );

  if (packageJsonBuildNumberSearchResult == null) {
    throwError("buildNumber property is not found in package.json");
    return;
  }

  const buildNumber = packageJsonBuildNumberSearchResult[0].match(/(\d)+/)![0];

  const newBuildNumber =
    nextBuildNumber || (await askNextBuildNumber(buildNumber));

  const updatedPackageJson = packageJson.replace(
    `"buildNumber": "${buildNumber}"`,
    `"buildNumber": "${newBuildNumber}"`
  );

  fs.writeFileSync(
    path.join(baseDir, files.packageJson),
    updatedPackageJson,
    "utf8"
  );

  const infoPlist = fs.readFileSync(
    path.join(baseDir, files.infoPlist),
    "utf8"
  );

  if (infoPlist.indexOf(buildNumber) === -1) {
    throwError("Build number inside Info.plist does not match to package.json");
  }

  const updatedInfoPlist = infoPlist.replace(buildNumber, newBuildNumber);
  fs.writeFileSync(
    path.join(baseDir, files.infoPlist),
    updatedInfoPlist,
    "utf8"
  );

  const buildGradle = fs.readFileSync(
    path.join(baseDir, files.buildGradle),
    "utf8"
  );
  if (buildGradle.indexOf(buildNumber) === -1) {
    throwError(
      "Build number inside build.gradle does not match to package.json"
    );
  }

  const updatedBuildGradle = buildGradle.replace(buildNumber, newBuildNumber);
  fs.writeFileSync(
    path.join(baseDir, files.buildGradle),
    updatedBuildGradle,
    "utf8"
  );
}
