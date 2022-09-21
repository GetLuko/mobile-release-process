export const getIncrementNumber = (versionName: "patch" | "minor") =>
  versionName === "patch" ? 1 : 10;
