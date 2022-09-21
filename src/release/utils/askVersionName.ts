import { prompt } from "enquirer";

export const askVersionName = async () => {
  const { versionName } = await prompt<{ versionName: "patch" | "minor" }>({
    type: "select",
    name: "versionName",
    message: "Did you release a patch or a minor app version?",
    choices: ["Minor", "Patch"],
    result: (value: string) => value.toLowerCase(),
  });

  return versionName;
};
