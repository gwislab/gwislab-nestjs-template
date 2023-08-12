import * as i18n from 'i18next';

import { en, fr } from './assets/locales';

export const translationGetters = {
  en: () => en,
  fr: () => fr,
};

const initializeI18n = (lng?: string) =>
  i18n.init({
    lng: lng || 'en',
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources: {
      en: {
        translation: translationGetters.en(),
      },
      fr: {
        translation: translationGetters.fr(),
      },
    },
  });

export default initializeI18n;
