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
  RELEASE_CI_URL: rawConfig.releaseCILink,
  TESTFLIGHT_URL: rawConfig.testflight,
  PLAY_CONSOLE_URL: rawConfig.playConsole,
  RELEASE_TRACKING_URL: rawConfig.releaseTrackingLink,
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
  RELEASE_CI_URL,
  TESTFLIGHT_URL,
  PLAY_CONSOLE_URL,
  RELEASE_TRACKING_URL,
  GIT: { RELEASE_BRANCH, DEV_BRANCH, ALPHA_BRANCH, MASTER_BRANCH, STAGING_BRANCH },
} = config;
