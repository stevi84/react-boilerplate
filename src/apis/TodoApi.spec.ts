/*import { Todo } from '../models/Todo';
import { todo1 } from '../../test/data/Todo';
import { url } from './BaseApi';
import { createTodo } from './TodoApi';
import axios, { AxiosResponse, AxiosStatic } from 'axios';

jest.mock('axios');
const axiosMock: jest.Mocked<AxiosStatic> = axios as jest.Mocked<AxiosStatic>;

describe('createTodo', () => {
  it('should send request', (done) => {
    const axiosResponse: AxiosResponse<Todo> = {
      data: todo1,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    axiosMock.post.mockResolvedValue(axiosResponse);
    createTodo(todo1).then((apiResponse: AxiosResponse<Todo>) => {
      expect(axiosMock.post.mock.calls.length).toEqual(1);
      expect(axiosMock.post.mock.calls[0][0]).toEqual(`${url}/todos`);
      expect(axiosMock.post.mock.calls[0][1]).toEqual({
        ...todo1,
        id: undefined,
        tsCreate: undefined,
        tsUpdate: undefined,
      });
      expect(axiosMock.post.mock.calls[0][2]).toEqual({ headers: { 'Content-Type': 'application/json' } });
      expect(apiResponse).toEqual(axiosResponse);
      done();
    });
  });
});
*/
