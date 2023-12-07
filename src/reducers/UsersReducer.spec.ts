import { describe, it, expect, vi, Mocked } from 'vitest';
import { Action } from 'redux';
import {
  setUsers,
  addUser,
  changeUser,
  removeUser,
  usersReducer,
  usersInitialState,
  usersSelector,
  createUser,
  readUsers,
  updateUser,
  deleteUser,
  readUser,
} from './UsersReducer';
import { User } from '../models/User';
import { user1, user2, user3 } from '../../test/data/User';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './Store';
import { AxiosError, AxiosResponse } from 'axios';
import { api } from '../apis/OpenApiClient';
import OpenAPIClientAxios from 'openapi-client-axios';
import { Client } from '../apis/api';
import { decreaseReads, decreaseSubmits, increaseReads, increaseSubmits } from './ApiCallsReducer';

vi.mock('../apis/OpenApiClient', () => ({ api: { getClient: vi.fn() } }));
const apiMock = api as Mocked<OpenAPIClientAxios>;
const clientMock = {
  createUser: vi.fn(),
  readUsers: vi.fn(),
  updateUser: vi.fn(),
  deleteUser: vi.fn(),
  readUser: vi.fn(),
} as unknown as Mocked<Client>;

describe('UsersReducer', () => {
  const usersState: User[] = [user1, user2, user3];

  describe('usersReducer', () => {
    it('should set users', () => {
      const oldState: User[] = usersInitialState;
      const newState: User[] = usersState;
      const action: PayloadAction<User[]> = setUsers(usersState);
      expect(usersReducer(oldState, action)).toEqual(newState);
    });

    it('should create user', () => {
      const oldState: User[] = [user1, user2];
      const newState: User[] = usersState;
      const action: PayloadAction<User> = addUser(user3);
      expect(usersReducer(oldState, action)).toEqual(newState);
    });

    it('should update user', () => {
      const updatedUser: User = { ...user2, name: 'Susan Baer' };
      const oldState: User[] = usersState;
      const newState: User[] = [user1, updatedUser, user3];
      const action: PayloadAction<User> = changeUser(updatedUser);
      expect(usersReducer(oldState, action)).toEqual(newState);
    });

    it('should delete user', () => {
      const oldState: User[] = usersState;
      const newState: User[] = [user1, user3];
      const action: PayloadAction<number> = removeUser(2);
      expect(usersReducer(oldState, action)).toEqual(newState);
    });

    it('should set initial state', () => {
      const oldState: User[] = undefined as unknown as User[];
      const newState: User[] = usersInitialState;
      const action: Action<string> = { type: '@@INIT' };
      expect(usersReducer(oldState, action)).toEqual(newState);
    });

    it('should return state on default', () => {
      const oldState: User[] = usersState;
      const newState: User[] = usersState;
      const action: Action<string> = { type: 'unknown' };
      expect(usersReducer(oldState, action)).toEqual(newState);
    });
  });

  const state: RootState = {
    users: [user1, user2, user3],
  } as RootState;

  describe('usersSelector', () => {
    it('should return users from state', () => {
      expect(usersSelector(state)).toEqual([user1, user2, user3]);
      expect(usersSelector(undefined as unknown as RootState)).toEqual([]);
      expect(usersSelector({} as RootState)).toEqual([]);
    });
  });

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
      expect(dispatch.mock.calls[2][0].notification.options.variant).toEqual('success');
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
      expect(dispatch.mock.calls[1][0].notification.options.variant).toEqual('error');
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
      expect(dispatch.mock.calls[1][0].notification.options.variant).toEqual('error');
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
      expect(dispatch.mock.calls[2][0].notification.options.variant).toEqual('success');
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
      expect(dispatch.mock.calls[1][0].notification.options.variant).toEqual('error');
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
      expect(dispatch.mock.calls[2][0].notification.options.variant).toEqual('success');
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
      expect(dispatch.mock.calls[1][0].notification.options.variant).toEqual('error');
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
      expect(dispatch.mock.calls[1][0].notification.options.variant).toEqual('error');
      expect(dispatch.mock.calls[2][0]).toEqual(decreaseReads());
    });
  });
});
