/**
 * Utility functions for testing translations
 */

/**
 * Flattens a nested object into dot-notation keys
 * Example: { a: { b: 'c' } } => { 'a.b': 'c' }
 */
export function flattenKeys(obj, prefix = '') {
  const flattened = {}
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const fullKey = prefix ? `${prefix}.${key}` : key
      const value = obj[key]
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // Recursively flatten nested objects
        Object.assign(flattened, flattenKeys(value, fullKey))
      } else {
        flattened[fullKey] = value
      }
    }
  }
  
  return flattened
}

/**
 * Gets all keys from a translation object
 */
export function getAllKeys(translations) {
  return Object.keys(flattenKeys(translations))
}

/**
 * Gets the value for a nested key path
 */
export function getNestedValue(obj, path) {
  const keys = path.split('.')
  let current = obj
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key]
    } else {
      return undefined
    }
  }
  
  return current
}

/**
 * Finds missing keys in target compared to source
 */
export function findMissingKeys(sourceKeys, targetKeys) {
  return sourceKeys.filter(key => !targetKeys.includes(key))
}

/**
 * Finds extra keys in target that don't exist in source
 */
export function findExtraKeys(sourceKeys, targetKeys) {
  return targetKeys.filter(key => !sourceKeys.includes(key))
}




