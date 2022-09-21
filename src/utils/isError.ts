import isNil from "lodash.isnil";

export const isError = (errorToCheck: any): errorToCheck is Error => {
  return !isNil(errorToCheck?.message);
};
