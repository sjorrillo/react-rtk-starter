import i18next from 'i18next';

type TransFunctionType = () => ({ [key: string]: string });
export interface ILngNamespaces {
  trans: TransFunctionType;
}
export interface ILngDefinition {
  es: ILngNamespaces;
  en: ILngNamespaces;
}

interface Ii18nSettings {
  debug?: boolean;
  lng: keyof ILngDefinition;
}

const translations: ILngDefinition = {
  es: {
    trans: () => require('../../../assets/i18n/es/trans.json'),
  },
  en: {
    trans: () => require('../../../assets/i18n/en/trans.json'),
  },
}

export const AVAILABLE_LANGUAGES = Object.keys(translations);
export const AVAILABLE_NAMESPACES = Object.keys(translations[AVAILABLE_LANGUAGES[0]]);
export const BASE_LANGUAGE = 'en';

const loadNamespaces = (locales: ILngNamespaces) => AVAILABLE_NAMESPACES.reduce((acc, ns) => {
  acc[ns] = locales[ns]();
  return acc;
}, {});

export const init = ({ debug, lng }: Ii18nSettings, onTransInitialized: () => void) => {
  const locales = translations[lng] as ILngNamespaces;
  const fallbackLocales = (BASE_LANGUAGE !== lng || !locales) ? translations[BASE_LANGUAGE] : null;

  i18next.init(
    {
      lng: !locales ?  lng : BASE_LANGUAGE,
      debug,
      ns: AVAILABLE_NAMESPACES,
      defaultNS: 'trans',
      whitelist: AVAILABLE_LANGUAGES,
      preload: [lng],
      fallbackLng: BASE_LANGUAGE,
      resources: {
        ...(locales && { [lng]: loadNamespaces(locales) }),
        ...(fallbackLocales && { [BASE_LANGUAGE]: loadNamespaces(fallbackLocales) }),
      },
      interpolation: {
        prefix: '{',
        suffix: '}'
      }
    },
    () => {
      onTransInitialized && onTransInitialized();
    }
  );
};
