import { isSemVer } from "../isSemVer";

describe("isSemVer", () => {
  it("should return true when version is valid", () => {
    const version = "0.0.0";
    const result = isSemVer(version);
    expect(result).toBe(true);
  });

  it("should return true when version is valid", () => {
    const version = "a.a.a";
    const result = isSemVer(version);
    expect(result).toBe(false);
  });

  it("should return false when version is invalid", () => {
    const version = "0.0";
    const result = isSemVer(version);
    expect(result).toBe(false);
  });
});
