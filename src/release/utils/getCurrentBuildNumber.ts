import { getPackageJson } from "./getPackageJson";

export const getCurrentBuildNumber = () => {
  const packageJson = getPackageJson();

  const packageJsonBuildNumberSearchResult = packageJson.match(
    /"buildNumber": "(\d)+"/
  );

  if (packageJsonBuildNumberSearchResult !== null) {
    return packageJsonBuildNumberSearchResult[0].match(/(\d)+/)![0];
  }
};
