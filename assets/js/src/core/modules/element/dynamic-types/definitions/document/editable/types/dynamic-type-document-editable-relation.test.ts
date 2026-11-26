/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// The abstract base is decorated with inversify's @injectable and relation-editable pulls
// in antd — neither is relevant to transformValue, which is a pure function.
jest.mock('../dynamic-type-document-editable-abstract', () => ({
  DynamicTypeDocumentEditableAbstract: class DynamicTypeDocumentEditableAbstract {
    transformValue (value: unknown): unknown {
      return value
    }
  }
}))

jest.mock('../components/relation-editable/relation-editable', () => ({
  RelationEditable: () => null
}))

const {
  DynamicTypeDocumentEditableRelation
} = jest.requireActual('./dynamic-type-document-editable-relation')

describe('DynamicTypeDocumentEditableRelation.transformValue', () => {
  const type = new DynamicTypeDocumentEditableRelation()

  it('maps the editmode payload of core, including its lowercase subtype', () => {
    expect(type.transformValue({ id: 7, path: '/en/snippet', elementType: 'document', subtype: 'snippet' }))
      .toEqual({ id: 7, type: 'document', fullPath: '/en/snippet', subtype: 'snippet' })
  })

  it('returns null for an empty relation', () => {
    expect(type.transformValue(null)).toBeNull()
  })
})
