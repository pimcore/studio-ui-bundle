/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import UnknownFlag from '@Pimcore/assets/images/flags/_unknown.inline.svg?react'
import { GeneralError, trackError } from '@sdk/modules/app'

interface IFlagIconProps {
  value: string | null
  width?: number
  height?: number
}

const languageCountryMapping: Record<string, string> = {
  aa: 'er',
  af: 'za',
  am: 'et',
  as: 'in',
  ast: 'es',
  asa: 'tz',
  az: 'az',
  bas: 'cm',
  eu: 'es',
  be: 'by',
  bem: 'zm',
  bez: 'tz',
  bg: 'bg',
  bm: 'ml',
  bn: 'bd',
  br: 'fr',
  brx: 'in',
  bs: 'ba',
  cs: 'cz',
  da: 'dk',
  de: 'de',
  dz: 'bt',
  el: 'gr',
  en: 'gb',
  es: 'es',
  et: 'ee',
  fi: 'fi',
  fo: 'fo',
  fr: 'fr',
  ga: 'ie',
  gv: 'im',
  he: 'il',
  hi: 'in',
  hr: 'hr',
  hu: 'hu',
  hy: 'am',
  id: 'id',
  ig: 'ng',
  is: 'is',
  it: 'it',
  ja: 'jp',
  ka: 'ge',
  os: 'ge',
  kea: 'cv',
  kk: 'kz',
  kl: 'gl',
  km: 'kh',
  ko: 'kr',
  lg: 'ug',
  lo: 'la',
  lt: 'lt',
  mg: 'mg',
  mk: 'mk',
  mn: 'mn',
  ms: 'my',
  mt: 'mt',
  my: 'mm',
  nb: 'no',
  ne: 'np',
  nl: 'nl',
  nn: 'no',
  pl: 'pl',
  pt: 'pt',
  ro: 'ro',
  ru: 'ru',
  sg: 'cf',
  sk: 'sk',
  sl: 'si',
  sq: 'al',
  sr: 'rs',
  sv: 'se',
  swc: 'cd',
  th: 'th',
  to: 'to',
  tr: 'tr',
  tzm: 'ma',
  uk: 'ua',
  uz: 'uz',
  vi: 'vn',
  zh: 'cn',
  gd: 'gb-sct',
  'gd-gb': 'gb-sct',
  cy: 'gb-wls',
  'cy-gb': 'gb-wls',
  fy: 'nl',
  xh: 'za',
  yo: 'bj',
  zu: 'za',
  ta: 'lk',
  te: 'in',
  ss: 'za',
  sw: 'ke',
  so: 'so',
  si: 'lk',
  ii: 'cn',
  'zh-hans': 'cn',
  'zh-hant': 'cn',
  sn: 'zw',
  rm: 'ch',
  pa: 'in',
  fa: 'ir',
  lv: 'lv',
  gl: 'es',
  fil: 'ph'
}

const importFlag = async (flagCode: string): Promise<React.ReactElement | null> => {
  try {
    const module = await import(`@Pimcore/assets/images/flags/${flagCode}.inline.svg?react`)
    return module.default !== undefined ? module.default : module
  } catch {
    return null
  }
}

const importLanguageFlag = async (flagCode: string): Promise<React.ReactElement | null> => {
  try {
    const module = await import(`@Pimcore/assets/images/flags/languages/${flagCode}.inline.svg?react`)
    return module.default !== undefined ? module.default : module
  } catch {
    return null
  }
}

const flagExistenceCache: Record<string, boolean> = {}
const languageFlagExistenceCache: Record<string, boolean> = {}

const checkFlagExists = async (flagCode: string): Promise<boolean> => {
  if (flagExistenceCache[flagCode] !== undefined) {
    return flagExistenceCache[flagCode]
  }

  const exists = await importFlag(flagCode) !== null
  flagExistenceCache[flagCode] = exists
  return exists
}

const checkLanguageFlagExists = async (flagCode: string): Promise<boolean> => {
  if (languageFlagExistenceCache[flagCode] !== undefined) {
    return languageFlagExistenceCache[flagCode]
  }

  const exists = await importLanguageFlag(flagCode) !== null
  languageFlagExistenceCache[flagCode] = exists
  return exists
}

const resolveLanguageFlag = async (languageCode: string): Promise<{ flagCode: string, isLanguageFlag: boolean }> => {
  const normalizedCode = languageCode.toLowerCase().replace('_', '-')
  const parts = normalizedCode.split('-')
  const languageOnly = parts[0]
  const countryCode = parts.length > 1 ? parts[parts.length - 1] : null

  if (languageCountryMapping[normalizedCode]) {
    return { flagCode: languageCountryMapping[normalizedCode], isLanguageFlag: false }
  }

  if (await checkLanguageFlagExists(normalizedCode)) {
    return { flagCode: normalizedCode, isLanguageFlag: true }
  }

  if (countryCode && countryCode !== languageOnly && await checkFlagExists(countryCode)) {
    return { flagCode: countryCode, isLanguageFlag: false }
  }

  if (languageOnly !== normalizedCode && await checkLanguageFlagExists(languageOnly)) {
    return { flagCode: languageOnly, isLanguageFlag: true }
  }

  return { flagCode: '_unknown', isLanguageFlag: false }
}

const flagCache: Record<string, React.ReactElement | null> = {}

export const FlagIcon = ({ value, width = 21, height = 15 }: IFlagIconProps): React.JSX.Element => {
  const [flag, setFlag] = React.useState<React.ReactElement | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (!value) {
      setFlag(null)
      setLoading(false)
      return
    }

    if (flagCache[value] !== undefined) {
      setFlag(flagCache[value])
      setLoading(false)
      return
    }

    const loadFlag = async (): Promise<void> => {
      try {
        const { flagCode, isLanguageFlag } = await resolveLanguageFlag(value)
        const component = isLanguageFlag
          ? await importLanguageFlag(flagCode)
          : await importFlag(flagCode)

        flagCache[value] = component
        setFlag(component)
      } catch (error) {
        trackError(new GeneralError(`Failed to resolve flag for language ${value}: ${error}`))
        flagCache[value] = null
        setFlag(null)
      } finally {
        setLoading(false)
      }
    }

    void loadFlag()
  }, [value])

  if (loading) return <div style={ { width, height, background: '#f0f0f0' } } />

  if (flag === null || !React.isValidElement(flag)) {
    return <UnknownFlag style={ { width, height } } />
  }

  return React.cloneElement(flag as React.ReactElement<any>, {
    style: { width, height },
    width: width.toString(),
    height: height.toString()
  })
}
