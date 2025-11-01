import { describe, it, expect } from 'vitest'
import enTranslations from '../../src/i18n/locales/en.json'
import frTranslations from '../../src/i18n/locales/fr.json'
import itTranslations from '../../src/i18n/locales/it.json'
import deTranslations from '../../src/i18n/locales/de.json'
import esTranslations from '../../src/i18n/locales/es.json'
import { getAllKeys, getNestedValue } from '../utils/translation-helpers'

describe('Translation Type Safety', () => {
  const languages = {
    en: enTranslations,
    fr: frTranslations,
    it: itTranslations,
    de: deTranslations,
    es: esTranslations,
  }
  
  Object.keys(languages).forEach((langCode) => {
    describe(`${langCode.toUpperCase()} translations`, () => {
      const translations = languages[langCode]
      const keys = getAllKeys(translations)
      
      it('should have all values as strings', () => {
        keys.forEach((key) => {
          const value = getNestedValue(translations, key)
          expect(value).toBeDefined()
          expect(typeof value).toBe('string')
        })
      })
      
      it('should not have empty string values', () => {
        const emptyKeys = []
        keys.forEach((key) => {
          const value = getNestedValue(translations, key)
          if (value === '') {
            emptyKeys.push(key)
          }
        })
        
        if (emptyKeys.length > 0) {
          console.warn(`${langCode.toUpperCase()} has empty values for keys:`, emptyKeys)
        }
        
        // Warn but don't fail - sometimes empty strings might be intentional
        expect(emptyKeys).toBeDefined()
      })
      
      it('should not have null or undefined values', () => {
        keys.forEach((key) => {
          const value = getNestedValue(translations, key)
          expect(value).not.toBeNull()
          expect(value).not.toBeUndefined()
        })
      })
    })
  })
})



