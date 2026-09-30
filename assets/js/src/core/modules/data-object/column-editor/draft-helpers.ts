/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type GridColumnConfiguration } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { ADVANCED_COLUMN_TYPE, type AdvancedEditorColumn } from './types'

const findAvailableField = (
  col: AdvancedEditorColumn,
  fields: GridColumnConfiguration[]
): GridColumnConfiguration | undefined => {
  return fields.find(f => f.key === col.key || (col.type === ADVANCED_COLUMN_TYPE && f.type === col.type))
}

export const hydrateDraft = (
  draft: AdvancedEditorColumn[],
  fields: GridColumnConfiguration[]
): AdvancedEditorColumn[] => {
  return draft.map(col => {
    const available = findAvailableField(col, fields)
    if (available === undefined) return col
    return {
      ...col,
      localizable: col.localizable ?? available.localizable,
      pipelineConfig: col.pipelineConfig ?? (available.config as Record<string, any> | undefined)
    }
  })
}

export const reorderDraft = (draft: AdvancedEditorColumn[], ids: string[]): AdvancedEditorColumn[] => {
  return ids
    .map(id => draft.find(col => col._id === id))
    .filter((col): col is AdvancedEditorColumn => col !== undefined)
}
