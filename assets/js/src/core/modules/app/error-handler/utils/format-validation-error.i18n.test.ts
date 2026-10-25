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
            'validation.slug': 'The URL slug {{value}} in {{field}} is already in use',
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

    expect(text).toEqual({ text: `Title max 5: ${value}`, includesLabel: true })
  })

  it('keeps a value with a later placeholder in it literally (value before the other placeholders)', () => {
    const result = resolveValidationMessage({
      message: 'm',
      messageKey: 'validation.slug',
      parameters: { value: '/{{field}}' }
    }, 'Slug')

    expect(result).toEqual({ text: 'The URL slug /{{field}} in Slug is already in use', includesLabel: true })
  })

  it('writes object and array values as JSON and booleans as text, never as [object Object]', () => {
    const result = resolveValidationMessage({
      message: 'm',
      messageKey: 'validation.slug',
      parameters: { value: { a: [1, true] } }
    }, 'Slug')

    expect(result).toEqual({ text: 'The URL slug {"a":[1,true]} in Slug is already in use', includesLabel: true })
  })

  it('ignores server sent parameter names that are i18next options', () => {
    const result = resolveValidationMessage({
      message: 'm',
      messageKey: 'validation.max_length',
      parameters: { count: 2, lng: 'de', returnObjects: true, max: 5, value: 'v' }
    }, 'Title')

    expect(result).toEqual({ text: 'Title max 5: v', includesLabel: true })
  })

  it.each(['validation.empty', 'validation.same', 'validation.unknown'])('falls back to the message for %s', key => {
    expect(resolveValidationMessage({ message: 'Plain', messageKey: key }, 'Title'))
      .toEqual({ text: 'Plain', includesLabel: false })
  })
})
