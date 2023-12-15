import { AxiosPromise, AxiosResponse } from 'axios';

export const createErrorLog = (error: any): AxiosPromise<void> => {
  // hier kann der Fehler in einem Remote Service geloggt werden
  console.error('Error logged to remote service:', error);
  return Promise.resolve({} as AxiosResponse<void>);
};
