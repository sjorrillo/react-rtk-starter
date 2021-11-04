import editJsonFile from 'edit-json-file';
import path from 'path';
import alphabetize from 'alphabetize-object-keys';
import fs from 'fs';
import merge from 'lodash/merge';
import { AVAILABLE_LANGUAGES, AVAILABLE_NAMESPACES, BASE_LANGUAGE,  ILngNamespaces } from '../src/core/modules/i18n/setup-i18n';

const buildTranslationFilePath = (lng: string, ns: string) => path.join(__dirname, `../src/assets/i18n/${lng}/${ns}.json`);

const readTranslations = (lng: string) =>
  AVAILABLE_NAMESPACES.reduce<ILngNamespaces>((acc, ns) => {
    acc[ns] = JSON.parse(fs.readFileSync(buildTranslationFilePath(lng, ns)) as any);
    return acc;
  }, {} as ILngNamespaces);

const getTranslationKeys = (baseTranslations: ILngNamespaces) => AVAILABLE_NAMESPACES.reduce((acc, ns) => {
  acc[ns] = Object.keys(baseTranslations[ns]).reduce((iacc, key) => {
    iacc[key] = `[${BASE_LANGUAGE}]: ${baseTranslations[ns][key]}`;
    return iacc;
  }, {});

  return acc;
}, {});

const normalizeTranslationFiles = () => {
  try {
    const baseTranslations = readTranslations(BASE_LANGUAGE);
    const baseTranslationsKeys = getTranslationKeys(baseTranslations);

    AVAILABLE_LANGUAGES.forEach((lng) => {
      const isBaseLanguage = lng === BASE_LANGUAGE;
      const lngTranslations = isBaseLanguage ? baseTranslations : readTranslations(lng);

      AVAILABLE_NAMESPACES.forEach((ns) => {
        const fileMessages = alphabetize(isBaseLanguage ? { ...baseTranslations[ns] } : { ...merge({ ...baseTranslationsKeys[ns] }, lngTranslations[ns])});
        const configFile = editJsonFile(buildTranslationFilePath(lng, ns));
        configFile.write(JSON.stringify(fileMessages, null, 2), () => {
          console.log(`✅ [${lng}]: (${ns}) - Translation file normalized`);
        });
      });
    });
  } catch (error) {
    console.error('Unexpected error generating the translation file', error);
    throw error;
  }
};

normalizeTranslationFiles();
