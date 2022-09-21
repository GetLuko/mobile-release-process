import { isValidConfiguration } from "../isValidConfiguration";

describe("isValidConfiguration", () => {
  it("empty config is not valid", () => {
    // given
    const configuration = {};
    // when
    const result = isValidConfiguration(configuration);
    // then
    expect(result).toBe(false);
  });

  it("config is with wrong git key/value", () => {
    // given
    const configuration = {
      buildGradle: "build.gradle",
      infoPlist: "Info.plist",
      git: {
        devBranch: 123,
      },
    };
    // when
    const result = isValidConfiguration(configuration);
    // then
    expect(result).toBe(false);
  });

  it("config is without git", () => {
    // given
    const configuration = {
      buildGradle: "build.gradle",
      infoPlist: "Info.plist",
    };
    // when
    const result = isValidConfiguration(configuration);
    // then
    expect(result).toBe(true);
  });
  it("config is with git", () => {
    // given
    const configuration = {
      buildGradle: "build.gradle",
      infoPlist: "Info.plist",
      git: {
        devBranch: "dev",
      },
    };
    // when
    const result = isValidConfiguration(configuration);
    // then
    expect(result).toBe(true);
  });
});
