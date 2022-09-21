import { getPackageJson } from "./getPackageJson";

export const getCurrentAppVersion = () => {
  const packageJson = getPackageJson();
  const packageJsonVersionNumberSearchResult = packageJson.match(
    /"version": "(\d|\.)+"/
  );

  if (packageJsonVersionNumberSearchResult !== null) {
    return packageJsonVersionNumberSearchResult[0].match(/(\d|\.)+/)?.[0];
  }
  return;
};
