/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getUntranslatedLanguages } from './get-untranslated-languages'

describe('getUntranslatedLanguages', () => {
  const validLanguages = ['en', 'de', 'fr']

  it('returns all languages while the translations are not known yet', () => {
    expect(getUntranslatedLanguages(validLanguages, undefined)).toEqual(['en', 'de', 'fr'])
  })

  it('removes the language of the document itself', () => {
    expect(getUntranslatedLanguages(validLanguages, { language: 'en', translationLinks: [] })).toEqual(['de', 'fr'])
  })

  it('removes languages that already have a linked translation', () => {
    const translations = {
      language: 'en',
      translationLinks: [
        { language: 'en', documentId: 1 },
        { language: 'de', documentId: 2 }
      ]
    }

    expect(getUntranslatedLanguages(validLanguages, translations)).toEqual(['fr'])
  })

  it('handles a response without translation links', () => {
    expect(getUntranslatedLanguages(validLanguages, { language: 'de' })).toEqual(['en', 'fr'])
  })

  it('also removes the explicitly given current language', () => {
    expect(getUntranslatedLanguages(validLanguages, undefined, 'fr')).toEqual(['en', 'de'])
  })
})
