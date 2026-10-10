/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import i18n from 'i18next'
import { resolveValidationMessage } from './format-validation-error'


describe('resolveValidationMessage with real i18next', () => {
  beforeAll(async () => {
    await i18n.init({
      lng: 'en',
      keySeparator: false,
      resources: {
        en: {
          translation: {
            'validation.max_length': '{{field}} max {{max}}: {{value}}',
            'validation.empty': '',
            'validation.same': 'validation.same'
          }
        }
      }
    })
  })

  it('does not interpret or escape entered values', () => {
    const value = '<b>x</b> {{field}} $t(foo)'
    const text = resolveValidationMessage(
      { message: 'm', messageKey: 'validation.max_length', parameters: { max: 5, value } },
      'Title'
    )

    expect(text).toEqual({ text: `Title max 5: ${value}`, translated: true })
  })

  it('ignores server sent parameter names that are i18next options', () => {
    const result = resolveValidationMessage({
      message: 'm',
      messageKey: 'validation.max_length',
      parameters: { count: 2, lng: 'de', returnObjects: true, max: 5, value: 'v' }
    }, 'Title')

    expect(result).toEqual({ text: 'Title max 5: v', translated: true })
  })

  it.each(['validation.empty', 'validation.same', 'validation.unknown'])('falls back to the message for %s', key => {
    expect(resolveValidationMessage({ message: 'Plain', messageKey: key }, 'Title'))
      .toEqual({ text: 'Plain', translated: false })
  })
})
