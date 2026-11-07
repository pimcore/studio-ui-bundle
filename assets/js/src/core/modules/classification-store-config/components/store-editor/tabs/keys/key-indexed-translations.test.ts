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

const LOCALES = ['de', 'en', 'es', 'fr', 'it', 'nl', 'no', 'pl', 'sv']

/** Translation keys the Classification Store index control introduces. */
const NEW_KEYS = ['classification-store.key-indexed', 'classification-store.key-indexed-hint']

/** A key that carries real text in all nine files today, so a wrong path fails loudly. */
const ANCHOR_KEY = 'classification-store.add-sub-group-store-hint'

/** The decided English hint: it describes the state the control is in, it does not instruct. */
const ENGLISH_HINT = 'While off, this key cannot be sorted, filtered or searched on, and its value is ' +
  'removed from the stored search document. The index converges through the queue, so changes are not immediate.'

const messages = (locale: string): Record<string, string> => yaml.load(
  fs.readFileSync(path.join(TRANSLATIONS_DIR, `studio.${locale}.yaml`), 'utf8')
) as Record<string, string>

describe('Classification Store index control translations', () => {
  it('reads the nine locale files the bundle ships', () => {
    expect(
      fs.readdirSync(TRANSLATIONS_DIR).filter((name) => name.startsWith('studio.')).sort()
    ).toEqual(LOCALES.map((locale) => `studio.${locale}.yaml`).sort())

    expect(messages('en')[ANCHOR_KEY]).toEqual(expect.any(String))
  })

  it('states the three consequences of the off state in English', () => {
    expect(messages('en')['classification-store.key-indexed-hint']).toBe(ENGLISH_HINT)
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
