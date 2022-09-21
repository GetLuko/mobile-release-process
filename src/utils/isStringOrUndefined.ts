import get from "lodash.get";
import overSome from "lodash.oversome";
import isUndefined from "lodash.isundefined";
import curry from "lodash.curry";
import isString from "lodash.isstring";

export const isStringOrUndefined = curry((path: string, obj: any) =>
  overSome([
    (obj) => isString(get(obj, path)),
    (obj) => isUndefined(get(obj, path)),
  ])(obj)
);
