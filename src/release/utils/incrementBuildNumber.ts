import isNil from "lodash.isnil";

export const incrementBuildNumber = ({
  buildNumber,
  by = 10,
}: {
  buildNumber: any;
  by?: number;
}) => {
  const number = Number(buildNumber);

  if (isNil(buildNumber) || isNaN(number)) {
    return;
  }

  return (number + by).toString();
};
