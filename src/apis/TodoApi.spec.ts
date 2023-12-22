import { describe, expect, it, vi, Mocked } from 'vitest';
import { Todo } from '../models/Todo';
import { todo1, todo2, todo3 } from '../test/data/Todo';
import { getUrl } from './BaseApi';
import { createTodo, deleteTodo, readTodo, readTodos, replaceTodo, updateTodo } from './TodoApi';
import axios, { AxiosResponse, AxiosStatic } from 'axios';

vi.mock('axios');
const axiosMock = axios as Mocked<AxiosStatic>;

describe('TodoApi', () => {
  describe('createTodo', () => {
    it('should send request', async () => {
      const axiosResponse: AxiosResponse<Todo> = {
        data: todo1,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };
      axiosMock.post.mockResolvedValue(axiosResponse);
      const apiResponse: AxiosResponse<Todo> = await createTodo(todo1);
      expect(axiosMock.post.mock.calls.length).toEqual(1);
      expect(axiosMock.post.mock.calls[0][0]).toEqual(`${getUrl()}/todos`);
      expect(axiosMock.post.mock.calls[0][1]).toEqual({
        ...todo1,
        id: undefined,
        tsCreate: undefined,
        tsUpdate: undefined,
      });
      expect(axiosMock.post.mock.calls[0][2]).toEqual({ headers: { 'Content-Type': 'application/json' } });
      expect(apiResponse).toEqual(axiosResponse);
    });
  });

  describe('readTodos', () => {
    it('should send request', async () => {
      const axiosResponse: AxiosResponse<Todo[]> = {
        data: [todo1, todo2, todo3],
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };
      axiosMock.get.mockResolvedValue(axiosResponse);
      const apiResponse: AxiosResponse<Todo[]> = await readTodos();
      expect(axiosMock.get.mock.calls.length).toEqual(1);
      expect(axiosMock.get.mock.calls[0][0]).toEqual(`${getUrl()}/todos`);
      expect(apiResponse).toEqual(axiosResponse);
    });
  });

  describe('readTodo', () => {
    it('should send request', async () => {
      const axiosResponse: AxiosResponse<Todo> = {
        data: todo1,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };
      axiosMock.get.mockResolvedValue(axiosResponse);
      const apiResponse: AxiosResponse<Todo> = await readTodo(1);
      expect(axiosMock.get.mock.calls.length).toEqual(1);
      expect(axiosMock.get.mock.calls[0][0]).toEqual(`${getUrl()}/todos/1`);
      expect(apiResponse).toEqual(axiosResponse);
    });
  });

  describe('updateTodo', () => {
    it('should send request', async () => {
      const axiosResponse: AxiosResponse<Todo> = {
        data: todo1,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };
      axiosMock.patch.mockResolvedValue(axiosResponse);
      const apiResponse: AxiosResponse<Todo> = await updateTodo(todo1);
      expect(axiosMock.patch.mock.calls.length).toEqual(1);
      expect(axiosMock.patch.mock.calls[0][0]).toEqual(`${getUrl()}/todos/1`);
      expect(axiosMock.patch.mock.calls[0][1]).toEqual({
        ...todo1,
        id: undefined,
        tsCreate: undefined,
        tsUpdate: undefined,
      });
      expect(axiosMock.patch.mock.calls[0][2]).toEqual({ headers: { 'Content-Type': 'application/json' } });
      expect(apiResponse).toEqual(axiosResponse);
    });
  });

  describe('replaceTodo', () => {
    it('should send request', async () => {
      const axiosResponse: AxiosResponse<Todo> = {
        data: todo1,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };
      axiosMock.post.mockResolvedValue(axiosResponse);
      const apiResponse: AxiosResponse<Todo> = await replaceTodo(todo1);
      expect(axiosMock.post.mock.calls.length).toEqual(1);
      expect(axiosMock.post.mock.calls[0][0]).toEqual(`${getUrl()}/todos/1`);
      expect(axiosMock.post.mock.calls[0][1]).toEqual({
        ...todo1,
        id: undefined,
        tsCreate: undefined,
        tsUpdate: undefined,
      });
      expect(axiosMock.post.mock.calls[0][2]).toEqual({ headers: { 'Content-Type': 'application/json' } });
      expect(apiResponse).toEqual(axiosResponse);
    });
  });

  describe('deleteTodo', () => {
    it('should send request', async () => {
      const axiosResponse: AxiosResponse<{}> = {
        data: {},
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };
      axiosMock.delete.mockResolvedValue(axiosResponse);
      const apiResponse: AxiosResponse = await deleteTodo(1);
      expect(axiosMock.delete.mock.calls.length).toEqual(1);
      expect(axiosMock.delete.mock.calls[0][0]).toEqual(`${getUrl()}/todos/1`);
      expect(apiResponse).toEqual(axiosResponse);
    });
  });
});
