/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { Tag } from 'antd'
import { isNil } from 'lodash'
import { Space } from '@Pimcore/components/space/space'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Spin } from '@Pimcore/components/spin/spin'
import { type StackListProps } from '@Pimcore/components/stack-list/stack-list'
import { ColumnEditorItemBody } from './column-editor-item'
import { ColumnLocaleControl } from './column-locale-control'
import { ClassificationStoreColumnLabel } from './classification-store-column-label'
import {
  ADVANCED_COLUMN_TYPE,
  CLASSIFICATION_STORE_COLUMN_TYPE,
  type AdvancedEditorColumn
} from './types'

const getColumnLabel = (col: AdvancedEditorColumn): string => col.key === '' ? '' : col.key

export interface BuildColumnStackItemsParams {
  draft: AdvancedEditorColumn[]
  resolvedClassId?: string
  compact: boolean
  entity: string
  objectId: number | null
  sourceFieldsRegistryId: string
  transformersRegistryId: string
  onPipelineChange: (id: string, pipeline: Record<string, any>) => void
  onLocaleChange: (id: string, locale: string | null) => void
  onRemove: (id: string) => void
}

/**
 * Builds the `StackList` items for the column editor's draft (extracted out of
 * {@see BaseColumnEditor} to keep that component under the file line budget).
 */
export const buildColumnStackItems = ({
  draft,
  resolvedClassId,
  compact,
  entity,
  objectId,
  sourceFieldsRegistryId,
  transformersRegistryId,
  onPipelineChange,
  onLocaleChange,
  onRemove
}: BuildColumnStackItemsParams): StackListProps['items'] => draft.map(col => {
  const isAdvanced = col.type === ADVANCED_COLUMN_TYPE
  const isClassificationStore = col.type === CLASSIFICATION_STORE_COLUMN_TYPE
  const label = getColumnLabel(col)

  return {
    id: col._id,
    sortable: true,
    type: isAdvanced ? 'collapse' as const : 'default' as const,
    defaultActive: isAdvanced && col.isNew === true,
    children: isAdvanced
      ? <Tag color='purple'>{ !isNil(col.pipeline?.title) ? String(col.pipeline?.title) : label }</Tag>
      : (
        <Tag>
          { isClassificationStore
            ? (
              <ClassificationStoreColumnLabel
                classId={ resolvedClassId }
                column={ col }
              />
              )
            : label }
        </Tag>
        ),
    ...(isAdvanced
      ? {
          body: col.pipelineConfig !== undefined
            ? (
              <ColumnEditorItemBody
                classDefinitionId={ resolvedClassId }
                column={ col }
                compact={ compact }
                entity={ entity }
                objectId={ objectId }
                onPipelineChange={ onPipelineChange }
                sourceFieldsRegistryId={ sourceFieldsRegistryId }
                transformersRegistryId={ transformersRegistryId }
              />
              )
            : <Spin />
        }
      : {}),
    renderRightToolbar: (
      <Space size='mini'>
        { col.localizable === true && isAdvanced && (
          <ColumnLocaleControl
            onChange={ (locale) => { onLocaleChange(col._id, locale) } }
            value={ col.locale }
          />
        ) }
        <IconButton
          icon={ { value: 'trash' } }
          onClick={ () => { onRemove(col._id) } }
          theme='secondary'
        />
      </Space>
    )
  }
})
