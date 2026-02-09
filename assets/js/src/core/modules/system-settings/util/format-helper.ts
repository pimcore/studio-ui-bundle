import { getSettings } from "@Pimcore/modules/app/settings/settings-slice";
import { SystemSettingsForm } from "../components/system-settings-form/system-settings-form";
import { store } from "@Pimcore/app/store";

export const getInitialFormValues = (): SystemSettingsForm => {
  const settings = getSettings(store.getState())

  return {
    general: {
      valid_languages: settings['validLanguages'] ?? [],
      fallback_languages: transformFallbackLanguagesForForm(settings['fallbackLanguages']),
      required_languages: settings['requiredLanguages'] ?? [],
      default_language: settings['defaultLanguage'] ?? 'en',
      domain: settings['main_domain'] ?? '',
      redirect_to_maindomain: settings['redirectToMaindomain'] ?? false,
      debug_admin_translations: settings['debug_admin_translations'] ?? false
    },
    objects: settings['objects'],
    assets: settings['assets'],
    documents: settings['documents']
  }
}

const transformFallbackLanguagesForForm = (fallbackLanguages: Record<string, string> | undefined): Record<string, string[]> => {
  if (!fallbackLanguages) return {}

  const transformed: Record<string, string[]> = {}
  Object.keys(fallbackLanguages).forEach(locale => {
    const value = fallbackLanguages[locale]
    transformed[locale] = value ? value.split(',').map(lang => lang.trim()) : []
  })
  return transformed
}

//TODO check if this is needed elsewhere
const transformFallbackLanguagesForSubmit = (fallbackLanguages: Record<string, string[]> | undefined): Record<string, string> => {
  if (!fallbackLanguages) return {}

  const transformed: Record<string, string> = {}
  Object.keys(fallbackLanguages).forEach(locale => {
    const value = fallbackLanguages[locale]
    transformed[locale] = Array.isArray(value) ? value.join(',') : ''
  })
  return transformed
}