import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const resources = {
  fr: {
    translation: {
      theme: {
        darkMode: 'Mode sombre',
      },
    },
  },
  en: {
    translation: {
      theme: {
        darkMode: 'Dark mode',
      },
    },
  },
} as const;

void i18n.use(initReactI18next).init({
  resources,
  lng: 'fr',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export { i18n };
