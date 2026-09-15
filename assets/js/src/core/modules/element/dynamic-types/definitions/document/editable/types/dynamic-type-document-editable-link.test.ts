/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type LinkValue } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/link/link'
import { type DocumentLinkEditableValue } from './dynamic-type-document-editable-link'

// The abstract base is decorated with inversify's @injectable and link-editable pulls
// in antd — neither is relevant to transformValueForApi, which is a pure function.
jest.mock('../dynamic-type-document-editable-abstract', () => ({
  DynamicTypeDocumentEditableAbstract: class DynamicTypeDocumentEditableAbstract {
    transformValue (value: unknown): unknown {
      return value
    }
  }
}))

jest.mock('../components/link-editable/link-editable', () => ({
  LinkEditable: () => null
}))

const {
  DynamicTypeDocumentEditableLink
} = jest.requireActual('./dynamic-type-document-editable-link')

const linkValue = (overrides: Partial<LinkValue> = {}): LinkValue => ({
  text: 'Some link',
  linktype: 'internal',
  direct: null,
  internal: null,
  internalType: null,
  fullPath: '/en/some-page',
  target: null,
  parameters: '',
  anchor: '',
  title: '',
  accesskey: '',
  rel: '',
  tabindex: '',
  class: '',
  ...overrides
})

const transform = (value: LinkValue): DocumentLinkEditableValue => {
  const type = new DynamicTypeDocumentEditableLink()

  return type.transformValueForApi(value, {} as any) as DocumentLinkEditableValue
}

describe('DynamicTypeDocumentEditableLink.transformValueForApi', () => {
  it('keeps a link internal when both the id and the internal type are present', () => {
    const result = transform(linkValue({ internal: 42, internalType: 'document' }))

    expect(result.linktype).toBe('internal')
    expect(result.internal).toBe(true)
    expect(result.internalId).toBe(42)
    expect(result.internalType).toBe('document')
    expect(result.path).toBe('/en/some-page')
    expect(result.fullPath).toBe('/en/some-page')
  })

  // The case reported in #459: the target document was deleted, so the value still
  // claims linktype: 'internal' but has neither an id nor a type left behind it.
  it('sends a link whose internal target was deleted as a direct link', () => {
    const result = transform(linkValue({ internal: null, internalType: null }))

    expect(result.linktype).toBe('direct')
    expect(result.internal).toBe(false)
    expect(result.internalId).toBeNull()
    expect(result.internalType).toBeNull()
    expect('internalType' in result).toBe(true)
    // The path the link used to resolve to is kept as a plain direct link.
    expect(result.path).toBe('/en/some-page')
    expect(result.fullPath).toBe('/en/some-page')
  })

  it('downgrades to a direct link when the internal type is missing', () => {
    const result = transform(linkValue({ internal: 42, internalType: null }))

    expect(result.linktype).toBe('direct')
    expect(result.internal).toBe(false)
    expect(result.internalId).toBeNull()
    expect(result.path).toBe('/en/some-page')
    // The key has to survive JSON.stringify — an `undefined` internalType is dropped
    // from the request body, which is what made the backend keep the stale internal
    // link instead of clearing it.
    expect('internalType' in result).toBe(true)
    expect(result.internalType).toBeNull()
  })

  it('downgrades to a direct link when the internal id is missing', () => {
    const result = transform(linkValue({ internal: null, internalType: 'document' }))

    expect(result.linktype).toBe('direct')
    expect(result.internal).toBe(false)
    expect(result.internalId).toBeNull()
    expect(result.path).toBe('/en/some-page')
    expect('internalType' in result).toBe(true)
    expect(result.internalType).toBe('document')
  })

  it('leaves a direct link untouched', () => {
    const result = transform(linkValue({
      linktype: 'direct',
      direct: 'https://example.com',
      fullPath: 'https://example.com'
    }))

    expect(result.linktype).toBe('direct')
    expect(result.internal).toBe(false)
    expect(result.internalId).toBeNull()
    expect(result.path).toBe('https://example.com')
    expect('internalType' in result).toBe(true)
  })

  it('serialises internalType so the backend receives the cleared value', () => {
    const result = transform(linkValue({ internal: 42, internalType: null }))

    const serialised = JSON.parse(JSON.stringify(result)) as Record<string, unknown>

    expect(Object.keys(serialised)).toContain('internalType')
  })
})
