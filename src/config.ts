import { getConfig } from "./utils/getConfig";

const rawConfig = getConfig();

const defaultConfig = {
  git: {
    devBranch: "dev",
    alphaBranch: "alpha",
    releaseBranch: "release",
    masterBranch: "master",
    stagingBranch: "staging",
  },
};

const config = {
  BUILD_GRADLE_PATH: rawConfig.buildGradle,
  INFO_PLIST_PATH: rawConfig.infoPlist,
  BITRISE_URL: rawConfig.bitrise,
  TESTFLIGHT_URL: rawConfig.testflight,
  PLAY_CONSOLE_URL: rawConfig.playConsole,
  NOTION_URL: rawConfig.notion,
  GIT: {
    DEV_BRANCH: rawConfig?.git?.devBranch ?? defaultConfig.git.devBranch,
    ALPHA_BRANCH: rawConfig?.git?.alphaBranch ?? defaultConfig.git.alphaBranch,
    MASTER_BRANCH: rawConfig?.git?.masterBranch ?? defaultConfig.git.masterBranch,
    RELEASE_BRANCH: rawConfig?.git?.releaseBranch ?? defaultConfig.git.releaseBranch,
    STAGING_BRANCH: rawConfig?.git?.stagingBranch ?? defaultConfig.git.stagingBranch,
  },
};

export const {
  BUILD_GRADLE_PATH,
  INFO_PLIST_PATH,
  BITRISE_URL,
  TESTFLIGHT_URL,
  PLAY_CONSOLE_URL,
  NOTION_URL,
  GIT,
} = config;
