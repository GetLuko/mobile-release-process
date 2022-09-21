import fs from "fs";

import { getCurrentBuildNumber } from "../getCurrentBuildNumber";

describe("getCurrentBuildNumber", () => {
  const mockedReadFileSync = jest.spyOn(fs, "readFileSync");

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return current build number", () => {
    mockedReadFileSync.mockReturnValue(
      '{ "version": "0.3.800", "buildNumber": "900" }'
    );
    expect(getCurrentBuildNumber()).toBe("900");
  });

  it("should return undefined when no build number is not available in package.json", () => {
    mockedReadFileSync.mockReturnValue("{  }");
    expect(getCurrentBuildNumber()).toBe(undefined);
  });
});
