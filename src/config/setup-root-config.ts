import { createConfig, IEnvironmentConfig } from './root-config';

const environments: { [env: string]: () => IEnvironmentConfig | any } = {
  development: () => require('./environments/development.json'),
  integration: () => require('./environments/integration.json'),
  production: () => require('./environments/production.json'),
};

const appSettings = createConfig((baseEnvironment: string) => {
  const baseConfig = environments[baseEnvironment]();
  const envConfig =
    baseEnvironment === baseConfig.cloudEnv ? {} : environments[baseConfig.cloudEnv]();

  return {
    baseConfig,
    envConfig,
  };
});

export const applyServerSettings = (
  onServerSettingsApplied: (settings: IEnvironmentConfig) => void
) => {
  if (!appSettings.isDevelopment) {
    // TODO: call server to collect more settings  and update the appSettings object
    onServerSettingsApplied(appSettings);
  } else {
    // in dev, we can set up locally
    onServerSettingsApplied(appSettings);
  }
};

export default appSettings;
