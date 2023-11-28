import { getEnv } from '../globals/Environments';

export const getUrl = (): string => {
  let url: string;
  switch (getEnv()) {
    case 'dev':
    case 'prod':
    case 'test':
    default:
      url = 'http://localhost:5000';
  }
  return url;
};
