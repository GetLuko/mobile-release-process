import { print } from "../utils/print";
import cleanup from "./alpha/cleanup";
import prepareMasterBranch from "./alpha/prepareMasterBranch";
import prepareNextRelease from "./alpha/prepareNextRelease";
import releasePreparations from "./alpha/releasePreparations";
import prepareAlphaBranch from "./patch/prepareAlphaBranch";

(async () => {
  print({ message: "Let's prepare the new alpha release 🔥\n" });
  try {
    await releasePreparations();
    const releaseNumber = await prepareAlphaBranch();
    await prepareMasterBranch(releaseNumber);
    await prepareNextRelease(releaseNumber);
    await cleanup(releaseNumber);
  } catch (error: any) {
    print({
      message: `❌ ${error?.message ?? "release failed"}`,
      type: "error",
    });
  }
})();
