import OpenAPIClientAxios from 'openapi-client-axios';
import apiYml from './api.yml';
import { getEnv } from '../globals/Environments';

export const api = new OpenAPIClientAxios({ definition: apiYml, withServer: getEnv() });
api.init();
