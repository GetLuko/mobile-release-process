import { incrementBuildNumber } from "../incrementBuildNumber";

describe("incrementBuildNumber", () => {
  it("should return 1010 when version is 1000", () => {
    const buildNumber = "1000";
    const result = incrementBuildNumber({ buildNumber, by: 10 });
    expect(result).toBe("1010");
  });

  it("should return undefined when version is not a number", () => {
    const buildNumber = "aaaa";
    const result = incrementBuildNumber({ buildNumber, by: 10 });
    expect(result).toBeUndefined();
  });

  it("should return undefined when version is 1000", () => {
    const buildNumber = null;
    const result = incrementBuildNumber({ buildNumber, by: 10 });
    expect(result).toBeUndefined();
  });
});
