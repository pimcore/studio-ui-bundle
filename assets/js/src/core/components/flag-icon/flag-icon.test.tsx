/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AppConfig } from '@Pimcore/app/config/app-config'

jest.mock('@sdk/modules/app', () => ({
  GeneralError: class GeneralError extends Error {},
  trackError: jest.fn()
}))

jest.mock('@Pimcore/app/config/app-config', () => ({
  appConfig: { languageFlagMapping: {} }
}))

// eslint-disable-next-line import/first
import { resolveLanguageFlag } from './flag-icon'

const { appConfig } = jest.requireMock<{ appConfig: Pick<AppConfig, 'languageFlagMapping'> }>('@Pimcore/app/config/app-config')

describe('resolveLanguageFlag', () => {
  const existingCountryFlags = new Set(['es', 'us', 'de', 'gb'])
  const existingLanguageFlags = new Set(['ca'])

  const flagExists = async (flagCode: string): Promise<boolean> => existingCountryFlags.has(flagCode)
  const languageFlagExists = async (flagCode: string): Promise<boolean> => existingLanguageFlags.has(flagCode)

  afterEach(() => {
    appConfig.languageFlagMapping = {}
  })

  it('resolves a mapped language code to its country flag', async () => {
    expect(await resolveLanguageFlag('de', flagExists, languageFlagExists))
      .toEqual({ flagCode: 'de', isLanguageFlag: false })
  })

  it('resolves the country part of a locale when its flag exists', async () => {
    expect(await resolveLanguageFlag('es_US', flagExists, languageFlagExists))
      .toEqual({ flagCode: 'us', isLanguageFlag: false })
  })

  it('resolves a language-specific flag when available', async () => {
    expect(await resolveLanguageFlag('ca', flagExists, languageFlagExists))
      .toEqual({ flagCode: 'ca', isLanguageFlag: true })
  })

  it('falls back to the mapped language flag when the country part has no flag', async () => {
    // https://github.com/pimcore/service-operations/issues/824 (PEES-1111):
    // es_IC (Canary Islands) and custom locales like es_IB showed "?" instead of the Spanish flag
    expect(await resolveLanguageFlag('es_IC', flagExists, languageFlagExists))
      .toEqual({ flagCode: 'es', isLanguageFlag: false })
    expect(await resolveLanguageFlag('es_IB', flagExists, languageFlagExists))
      .toEqual({ flagCode: 'es', isLanguageFlag: false })
  })

  it('returns the unknown flag when nothing can be resolved', async () => {
    expect(await resolveLanguageFlag('xx_YY', flagExists, languageFlagExists))
      .toEqual({ flagCode: '_unknown', isLanguageFlag: false })
  })

  describe('with pimcore_studio_ui.language_flag_mapping', () => {
    // https://github.com/pimcore/platform-version/issues/462: en meaning American English showed the Union Jack
    it('lets a configured entry override the built-in mapping', async () => {
      appConfig.languageFlagMapping = { en: 'us' }

      expect(await resolveLanguageFlag('en', flagExists, languageFlagExists))
        .toEqual({ flagCode: 'us', isLanguageFlag: false })
      expect(await resolveLanguageFlag('en_GB', flagExists, languageFlagExists))
        .toEqual({ flagCode: 'gb', isLanguageFlag: false })
    })

    it('normalises configured language codes written as locales', async () => {
      appConfig.languageFlagMapping = { en_GB: 'gb-eng' }

      expect(await resolveLanguageFlag('en_GB', flagExists, languageFlagExists))
        .toEqual({ flagCode: 'gb-eng', isLanguageFlag: false })
      expect(await resolveLanguageFlag('en-gb', flagExists, languageFlagExists))
        .toEqual({ flagCode: 'gb-eng', isLanguageFlag: false })
      expect(await resolveLanguageFlag('en', flagExists, languageFlagExists))
        .toEqual({ flagCode: 'gb', isLanguageFlag: false })
    })

    it('accepts configured country codes in upper case', async () => {
      appConfig.languageFlagMapping = { en: 'US' }

      expect(await resolveLanguageFlag('en', flagExists, languageFlagExists))
        .toEqual({ flagCode: 'us', isLanguageFlag: false })
    })

    it('uses a configured language for the fallback of a locale without a country flag', async () => {
      appConfig.languageFlagMapping = { en: 'us' }

      expect(await resolveLanguageFlag('en_ZZ', flagExists, languageFlagExists))
        .toEqual({ flagCode: 'us', isLanguageFlag: false })
    })

    it('keeps resolving unconfigured codes as before', async () => {
      appConfig.languageFlagMapping = { en: 'us' }

      expect(await resolveLanguageFlag('de', flagExists, languageFlagExists))
        .toEqual({ flagCode: 'de', isLanguageFlag: false })
      expect(await resolveLanguageFlag('es_US', flagExists, languageFlagExists))
        .toEqual({ flagCode: 'us', isLanguageFlag: false })
      expect(await resolveLanguageFlag('ca', flagExists, languageFlagExists))
        .toEqual({ flagCode: 'ca', isLanguageFlag: true })
      expect(await resolveLanguageFlag('es_IC', flagExists, languageFlagExists))
        .toEqual({ flagCode: 'es', isLanguageFlag: false })
    })
  })
})
