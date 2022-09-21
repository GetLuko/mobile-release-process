export const getAppVersionFromTag = (versionTag: string) => {
  if (versionTag.length < 2 || versionTag.charAt(0) !== "v") {
    return;
  }

  return versionTag.substring(1);
};
