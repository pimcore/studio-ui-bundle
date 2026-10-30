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
import { getMissingValidationKeys, resolveValidationMessage, validationErrorToText } from './format-validation-error'

const translations: Record<string, string> = {
  Name: 'Name (translated)',
  'validation.mandatory': '{{field}} is mandatory',
  'validation.max_length': '{{field}} max {{max}}: {{value}}',
  'my_bundle.too_long': 'Must not be longer than {{max}} characters',
  'my_bundle.spaced': '{{ field }} is spaced',
  'validation.empty': '',
  'validation.same': 'validation.same'
}


jest.mock('i18next', () => ({
  __esModule: true,
  default: {
    language: 'de',
    languages: ['de', 'en'],
    getResource: jest.fn(),
    exists: jest.fn(),
    t: jest.fn()
  }
}))

const exists = i18n.exists as unknown as jest.Mock
const getResource = i18n.getResource as unknown as jest.Mock
const translate = i18n.t as unknown as jest.Mock

describe('format-validation-error', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    exists.mockImplementation((key: string) => key in translations)
    getResource.mockImplementation((lng: string, _ns: string, key: string) => lng === 'en' ? translations[key] : undefined)
    // only labels go through t() (translateLabel); validation messages are filled in without it
    translate.mockImplementation((key: string) => translations[key] ?? key)
  })

  it('translates the key and the field label', () => {
    const text = validationErrorToText({
      field: 'name', fieldTitle: 'Name', message: 'Empty', messageKey: 'validation.mandatory'
    })

    expect(text).toBe('Name (translated) is mandatory')
  })

  it('fills in the parameters and the field in one pass', () => {
    const result = resolveValidationMessage(
      { message: 'm', messageKey: 'validation.max_length', parameters: { max: 3, value: '{{field}}' } },
      'X'
    )

    expect(result).toEqual({ text: 'X max 3: {{field}}', includesLabel: true })
  })

  it('leaves a placeholder-like value alone when it comes before another placeholder', () => {
    const result = resolveValidationMessage(
      { message: 'm', messageKey: 'validation.max_length', parameters: { value: '{{max}}', max: 3 } },
      'X'
    )

    expect(result.text).toBe('X max 3: {{max}}')
  })

  it.each([
    ['missing', 'validation.unknown'],
    ['empty', 'validation.empty'],
    ['equal to the key', 'validation.same']
  ])('falls back to the message when the translation is %s', (_name, messageKey) => {
    expect(resolveValidationMessage({ message: 'Plain', messageKey }, 'X')).toEqual({ text: 'Plain', includesLabel: false })
  })

  it('does not call t() for a missing key', () => {
    resolveValidationMessage({ message: 'Secret <b>value</b>', messageKey: 'validation.unknown' }, 'X')

    expect(translate).not.toHaveBeenCalled()
  })

  it('returns unique missing keys only, never messages', () => {
    const keys = getMissingValidationKeys([
      { message: 'Secret 1', messageKey: 'validation.unknown' },
      { message: 'Secret 2', messageKey: 'validation.unknown' },
      { message: 'Secret 3', messageKey: 'validation.mandatory' },
      { message: 'Secret 3b', messageKey: 'validation.empty' },
      { message: 'Secret 3c', messageKey: 'validation.same' },
      { message: 'Secret 4', messageKey: null },
      { message: 'Secret 5', messageKey: '' },
      { message: 'Secret 6' }
    ])

    expect(keys).toEqual(['validation.unknown'])
  })

  it('uses the plain message without a message key', () => {
    expect(resolveValidationMessage({ message: 'Plain', messageKey: null }, 'X').text).toBe('Plain')
  })

  it('orders the location outer first and adds the language, index and type', () => {
    const text = validationErrorToText({
      field: 'name',
      fieldTitle: 'Other',
      message: 'bad',
      path: [
        { field: 'localizedfields', title: null, language: 'en', index: null, type: null },
        { field: 'attributes', title: 'Attributes', language: null, index: 1, type: 'SaleInformation' },
        { field: 'blocks', title: null, language: null, index: null, type: null }
      ]
    })

    expect(text).toBe('blocks › Attributes #2 › SaleInformation › Other (EN): bad')
  })

  it('keeps the label when a translation does not use {{field}}', () => {
    const text = validationErrorToText({
      field: 'code',
      fieldTitle: 'Name',
      message: 'too long',
      messageKey: 'my_bundle.too_long',
      parameters: { max: 5 }
    })

    expect(text).toBe('Name (translated): Must not be longer than 5 characters')
  })

  it('recognises a spaced {{ field }} placeholder', () => {
    expect(resolveValidationMessage({ message: 'm', messageKey: 'my_bundle.spaced' }, 'X').includesLabel).toBe(true)
  })

  it('falls back to the plain message when a {{field}} template has no field to show', () => {
    expect(validationErrorToText({ message: 'Prevented publishing', messageKey: 'validation.mandatory' }))
      .toBe('Prevented publishing')
  })

  it('puts the language on the innermost crumb when there is no field', () => {
    const text = validationErrorToText({
      message: 'bad',
      path: [
        { field: 'localizedfields', title: null, language: 'en' },
        { field: 'attributes', title: 'Attributes' }
      ]
    })

    expect(text).toBe('Attributes (EN): bad')
  })

  it('keeps a lone language when there is neither field nor location', () => {
    expect(validationErrorToText({
      message: 'bad',
      path: [{ field: 'localizedfields', title: null, language: 'de' }]
    })).toBe('(DE): bad')
  })

  it('does not use a template that names the field when only a language is known', () => {
    expect(validationErrorToText({
      message: 'Mandatory',
      messageKey: 'validation.mandatory',
      path: [{ field: 'localizedfields', title: null, language: 'de' }]
    })).toBe('(DE): Mandatory')
  })

  it('does not report malformed message keys as missing translations', () => {
    expect(getMissingValidationKeys([
      { message: 'm', messageKey: 'bad key with spaces' },
      { message: 'm', messageKey: 'validation.unknown' }
    ])).toEqual(['validation.unknown'])
  })

  it('prefers the translated brick or collection title over its key', () => {
    const text = validationErrorToText({
      field: 'power',
      message: 'bad',
      path: [
        { field: 'attributes', title: 'Attributes', type: 'EngineBrick', typeTitle: 'Engine' }
      ]
    })

    expect(text).toBe('Attributes › Engine › power: bad')
  })

  it('renders only the location and message when there is no field', () => {
    expect(validationErrorToText({ field: null, fieldTitle: null, message: 'bad', path: [] })).toBe('bad')
  })

  it('falls back to the raw field name when there is no title', () => {
    expect(validationErrorToText({ field: 'Name', fieldTitle: null, message: 'bad' })).toBe('Name: bad')
  })

  it('puts the language into the field parameter of a translated message and omits the label', () => {
    const text = validationErrorToText({
      field: 'name',
      fieldTitle: 'Name',
      message: 'Empty',
      messageKey: 'validation.mandatory',
      path: [
        { field: 'localizedfields', title: null, language: 'en', index: null, type: null },
        { field: 'attributes', title: 'Attributes', language: null, index: null, type: null }
      ]
    })

    expect(text).toBe('Attributes: Name (translated) (EN) is mandatory')
  })
})
