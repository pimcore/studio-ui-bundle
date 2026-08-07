/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Element, getElementKey } from './element-helper'
import { type DataObject } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { type Document } from '@Pimcore/modules/document/document-api-slice.gen'

jest.mock('@Pimcore/app/router/router', () => ({ baseUrl: '' }))

const buildDataObject = (overrides: Partial<DataObject>): Element => {
  return {
    key: 'original-key',
    customAttributes: {
      icon: null,
      tooltip: null,
      additionalIcons: [],
      key: null,
      additionalCssClasses: []
    },
    ...overrides
  } as unknown as Element
}

const buildDocument = (overrides: Partial<Document>): Element => {
  return {
    key: 'original-key',
    ...overrides
  } as unknown as Element
}

describe('getElementKey', () => {
  it('returns the custom attribute key for a data object when it is set', () => {
    const dataObject = buildDataObject({
      key: 'original-key',
      customAttributes: {
        icon: null,
        tooltip: null,
        additionalIcons: [],
        key: 'custom-key',
        additionalCssClasses: []
      }
    })

    expect(getElementKey(dataObject, 'data-object')).toBe('custom-key')
  })

  it('falls back to the element key for a data object when no custom attribute key is set', () => {
    const dataObject = buildDataObject({ key: 'original-key' })

    expect(getElementKey(dataObject, 'data-object')).toBe('original-key')
  })

  it('returns the custom attribute key for a document when it is set', () => {
    const document = buildDocument({
      key: 'original-key',
      customAttributes: {
        icon: null,
        tooltip: null,
        additionalIcons: [],
        key: 'custom-key',
        additionalCssClasses: []
      }
    })

    expect(getElementKey(document, 'document')).toBe('custom-key')
  })

  it('falls back to the element key for a document when no custom attribute key is set', () => {
    const document = buildDocument({ key: 'original-key' })

    expect(getElementKey(document, 'document')).toBe('original-key')
  })
})
