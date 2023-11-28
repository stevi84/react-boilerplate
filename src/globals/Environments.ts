export type Env = 'dev' | 'prod' | 'test';

export const getEnv = (): Env => import.meta.env.VITE_ENV;
