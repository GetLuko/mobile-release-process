import { getIncrementNumber } from "../getIncrementNumber";

describe("getIncrementNumber", () => {
  it("should return 1 when versionName is patch", () => {
    const versionName = "patch";
    const result = getIncrementNumber(versionName);
    expect(result).toBe(1);
  });

  it("should return 10 when versionName is minor", () => {
    const versionName = "minor";
    const result = getIncrementNumber(versionName);
    expect(result).toBe(10);
  });
});
