import { isError } from "../utils/isError";
import { print } from "../utils/print";
import alphaPatchPreparations from "./patch/alphaPatchPreparations";
import { createStagingBranch } from "./patch/createStagingBranch";
import { prepareAlphaPatchBranch } from "./patch/prepareAlphaPatchBranch";
import { preparePatch } from "./patch/preparePatch";
import { releasePatch } from "./patch/releasePatch";

(async () => {
  print({ message: "\nLet's prepare an alpha patch 🚒\n" });
  try {
    await alphaPatchPreparations();
    const bumpedAppVersion = await prepareAlphaPatchBranch();
    await preparePatch({ appVersion: bumpedAppVersion });
    await createStagingBranch(bumpedAppVersion);
    await releasePatch(bumpedAppVersion);
  } catch (error: unknown) {
    const message = isError(error) ? error.message : "alpha release failed";
    print({
      message: `❌ ${message}`,
      type: "error",
    });
  }
})();
