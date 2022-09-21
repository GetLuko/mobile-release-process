export type ExecException = Error & {
  cmd?: string | undefined;
  killed?: boolean | undefined;
  code?: number | undefined;
  signal?: NodeJS.Signals | undefined;
  stderr?: string | undefined;
  stdout?: string | undefined;
};
