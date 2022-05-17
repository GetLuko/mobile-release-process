import { prompt } from 'enquirer';
import fs from 'fs';
import path from 'path';

import { files } from '../constants';
import { throwError } from '../script.utils';
import { incrementAppVersion } from './release.utils';

const askNextVersionNumber = async (version: string) => {
  const { newVersion } = await prompt<{ newVersion: string }>({
    type: 'input',
    name: 'newVersion',
    message: 'What is the new version to bump to? [X.Y.ZZZ]',
    initial: incrementAppVersion({ version }),
  });

  return newVersion;
};

export async function bumpVersionNumber(nextVersion?: string) {
  const baseDir = path.join(__dirname, '../../');

  const packageJson = fs.readFileSync(
    path.join(baseDir, files.packageJson),
    'utf8'
  );

  const packageJsonVersionNumberSearchResult = packageJson.match(
    /"version": "(\d|\.)+"/
  );

  if (packageJsonVersionNumberSearchResult == null) {
    throwError('version property is not found in package.json');
    return;
  }

  const version = packageJsonVersionNumberSearchResult[0].match(/(\d|\.)+/)![0];

  const newVersion = nextVersion || (await askNextVersionNumber(version));

  const updatedPackageJson = packageJson.replace(
    `"version": "${version}"`,
    `"version": "${newVersion}"`
  );

  fs.writeFileSync(
    path.join(baseDir, files.packageJson),
    updatedPackageJson,
    'utf8'
  );

  const infoPlist = fs.readFileSync(
    path.join(baseDir, files.infoPlist),
    'utf8'
  );

  if (infoPlist.indexOf(version) === -1) {
    throwError('Build number inside Info.plist does not match to package.json');
  }

  const updatedInfoPlist = infoPlist.replace(version, newVersion);
  fs.writeFileSync(
    path.join(baseDir, files.infoPlist),
    updatedInfoPlist,
    'utf8'
  );

  const buildGradle = fs.readFileSync(
    path.join(baseDir, files.buildGradle),
    'utf8'
  );
  if (buildGradle.indexOf(version) === -1) {
    throwError(
      'Build number inside build.gradle does not match to package.json'
    );
  }

  const updatedBuildGradle = buildGradle.replace(version, newVersion);
  fs.writeFileSync(
    path.join(baseDir, files.buildGradle),
    updatedBuildGradle,
    'utf8'
  );
}
