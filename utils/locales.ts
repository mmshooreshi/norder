const localesFolder = '../locales/'

// Define the type for locale entries
type LocaleEntries = [string, any][]

// Dynamically import locale files
const ymlLocales: LocaleEntries = Object.entries(import.meta.glob('../locales/*.yml', { eager: true }))
const yamlLocales: LocaleEntries = Object.entries(import.meta.glob('../locales/*.yaml', { eager: true }))
const jsonLocales: LocaleEntries = Object.entries(import.meta.glob('../locales/*.json', { eager: true }))

// Function to process and extract locale entries
function getLocaleEntries(locales: LocaleEntries, extension: string): LocaleEntries {
  return locales.map(([key, value]) => {
    // Remove the directory path and file extension
    const localeKey = key.slice(localesFolder.length, -(`.${extension}`.length))
    return [localeKey, value.default || value] // Handle default export or direct content
  })
}

// Combine all locale messages into a single object
export const messages = Object.fromEntries([
  ...getLocaleEntries(ymlLocales, 'yml'),
  ...getLocaleEntries(yamlLocales, 'yaml'),
  ...getLocaleEntries(jsonLocales, 'json'),
])

// Extract available locale keys
export const availableLocales = Object.keys(messages)
