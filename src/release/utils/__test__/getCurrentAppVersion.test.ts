import fs from "fs";

import { getCurrentAppVersion } from "../getCurrentAppVersion";

describe("getCurrentAppVersion", () => {
  const mockedReadFileSync = jest.spyOn(fs, "readFileSync");

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return current app version", () => {
    mockedReadFileSync.mockReturnValue(
      '{ "version": "0.3.800", "buildNumber": "900" }'
    );
    expect(getCurrentAppVersion()).toBe("0.3.800");
  });
  it("should return undefined when no version is available in package.json", () => {
    mockedReadFileSync.mockReturnValue("{  }");
    expect(getCurrentAppVersion()).toBe(undefined);
  });
});
