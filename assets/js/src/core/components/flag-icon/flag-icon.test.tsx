/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

jest.mock('@sdk/modules/app', () => ({
  GeneralError: class GeneralError extends Error {},
  trackError: jest.fn()
}))

// eslint-disable-next-line import/first
import { resolveLanguageFlag } from './flag-icon'

describe('resolveLanguageFlag', () => {
  const existingCountryFlags = new Set(['es', 'us', 'de', 'gb'])
  const existingLanguageFlags = new Set(['ca'])

  const flagExists = async (flagCode: string): Promise<boolean> => existingCountryFlags.has(flagCode)
  const languageFlagExists = async (flagCode: string): Promise<boolean> => existingLanguageFlags.has(flagCode)

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
})
