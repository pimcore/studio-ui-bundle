/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type BatchEdit } from './batch-edit-provider'
import { getFormPath } from './batch-edit-list-container'

jest.mock('@Pimcore/components/stack-list/stack-list', () => ({ StackList: () => null }))
jest.mock('@Pimcore/components/button-group/button-group', () => ({ ButtonGroup: () => null }))
jest.mock('@Pimcore/components/icon-button/icon-button', () => ({ IconButton: () => null }))
jest.mock('@Pimcore/components/no-content/no-content', () => ({ NoContent: () => null }))
jest.mock('@Pimcore/modules/element/components/language-selection/permission-based-language-selection-control', () => ({ PermissionBasedLanguageSelectionControl: () => null }))
jest.mock('@Pimcore/components/form/form', () => ({ Form: { useFormInstance: () => ({}) } }))
jest.mock('./hooks/use-batch-edit', () => ({ useBatchEdit: () => ({ batchEdits: [] }) }))
jest.mock('./default-batch-edit', () => ({ DefaultBatchEdit: () => null }))

const csEdit = (variant?: string): BatchEdit => ({
  locale: null,
  key: 'attributes',
  type: 'dataobject.classificationstore',
  group: [],
  sortable: false,
  editable: true,
  localizable: true,
  config: { keyId: 12, groupId: 3, ...(variant === undefined ? {} : { variant }) }
})

describe('getFormPath for a classification store batch edit', () => {
  it('ends in <keyId>#<variant> for a variant row', () => {
    expect(getFormPath(csEdit('Imperial'), 'de')).toEqual(['attributes', '3', 'de', '12#Imperial'])
  })

  it('ends in the bare key id for the default slot, as before', () => {
    expect(getFormPath(csEdit(), null)).toEqual(['attributes', '3', 'default', '12'])
  })
})
