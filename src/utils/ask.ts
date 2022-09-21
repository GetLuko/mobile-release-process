import { throwError } from "./throwError";

const { Confirm } = require("enquirer");

export const ask = async ({
  message,
  onAccept,
  onDenied,
}: {
  message: string;
  onAccept?: () => void | Promise<any>;
  onDenied?: () => void | Promise<any>;
}) => {
  const prompt = new Confirm({
    name: "question",
    message: message,
  });

  try {
    const answer: boolean = await prompt.run();

    if (answer === true) {
      await onAccept?.();
      return answer;
    }

    await onDenied?.();
    return answer;
  } catch (error: any) {
    return throwError(error?.message);
  }
};
