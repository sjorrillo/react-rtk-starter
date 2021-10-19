import merge from 'lodash/merge';

export interface IBaseConfig {
  env: string;
  isDevelopment: boolean;
  isIntegration: boolean;
  isProduction: boolean;
}

interface IAppSettings {
  name: string;
  timezone: string;
  dateConvention: string;
}

interface IApiSettings {
  security: string;
}

export interface IEnvironmentConfig extends IBaseConfig {
  app: IAppSettings;
  api: IApiSettings;
  i18nDebug: boolean;
  cloudEnv: string;
}

const baseEnvironment = 'production'; // base config environment

const getEnvironment = (envConfig: IEnvironmentConfig) => {
  const nodeEnv = envConfig.cloudEnv || baseEnvironment;
  if (!nodeEnv.match(/^development$|^integration$|^production$/i)) return baseEnvironment;
  return nodeEnv;
};

export const createConfig = (
  setupEnvFn: (
    baseEnvironment: string
  ) => { baseConfig: IEnvironmentConfig; envConfig: IEnvironmentConfig }
): IEnvironmentConfig & IBaseConfig => {
  const { baseConfig, envConfig } = setupEnvFn(baseEnvironment);
  const nodeEnv = getEnvironment(baseConfig || {});

  const setupConfig: IBaseConfig = {
    env: nodeEnv.toLowerCase(),
    isDevelopment: /development/i.test(nodeEnv),
    isIntegration: /integration/i.test(nodeEnv),
    isProduction: /production/i.test(nodeEnv),
  };

  return merge(baseConfig, envConfig || {}, setupConfig);
};
