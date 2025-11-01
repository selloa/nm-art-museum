import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslations from './locales/en.json'
import frTranslations from './locales/fr.json'
import itTranslations from './locales/it.json'
import deTranslations from './locales/de.json'
import esTranslations from './locales/es.json'

const resources = {
  en: { translation: enTranslations },
  fr: { translation: frTranslations },
  it: { translation: itTranslations },
  de: { translation: deTranslations },
  es: { translation: esTranslations },
}

// Get saved language from localStorage or default to English
const getStoredLanguage = () => {
  try {
    const saved = localStorage.getItem('i18nextLng')
    if (saved && resources[saved]) {
      return saved
    }
  } catch (e) {
    // localStorage not available
  }
  return 'en'
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getStoredLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  })

// Listen for language changes and update localStorage
i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem('i18nextLng', lng)
    document.documentElement.lang = lng
  } catch (e) {
    // localStorage not available
  }
})

// Set initial HTML lang attribute
if (typeof document !== 'undefined') {
  document.documentElement.lang = i18n.language
}

export default i18n



