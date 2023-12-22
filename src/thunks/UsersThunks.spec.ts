import { describe, it, expect, vi, Mocked } from 'vitest';
import { createUser, deleteUser, readUser, readUsers, updateUser } from './UsersThunks';
import { addUser, changeUser, removeUser, setUsers } from '../reducers/UsersReducer';
import { User } from '../models/User';
import { user1, user2, user3 } from '../test/data/User';
import { AxiosError, AxiosResponse } from 'axios';
import { api } from '../apis/OpenApiClient';
import OpenAPIClientAxios from 'openapi-client-axios';
import { Client } from '../apis/api';
import { decreaseReads, decreaseSubmits, increaseReads, increaseSubmits } from '../reducers/ApiCallsReducer';

vi.mock('../apis/OpenApiClient', () => ({ api: { getClient: vi.fn() } }));
const apiMock = api as Mocked<OpenAPIClientAxios>;
const clientMock = {
  createUser: vi.fn(),
  readUsers: vi.fn(),
  updateUser: vi.fn(),
  deleteUser: vi.fn(),
  readUser: vi.fn(),
} as unknown as Mocked<Client>;

describe('UsersThunks', () => {
  describe('createUser', () => {
    it('should return correct values on success', async () => {
      const dispatch = vi.fn();
      const getState = vi.fn();
      const axiosResponse: AxiosResponse<User> = {
        data: user1,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };
      apiMock.getClient.mockResolvedValue(clientMock);
      clientMock.createUser.mockResolvedValue(axiosResponse);

      const user: User = await createUser(user1, 'de')(dispatch, getState, {});
      expect(dispatch.mock.calls.length).toEqual(4);
      expect(dispatch.mock.calls[0][0]).toEqual(increaseSubmits());
      expect(dispatch.mock.calls[1][0]).toEqual(addUser(user1));
      expect(dispatch.mock.calls[2][0].payload.notification.options.variant).toEqual('success');
      expect(dispatch.mock.calls[3][0]).toEqual(decreaseSubmits());
      expect(user).toEqual(user1);
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
      clientMock.createUser.mockRejectedValue(axiosError);

      await expect(createUser(user1, 'de')(dispatch, getState, {})).rejects.toThrow('error');
      expect(dispatch.mock.calls.length).toEqual(3);
      expect(dispatch.mock.calls[0][0]).toEqual(increaseSubmits());
      expect(dispatch.mock.calls[1][0].payload.notification.options.variant).toEqual('error');
      expect(dispatch.mock.calls[2][0]).toEqual(decreaseSubmits());
    });
  });

  describe('readUsers', () => {
    it('should return correct values on success', async () => {
      const dispatch = vi.fn();
      const getState = vi.fn();
      const axiosResponse: AxiosResponse<User[]> = {
        data: [user1, user2, user3],
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };
      apiMock.getClient.mockResolvedValue(clientMock);
      clientMock.readUsers.mockResolvedValue(axiosResponse);

      const users: User[] = await readUsers('de')(dispatch, getState, {});
      expect(dispatch.mock.calls.length).toEqual(3);
      expect(dispatch.mock.calls[0][0]).toEqual(increaseReads());
      expect(dispatch.mock.calls[1][0]).toEqual(setUsers([user1, user2, user3]));
      expect(dispatch.mock.calls[2][0]).toEqual(decreaseReads());
      expect(users).toEqual([user1, user2, user3]);
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
      clientMock.readUsers.mockRejectedValue(axiosError);

      await expect(readUsers('de')(dispatch, getState, {})).rejects.toThrow('error');
      expect(dispatch.mock.calls.length).toEqual(3);
      expect(dispatch.mock.calls[0][0]).toEqual(increaseReads());
      expect(dispatch.mock.calls[1][0].payload.notification.options.variant).toEqual('error');
      expect(dispatch.mock.calls[2][0]).toEqual(decreaseReads());
    });
  });

  describe('updateUser', () => {
    it('should return correct values on success', async () => {
      const dispatch = vi.fn();
      const getState = vi.fn();
      const axiosResponse: AxiosResponse<User> = {
        data: user1,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };
      apiMock.getClient.mockResolvedValue(clientMock);
      clientMock.updateUser.mockResolvedValue(axiosResponse);

      const user: User = await updateUser(user1, 'de')(dispatch, getState, {});
      expect(dispatch.mock.calls.length).toEqual(4);
      expect(dispatch.mock.calls[0][0]).toEqual(increaseSubmits());
      expect(dispatch.mock.calls[1][0]).toEqual(changeUser(user1));
      expect(dispatch.mock.calls[2][0].payload.notification.options.variant).toEqual('success');
      expect(dispatch.mock.calls[3][0]).toEqual(decreaseSubmits());
      expect(user).toEqual(user1);
    });

    it('should return correct values on error 1', async () => {
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
      clientMock.updateUser.mockRejectedValue(axiosError);

      await expect(updateUser(user1, 'de')(dispatch, getState, {})).rejects.toThrow('error');
      expect(dispatch.mock.calls.length).toEqual(3);
      expect(dispatch.mock.calls[0][0]).toEqual(increaseSubmits());
      expect(dispatch.mock.calls[1][0].payload.notification.options.variant).toEqual('error');
      expect(dispatch.mock.calls[2][0]).toEqual(decreaseSubmits());
    });
  });

  describe('deleteUser', () => {
    it('should return correct values on success', async () => {
      const dispatch = vi.fn();
      const getState = vi.fn();
      const axiosResponse: AxiosResponse<{}> = {
        data: {},
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };
      apiMock.getClient.mockResolvedValue(clientMock);
      clientMock.deleteUser.mockResolvedValue(axiosResponse);

      await deleteUser(1, 'de')(dispatch, getState, {});
      expect(dispatch.mock.calls.length).toEqual(4);
      expect(dispatch.mock.calls[0][0]).toEqual(increaseSubmits());
      expect(dispatch.mock.calls[1][0]).toEqual(removeUser(1));
      expect(dispatch.mock.calls[2][0].payload.notification.options.variant).toEqual('success');
      expect(dispatch.mock.calls[3][0]).toEqual(decreaseSubmits());
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
      clientMock.deleteUser.mockRejectedValue(axiosError);

      await expect(deleteUser(1, 'de')(dispatch, getState, {})).rejects.toThrow('error');
      expect(dispatch.mock.calls.length).toEqual(3);
      expect(dispatch.mock.calls[0][0]).toEqual(increaseSubmits());
      expect(dispatch.mock.calls[1][0].payload.notification.options.variant).toEqual('error');
      expect(dispatch.mock.calls[2][0]).toEqual(decreaseSubmits());
    });
  });

  describe('readUser', () => {
    it('should return correct values on success', async () => {
      const dispatch = vi.fn();
      const axiosResponse: AxiosResponse<User> = {
        data: user1,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };
      apiMock.getClient.mockResolvedValue(clientMock);
      clientMock.readUser.mockResolvedValue(axiosResponse);

      const user: User = await readUser(1, 'de', dispatch);
      expect(dispatch.mock.calls.length).toEqual(2);
      expect(dispatch.mock.calls[0][0]).toEqual(increaseReads());
      expect(dispatch.mock.calls[1][0]).toEqual(decreaseReads());
      expect(user).toEqual(user1);
    });

    it('should return correct values on error', async () => {
      const dispatch = vi.fn();
      const axiosError: AxiosError = {
        config: {} as any,
        isAxiosError: true,
        toJSON: () => ({}),
        name: '',
        message: 'error',
      };
      apiMock.getClient.mockResolvedValue(clientMock);
      clientMock.readUser.mockRejectedValue(axiosError);

      await expect(readUser(1, 'de', dispatch)).rejects.toThrow('error');
      expect(dispatch.mock.calls.length).toEqual(3);
      expect(dispatch.mock.calls[0][0]).toEqual(increaseReads());
      expect(dispatch.mock.calls[1][0].payload.notification.options.variant).toEqual('error');
      expect(dispatch.mock.calls[2][0]).toEqual(decreaseReads());
    });
  });
});
