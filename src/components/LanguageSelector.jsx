import React from 'react'
import { useTranslation } from 'react-i18next'
import './LanguageSelector.css'

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴' },
]

function LanguageSelector() {
  const { i18n } = useTranslation()

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
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default LanguageSelector

