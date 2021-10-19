import objectKeys from 'all-object-keys';
import editJsonFile from 'edit-json-file';
import snakeCase from 'lodash/snakeCase';
import path from 'path';

 const getValueForSetting = (keyPath: string, defaultValue: string | number) => {
  const variableName = keyPath.split(/\./g).map(snakeCase).join('_').toUpperCase();
  return process.env[variableName] || defaultValue;
};

const createConfigFile = () => {
  try {
    const configFile = editJsonFile(path.join(__dirname, '../src/config/environments/production.json'));
    objectKeys(configFile.get()).forEach((keyPath) =>
      configFile.set(keyPath, getValueForSetting(keyPath, configFile.get(keyPath)))
    );

    configFile.save();
  } catch (error) {
    console.error('Unexpected error generating the config file', error);
    throw error;
  }
};

createConfigFile();
