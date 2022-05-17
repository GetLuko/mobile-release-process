import cleanup from "./release/cleanup";
import prepareAlphaBranch from "./release/prepareAlphaBranch";
import prepareMasterBranch from "./release/prepareMasterBranch";
import prepareNextRelease from "./release/prepareNextRelease";
import releasePreparations from "./release/releasePreparations";
import { getErrorMessage, print } from "./script.utils";

export async function cli() {
  print({ message: "Let's prepare the new alpha release 🔥\n" });
  try {
    await releasePreparations();
    const releaseNumber = await prepareAlphaBranch();
    await prepareMasterBranch(releaseNumber);
    await prepareNextRelease(releaseNumber);
    await cleanup(releaseNumber);
  } catch (error) {
    print({
      message: `❌ ${getErrorMessage({ error, fallbackMessage: "release failed" })}`,
      type: "error",
    });
    process.exit(1);
  }
}
