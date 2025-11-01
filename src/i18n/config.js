import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Dynamically import all locale files using Vite's import.meta.glob
const localeModules = import.meta.glob('./locales/*.json', { eager: true })

// Build resources object dynamically from all locale files
const resources = {}
for (const path in localeModules) {
  // Extract language code from path (e.g., './locales/en.json' -> 'en')
  const match = path.match(/\.\/locales\/(.+)\.json$/)
  if (match) {
    const langCode = match[1]
    resources[langCode] = { translation: localeModules[path].default || localeModules[path] }
  }
}

// Get available language codes from resources
export const getAvailableLanguages = () => Object.keys(resources)

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




