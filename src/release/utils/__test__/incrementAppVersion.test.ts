import { incrementAppVersion } from "../incrementAppVersion";

describe("incrementAppVersion", () => {
  it("should return 0.0.1 when version is 0.0.0", () => {
    const version = "0.0.0";
    const result = incrementAppVersion({ version, by: 10 });
    expect(result).toBe("0.0.10");
  });

  it("should return 0.0.19 when version is 0.0.9 and by arg is not provide", () => {
    const version = "0.0.9";
    const result = incrementAppVersion({ version });
    expect(result).toBe("0.0.19");
  });

  it("should return 0.0.10 when version is 0.0.9", () => {
    const version = "0.0.9";
    const result = incrementAppVersion({ version, by: 1 });
    expect(result).toBe("0.0.10");
  });
});
