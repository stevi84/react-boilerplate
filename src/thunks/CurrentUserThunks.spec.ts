import { describe, it, expect, vi, Mocked } from 'vitest';
import { currentUserReader } from '../test/data/CurrentUser';
import { AxiosError, AxiosResponse } from 'axios';
import { api } from '../apis/OpenApiClient';
import OpenAPIClientAxios from 'openapi-client-axios';
import { Client } from '../apis/api';
import { decreaseReads, increaseReads } from '../reducers/ApiCallsReducer';
import { setCurrentUser } from '../reducers/CurrentUserReducer';
import { readCurrentUser } from './CurrentUserThunks';
import { CurrentUser } from '../models/CurrentUser';

vi.mock('../apis/OpenApiClient', () => ({ api: { getClient: vi.fn() } }));
const apiMock = api as Mocked<OpenAPIClientAxios>;
const clientMock = { readCurrentUser: vi.fn() } as unknown as Mocked<Client>;

describe('CurrentUserReducer', () => {
  describe('readCurrentUser', () => {
    it('should return correct values on success', async () => {
      const dispatch = vi.fn();
      const getState = vi.fn();
      const axiosResponse: AxiosResponse<CurrentUser> = {
        data: currentUserReader,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };
      apiMock.getClient.mockResolvedValue(clientMock);
      clientMock.readCurrentUser.mockResolvedValue(axiosResponse);

      const currentUser: CurrentUser = await readCurrentUser('de')(dispatch, getState, {});
      expect(dispatch.mock.calls.length).toEqual(3);
      expect(dispatch.mock.calls[0][0]).toEqual(increaseReads());
      expect(dispatch.mock.calls[1][0]).toEqual(setCurrentUser(currentUserReader));
      expect(dispatch.mock.calls[2][0]).toEqual(decreaseReads());
      expect(currentUser).toEqual(currentUserReader);
    });

    it('should return correct values on error', async () => {
      const dispatch = vi.fn();
      const getState = vi.fn();
      const axiosError: AxiosError = {
        config: {} as any,
        isAxiosError: true,
        toJSON: () => ({}),
        name: '',
        message: 'error',
      };
      apiMock.getClient.mockResolvedValue(clientMock);
      clientMock.readCurrentUser.mockRejectedValue(axiosError);

      await expect(readCurrentUser('de')(dispatch, getState, {})).rejects.toThrow('error');
      expect(dispatch.mock.calls.length).toEqual(3);
      expect(dispatch.mock.calls[0][0]).toEqual(increaseReads());
      expect(dispatch.mock.calls[1][0].payload.notification.options.variant).toEqual('error');
      expect(dispatch.mock.calls[2][0]).toEqual(decreaseReads());
    });
  });
});
