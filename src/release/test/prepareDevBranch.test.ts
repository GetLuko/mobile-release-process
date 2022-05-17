import fs from 'fs';

import {
  incrementAppVersion,
  checkReleaseNumber,
  incrementBuildNumber,
  getPackageJson,
  getCurrentAppVersion,
  getCurrentBuildNumber,
} from '../release.utils';

describe('release utility function', () => {
  const fakePackageJson = '{ "version": "0.3.800", "buildNumber": "900" }';
  beforeEach(() => {
    jest
      .spyOn(fs, 'readFileSync')
      .mockReturnValueOnce(fakePackageJson)
      .mockReturnValueOnce('{}');
  });

  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  // for the following test each time
  // first package.json is mocked with a version number and a buildNumber
  // then it's mock without a version number and a buildNumber

  it('should return current app version', () => {
    expect(getCurrentAppVersion()).toBe('0.3.800');
    expect(getCurrentAppVersion()).toBe(undefined);
  });
  it('should return package.json', () => {
    expect(getPackageJson()).toStrictEqual(
      '{ "version": "0.3.800", "buildNumber": "900" }'
    );
    expect(getPackageJson()).toStrictEqual('{}');
  });
  it('should get current build number', () => {
    expect(getCurrentBuildNumber()).toBe('900');
    expect(getCurrentBuildNumber()).toBe(undefined);
  });

  it('should check release number correctly', () => {
    expect(checkReleaseNumber({ releaseNumber: '34.34.34' })).toBe(true);
    expect(checkReleaseNumber({ releaseNumber: '6.6.6' })).toBe(true);
    expect(checkReleaseNumber({ releaseNumber: '6.6.6 ' })).toBeFalsy();
    expect(checkReleaseNumber({ releaseNumber: ' 6.6.6' })).toBeFalsy();
    expect(checkReleaseNumber({ releaseNumber: '6 .6 .6 ' })).toBeFalsy();
    expect(checkReleaseNumber({ releaseNumber: 'A.B.C' })).toBeFalsy();
    expect(checkReleaseNumber({ releaseNumber: null })).toBeFalsy();
    expect(checkReleaseNumber({ releaseNumber: undefined })).toBeFalsy();
    expect(checkReleaseNumber({ releaseNumber: '1.1.1.1' })).toBeFalsy();
    expect(checkReleaseNumber(null)).toBeFalsy();
    expect(checkReleaseNumber(undefined)).toBeFalsy();
  });
  it('should bump app version correctly', () => {
    expect(incrementAppVersion({ version: '0.0.0' })).toBe('0.0.10');
    expect(incrementAppVersion({ version: '0.3.10' })).toBe('0.3.20');
    expect(incrementAppVersion({ version: '0.0.0', by: 1 })).toBe('0.0.1');
    expect(incrementAppVersion({ version: '0.0.0', by: 2 })).toBe('0.0.2');
    expect(incrementAppVersion({ version: '0.3.10' })).toBe('0.3.20');
    expect(incrementAppVersion({ version: '0.0.0 ' })).toBeUndefined();
    expect(incrementAppVersion({ version: ' 0.3.10' })).toBeUndefined();
    expect(incrementAppVersion({ version: 'A.B.C' })).toBeUndefined();
    expect(incrementAppVersion({ version: 0 })).toBeUndefined();
    expect(incrementAppVersion({ version: null })).toBeUndefined();
    expect(incrementAppVersion({ version: undefined })).toBeUndefined();
  });
  it('should bump app buildNumber correctly', () => {
    expect(incrementBuildNumber({ buildNumber: '10' })).toBe('20');
    expect(incrementBuildNumber({ buildNumber: '10 ' })).toBe('20');
    expect(incrementBuildNumber({ buildNumber: ' 20' })).toBe('30');
    expect(incrementBuildNumber({ buildNumber: ' 20 ' })).toBe('30');
    expect(incrementBuildNumber({ buildNumber: '10', by: 1 })).toBe('11');
    expect(incrementBuildNumber({ buildNumber: '10', by: 2 })).toBe('12');
    expect(incrementBuildNumber({ buildNumber: '1.0', by: 2 })).toBe('3');
    expect(incrementBuildNumber({ buildNumber: null })).toBeUndefined();
    expect(incrementBuildNumber({ buildNumber: 'ABC' })).toBeUndefined();
    expect(incrementBuildNumber({ buildNumber: undefined })).toBeUndefined();
  });
});
