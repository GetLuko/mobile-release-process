import { bumpVersionNumber } from "./buildNumber/bumpVersionNumber";

(async () => {
  await bumpVersionNumber();
})();
