import { prompt } from 'enquirer';

import { print } from '../script.utils';

type Confirmation = { confirmation: boolean };

const LocalizeQuestion = async () => {
  const answer = await prompt<Confirmation>({
    type: 'confirm',
    name: 'confirmation',
    message: 'Did you check that a Localize MR has been merged ?',
  });

  if (answer?.confirmation) {
    return;
  }
  process.exit(1);
};

const RemainingWork = async () => {
  const answer = await prompt<Confirmation>({
    type: 'confirm',
    name: 'confirmation',
    message: 'Remaining work has been merged to dev branch ?',
  });

  if (answer?.confirmation) {
    return;
  }
  process.exit(1);
};

const automatedTest = async () => {
  const answer = await prompt<Confirmation>({
    type: 'confirm',
    name: 'confirmation',
    message: 'Did you check the E2E tests report on IOS and Android?',
  });

  if (answer?.confirmation) {
    return;
  }
  process.exit(1);
};

async function releasePreparations() {
  print({ message: 'Preparation' });

  await LocalizeQuestion();
  await RemainingWork();
  await automatedTest();

  print({ message: '\nReady Steady Go 🏎  !' });
}

export default releasePreparations;
