import { checkTagVersion } from "../../utils/checkTagVersion";
import { getAppVersionFromTag } from "../../utils/getAppVersionFromTag";

describe("prepareAlphaPatchBranch", () => {
  describe("checkTagVersion", () => {
    it("should return false when tag version is null", () => {
      const tagVersion = null;
      const result = checkTagVersion(tagVersion);
      expect(result).toBe(false);
    });
    it("should return false when tag version is undefined", () => {
      const tagVersion = undefined;
      const result = checkTagVersion(tagVersion);
      expect(result).toBe(false);
    });
    it("should return false when tag version dont respect semantic version", () => {
      const tagVersion = { versionTag: "random string" };
      const result = checkTagVersion(tagVersion);
      expect(result).toBe(false);
    });
    it("should return false when tag version dont respect luko semantic tag (vX.Y.ZZZ)", () => {
      const tagVersion = { versionTag: "0.0.0" };
      const result = checkTagVersion(tagVersion);
      expect(result).toBe(false);
    });
    it("should return false when tag version respect luko semantic tag (vX.Y.ZZZ)", () => {
      const tagVersion = {};
      const result = checkTagVersion(tagVersion);
      expect(result).toBe(false);
    });
    it("should return true when tag version respect luko semantic tag (vX.Y.ZZZ)", () => {
      const tagVersion = { versionTag: "v0.0.1" };
      const result = checkTagVersion(tagVersion);
      expect(result).toBe(true);
    });
  });
  describe("getAppVersionFromTag", () => {
    it("should return 0.0.1 when tag version is v0.0.1", () => {
      const tagVersion = { versionTag: "v0.0.1" };
      const result = getAppVersionFromTag(tagVersion.versionTag);
      expect(result).toBe("0.0.1");
    });
  });
});
