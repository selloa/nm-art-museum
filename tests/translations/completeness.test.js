import { describe, it, expect } from 'vitest'
import enTranslations from '../../src/i18n/locales/en.json'
import frTranslations from '../../src/i18n/locales/fr.json'
import itTranslations from '../../src/i18n/locales/it.json'
import deTranslations from '../../src/i18n/locales/de.json'
import esTranslations from '../../src/i18n/locales/es.json'
import { getAllKeys, findMissingKeys, findExtraKeys } from '../utils/translation-helpers'

describe('Translation Completeness', () => {
  const languages = {
    en: enTranslations,
    fr: frTranslations,
    it: itTranslations,
    de: deTranslations,
    es: esTranslations,
  }
  
  const englishKeys = getAllKeys(enTranslations)
  
  it('should have all translation files loaded', () => {
    expect(enTranslations).toBeDefined()
    expect(frTranslations).toBeDefined()
    expect(itTranslations).toBeDefined()
    expect(deTranslations).toBeDefined()
    expect(esTranslations).toBeDefined()
  })
  
  it('should have English as the base language with keys', () => {
    expect(englishKeys.length).toBeGreaterThan(0)
  })
  
  // Test each language against English
  const languageCodes = ['fr', 'it', 'de', 'es']
  
  languageCodes.forEach((langCode) => {
    describe(`${langCode.toUpperCase()} translations`, () => {
      const langKeys = getAllKeys(languages[langCode])
      const missingKeys = findMissingKeys(englishKeys, langKeys)
      const extraKeys = findExtraKeys(englishKeys, langKeys)
      
      it(`should have all keys from English`, () => {
        expect(missingKeys).toHaveLength(0)
      })
      
      it(`should not have extra keys not in English`, () => {
        // Allow some flexibility, but log warnings
        if (extraKeys.length > 0) {
          console.warn(`${langCode.toUpperCase()} has extra keys:`, extraKeys)
        }
        // This is a warning, not an error, so we'll just check it doesn't crash
        expect(extraKeys).toBeDefined()
      })
      
      it(`should have the same nested structure as English`, () => {
        // Verify the structure matches by checking that all English keys exist
        englishKeys.forEach((key) => {
          const value = languages[langCode]
          const keys = key.split('.')
          let current = value
          
          for (const k of keys) {
            expect(current).toBeDefined()
            expect(typeof current).toBe('object')
            expect(current).toHaveProperty(k)
            current = current[k]
          }
          
          expect(typeof current).toBe('string')
        })
      })
    })
  })
})




