import { checkReleaseNumber } from "../checkReleaseNumber";

describe("checkReleaseNumber", () => {
  it("should return false if the releaseNumber is undefined", () => {
    const releaseNumber = undefined;
    const result = checkReleaseNumber({ releaseNumber });
    expect(result).toBe(false);
  });
  it("should return false if the releaseNumber is not a semver", () => {
    const releaseNumber = "a.b.c";
    const result = checkReleaseNumber({ releaseNumber });
    expect(result).toBe(false);
  });
  it("should return true if the releaseNumber is a semver", () => {
    const releaseNumber = "1.2.3";
    const result = checkReleaseNumber({ releaseNumber });
    expect(result).toBe(true);
  });
});
