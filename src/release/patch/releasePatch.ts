import Listr from "listr";

import { push, tag } from "../../git/commands";
import { RELEASE_BRANCH } from "../../git/git.config";
import { print } from "../../utils/print";
import {
  BITRISE_URL,
  PLAY_CONSOLE_URL,
  TESTFLIGHT_URL,
  NOTION_URL,
} from "../constants";

const { Confirm } = require("enquirer");

export const releasePatch = async (appVersion: string) => {
  print({ message: `\nLet's release the patch 🚀` });
  const prompt = new Confirm({
    name: "question",
    message: `Do you want to release the patch in alpha?`,
  });
  const answer = await prompt.run();

  if (!answer) {
    print({
      message: `please run the following command when you are ready to release the patch
           git tag v${appVersion}
           git push origin ${RELEASE_BRANCH}-${appVersion}
        `,
    });
    return;
  }

  const tasks = new Listr([
    {
      title: `Tag the alpha release ${appVersion}`,
      task: () => tag(`v${appVersion}`),
    },
    {
      title: "Trigger Bitrise pipeline",
      task: async () => {
        await push(`release-${appVersion}`);
        await push(`v${appVersion}`);
      },
    },
  ]);

  await tasks.run();

  print({
    message: `\nFinish 🏁!
    You can folow your build on bitrise here => ${BITRISE_URL}

    TestFlight: Don't forget to manage the build => ${TESTFLIGHT_URL}
       - Add External Alpha Tester group
       - Add test details

    Play Console: Don't forget to manage the build => ${PLAY_CONSOLE_URL}
       - Add Release notes
    
    Notion: Update the build number card => ${NOTION_URL}
    `,
  });
};
