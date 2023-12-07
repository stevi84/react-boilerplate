import { Mock, describe, expect, it, vi } from 'vitest';
import { getUrl } from './BaseApi';
import { Env, getEnv } from '../globals/Environments';

vi.mock('../globals/Environments');
const getEnvMock = getEnv as Mock<[], Env>;

describe('BaseApi', () => {
  describe('getUrl', () => {
    it('should return the url matching the environment', () => {
      getEnvMock.mockReturnValue('dev');
      expect(getUrl()).toEqual('http://localhost:5000');
      getEnvMock.mockReturnValue('prod');
      expect(getUrl()).toEqual('http://localhost:5000');
      getEnvMock.mockReturnValue('test');
      expect(getUrl()).toEqual('http://localhost:5000');
      getEnvMock.mockReturnValue('unknown' as Env);
      expect(getUrl()).toEqual('http://localhost:5000');
    });
  });
});
