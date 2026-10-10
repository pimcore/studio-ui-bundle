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
    translate.mockImplementation((key: string, options: { replace?: Record<string, string> } = {}) =>
      translations[key].replace(/{{(\w+)}}/g, (_m, name: string) => options.replace?.[name] ?? ''))
  })

  it('translates the key and the field label', () => {
    const text = validationErrorToText({
      field: 'name', fieldTitle: 'Name', message: 'Empty', messageKey: 'validation.mandatory'
    })

    expect(text).toBe('Name (translated) is mandatory')
  })

  it('passes parameters and disables escaping', () => {
    resolveValidationMessage({ message: 'm', messageKey: 'validation.mandatory', parameters: { max: 3 } }, 'X')

    expect(translate).toHaveBeenCalledWith('validation.mandatory', {
      replace: { max: 3, field: 'X' }, nsSeparator: false, interpolation: { escapeValue: false }
    })
  })

  it.each([
    ['missing', 'validation.unknown'],
    ['empty', 'validation.empty'],
    ['equal to the key', 'validation.same']
  ])('falls back to the message when the translation is %s', (_name, messageKey) => {
    expect(resolveValidationMessage({ message: 'Plain', messageKey }, 'X')).toEqual({ text: 'Plain', translated: false })
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

  it('uses the plain message without a message key and ', () => {
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
