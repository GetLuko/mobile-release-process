import { checkTagVersion } from "../checkTagVersion";

describe("checkTagVersion", () => {
  it("should return false if the versionTag is undefined", () => {
    const versionTag = undefined;
    const result = checkTagVersion({ versionTag });
    expect(result).toBe(false);
  });
  it("should return false if the versionTag is null", () => {
    const versionTag = null;
    const result = checkTagVersion({ versionTag });
    expect(result).toBe(false);
  });
  it("should return false if the versionTag is not a string", () => {
    const versionTag = [1, 2, 3];
    const result = checkTagVersion({ versionTag });
    expect(result).toBe(false);
  });
  it("should return true if the versionTag is a string", () => {
    const versionTag = "v1.2.3";
    const result = checkTagVersion({ versionTag });
    expect(result).toBe(true);
  });
});
