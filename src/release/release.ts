import { print } from '../script.utils';
import cleanup from './cleanup';
import prepareAlphaBranch from './prepareAlphaBranch';
import prepareMasterBranch from './prepareMasterBranch';
import prepareNextRelease from './prepareNextRelease';
import releasePreparations from './releasePreparations';

(async () => {
  print({ message: "Let's prepare the new alpha release 🔥\n" });
  try {
    await releasePreparations();
    const releaseNumber = await prepareAlphaBranch();
    await prepareMasterBranch(releaseNumber);
    await prepareNextRelease(releaseNumber);
    await cleanup(releaseNumber);
  } catch (error) {
    print({
      message: `❌ ${error?.message ?? 'release failed'}`,
      type: 'error',
    });
  }
})();
