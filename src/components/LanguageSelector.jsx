import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { getAvailableLanguages } from '../i18n/config'
import './LanguageSelector.css'

// Language metadata for display names and flags
// Falls back to native language name if not specified
const languageMetadata = {
  en: { name: 'English', flag: '🇬🇧' },
  fr: { name: 'Français', flag: '🇫🇷' },
  it: { name: 'Italiano', flag: '🇮🇹' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
  es: { name: 'Español', flag: '🇪🇸' },
  sv: { name: 'Svenska', flag: '🇸🇪' },
  fi: { name: 'Suomi', flag: '🇫🇮' },
  no: { name: 'Norsk', flag: '🇳🇴' },
  // Add more as needed, or they'll fall back to native name
}

// Get native language name using Intl API
const getNativeLanguageName = (code) => {
  try {
    return new Intl.DisplayNames([code], { type: 'language' }).of(code) || code.toUpperCase()
  } catch {
    return code.toUpperCase()
  }
}

function LanguageSelector() {
  const { i18n } = useTranslation()
  
  // Dynamically build languages list from available locales
  const languages = useMemo(() => {
    const availableCodes = getAvailableLanguages().sort()
    
    return availableCodes.map((code) => {
      const metadata = languageMetadata[code]
      if (metadata) {
        return { code, ...metadata }
      }
      // Fallback for languages not in metadata
      return {
        code,
        name: getNativeLanguageName(code),
        flag: '', // No flag for unknown languages
      }
    })
  }, [])

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode)
  }

  // Fallback to 'en' if i18n language is not available
  const currentLanguage = i18n?.language || 'en'

  return (
    <div className="language-selector">
      <select
        value={currentLanguage}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="language-select"
        aria-label="Select language"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag ? `${lang.flag} ` : ''}{lang.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default LanguageSelector

