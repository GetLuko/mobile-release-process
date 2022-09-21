import { bumpBuildNumber } from "./buildNumber/bumpBuildNumber";

(async () => {
  await bumpBuildNumber();
})();
