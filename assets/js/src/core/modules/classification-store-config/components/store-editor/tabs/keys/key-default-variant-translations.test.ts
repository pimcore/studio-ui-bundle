/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

/** The locale files the bundle ships, at the repository root above `assets/js/src`. */
const TRANSLATIONS_DIR = path.resolve(__dirname, '../../../../../../../../../../translations')

/**
 * The locales the bundle ships today. They are the floor, not the ceiling: the per-locale checks
 * below run over whatever `studio.*.yaml` the directory actually holds, so adding a tenth locale
 * puts it under the same requirement instead of failing a count.
 */
const SHIPPED_LOCALES = ['de', 'en', 'es', 'fr', 'it', 'nl', 'no', 'pl', 'sv']

/** Every locale file present, read from disk so a new one is covered the day it is added. */
const LOCALES = fs.readdirSync(TRANSLATIONS_DIR)
  .map((name) => /^studio\.([A-Za-z_-]+)\.yaml$/.exec(name)?.[1])
  .filter((locale): locale is string => locale !== undefined)
  .sort()

/** Translation keys the multiValue default variant control and its refusal introduce. */
const NEW_KEYS = [
  'classification-store.multi-value.default-variant-permitted',
  'classification-store.multi-value.default-variant-label',
  'classification-store.multi-value.no-writable-slot'
]

/** A key that carries real text in every locale file today, so a wrong path fails loudly. */
const ANCHOR_KEY = 'classification-store.multi-value.default-variant'

const messages = (locale: string): Record<string, string> => yaml.load(
  fs.readFileSync(path.join(TRANSLATIONS_DIR, `studio.${locale}.yaml`), 'utf8')
) as Record<string, string>

describe('Classification Store multiValue default variant translations', () => {
  it('reads the locale files the bundle ships', () => {
    expect(LOCALES).toEqual(expect.arrayContaining(SHIPPED_LOCALES))

    expect(messages('en')[ANCHOR_KEY]).toEqual(expect.any(String))
  })

  it.each(LOCALES)('carries every new key with a non-empty value in %s', (locale) => {
    const translations = messages(locale)

    for (const key of NEW_KEYS) {
      expect(typeof translations[key]).toBe('string')
      expect(translations[key].trim()).not.toBe('')
    }
  })

  it.each(LOCALES.filter((locale) => locale !== 'en'))('translates them rather than copying English into %s', (locale) => {
    const english = messages('en')
    const translations = messages(locale)

    for (const key of NEW_KEYS) {
      expect(translations[key]).not.toBe(english[key])
    }
  })
})
