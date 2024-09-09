import type { Ref } from 'vue'

export default function useLocale(fallback = 'fa'): Ref<string> {
  const preferredLanguages = usePreferredLanguages()

  const locale = preferredLanguages.value.find(language => availableLocales.includes(language)) // try to find exact match
    ?? preferredLanguages.value.find(language => availableLocales.includes(language.slice(0, 2)))?.slice(0, 2) // try to find match with only language code
    ?? fallback // fallback

  return useLocalStorage('locale', locale)
}
