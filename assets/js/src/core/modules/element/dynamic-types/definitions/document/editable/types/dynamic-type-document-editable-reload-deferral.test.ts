/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AbstractDocumentEditableDefinition } from '../dynamic-type-document-editable-abstract'

// The editable components pull in antd and the document editor; only the type classes are under test.
jest.mock('../components/block-editable/block-editable', () => ({ BlockEditable: () => null }))
jest.mock('../components/block-editable/utils/block-manager', () => ({ BlockManager: jest.fn() }))
jest.mock('../components/scheduledblock-editable/scheduledblock-editable', () => ({ ScheduledblockEditable: () => null }))
jest.mock('../components/scheduledblock-editable/utils/scheduledblock-manager', () => ({ ScheduledblockManager: jest.fn() }))
jest.mock('../components/scheduledblock-editable/utils/scheduledblock-utils', () => ({ scheduledblockValueUtils: {} }))
jest.mock('../components/areablock-editable/areablock-editable', () => ({}))
jest.mock('../components/areablock-editable/with-areablock-render-query', () => ({ WithAreablockRenderQuery: () => null }))
jest.mock('../components/areablock-editable/utils/areablock-manager', () => ({ AreablockManager: jest.fn() }))
jest.mock('../components/areablock-editable/utils/areablock-utils', () => ({
  buildGroupedTypes: jest.fn(),
  DEFAULT_AREABLOCK_GROUP: 'default',
  UNCATEGORIZED_AREABLOCK_GROUP: 'uncategorized'
}))
jest.mock('../components/link-editable/link-editable', () => ({ LinkEditable: () => null }))
jest.mock('@Pimcore/app/public-api/helpers/api-helper', () => ({ getPimcoreStudioApi: jest.fn() }))

const { DynamicTypeDocumentEditableBlock } = jest.requireActual('./dynamic-type-document-editable-block')
const { DynamicTypeDocumentEditableScheduledblock } = jest.requireActual('./dynamic-type-document-editable-scheduledblock')
const { DynamicTypeDocumentEditableAreablock } = jest.requireActual('./dynamic-type-document-editable-areablock')
const { DynamicTypeDocumentEditableLink } = jest.requireActual('./dynamic-type-document-editable-link')

const definition = { name: 'teaser', config: { reload: true } } as unknown as AbstractDocumentEditableDefinition

describe('canDeferReloadOnChange', () => {
  it.each([
    ['block', new DynamicTypeDocumentEditableBlock()],
    ['scheduledblock', new DynamicTypeDocumentEditableScheduledblock()],
    ['areablock', new DynamicTypeDocumentEditableAreablock()]
  ])('is false for the structural %s editable, whose rows are rendered by the reload', (_name, type) => {
    expect(type.canDeferReloadOnChange(definition)).toBe(false)
  })

  it('is true by default for value editables such as link', () => {
    expect(new DynamicTypeDocumentEditableLink().canDeferReloadOnChange(definition)).toBe(true)
  })
})
