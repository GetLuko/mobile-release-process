import { getAppVersionFromTag } from "../getAppVersionFromTag";

describe("getAppVersionFromTag", () => {
  it("should return the app version from the version tag", () => {
    const versionTag = "v1.2.3";
    const result = getAppVersionFromTag(versionTag);
    expect(result).toBe("1.2.3");
  });
  it("should return undefined when the version tag is empty", () => {
    const versionTag = "";
    const result = getAppVersionFromTag(versionTag);
    expect(result).toBeUndefined();
  });
  it("should return undefined from invalid tag", () => {
    const versionTag = "a1.2.3";
    const result = getAppVersionFromTag(versionTag);
    expect(result).toBeUndefined();
  });
});
