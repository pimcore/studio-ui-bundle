/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode } from 'react'
import { Tag } from 'antd'
import { type TFunction } from 'i18next'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Space } from '@Pimcore/components/space/space'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { ColumnPreview } from '@Pimcore/components/preview-mode/column-preview'
import { Preview } from './forms/advanced-column-form/preview/preview'
import { AdvancedColumnForm } from './forms/advanced-column-form/advanced-column-form'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { hasFieldDefinition } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/has-field-definition'
import { isSearchModeDraftColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/search-mode-draft-columns'
import { SearchModeColumnBadge } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/view-layer/components/search-mode-column-badge/search-mode-column-badge'
import { type PipelineItemPosition, PipelineItemExpandProvider } from '@Pimcore/components/pipeline/provider/pipeline-item-expand/pipeline-item-expand-provider'

interface PipelineItemRef extends PipelineItemPosition {
  columnId: string
}

const getTranslationKey = (column: AvailableColumn): string => {
  if (!hasFieldDefinition(column.config)) {
    return `${column.key}`
  }

  const fieldDefinition = column.config.fieldDefinition as Record<string, any>
  return !isEmptyValue(fieldDefinition?.title) ? fieldDefinition?.title : column.key
}

export const renderColumnTitle = (column: AvailableColumn, t: TFunction): ReactNode => {
  if (column.key === 'advanced') {
    // @todo translation
    return <Tag color='purple'>{column?.__meta?.advancedColumnConfig?.title ?? 'Add a title'}</Tag>
  }

  return (
    <Tooltip title={ Array.isArray(column.group) ? column.group.join('/') : undefined }>
      <Tag>{t(`${getTranslationKey(column)}`)}</Tag>
    </Tooltip>
  )
}

export interface AdvancedBodyOptions {
  column: AvailableColumn
  uniqueId: string
  previewEnabled: boolean
  focusedPipelineItem?: PipelineItemRef
  onExpandPipelineItem?: (item: PipelineItemRef) => void
  onChange: (column: AvailableColumn) => void
}

export const buildAdvancedBody = ({ column, uniqueId, previewEnabled, focusedPipelineItem, onExpandPipelineItem, onChange }: AdvancedBodyOptions): { body: ReactNode, collapsedBody?: ReactNode } => ({
  body: (
    <PipelineItemExpandProvider
      focusedItem={ focusedPipelineItem?.columnId === uniqueId ? focusedPipelineItem : undefined }
      onExpandItem={ onExpandPipelineItem === undefined ? undefined : (position) => { onExpandPipelineItem({ ...position, columnId: uniqueId }) } }
    >
      <AdvancedColumnForm
        column={ column }
        onChange={ onChange }
      />
    </PipelineItemExpandProvider>
  ),
  // an open card shows the form's row; a collapsed one shows this
  ...(previewEnabled ? { collapsedBody: <ColumnPreview>{() => <Preview column={ column } />}</ColumnPreview> } : {})
})

export interface RightToolbarOptions {
  column: AvailableColumn
  uniqueId: string
  t: TFunction
  isConvertible: boolean
  languageSelection: ReactNode
  onConvert: () => void
  onRemove: () => void
}

export const renderRightToolbar = ({ column, t, isConvertible, languageSelection, onConvert, onRemove }: RightToolbarOptions): ReactNode => {
  // search mode columns can only be moved: they come and go with the mode
  if (isSearchModeDraftColumn(column)) {
    return <SearchModeColumnBadge />
  }

  return (
    <Space size='mini'>
      { isConvertible && (
        <IconButton
          icon={ { value: 'transformation' } }
          onClick={ onConvert }
          size='small'
          theme='secondary'
          tooltip={ { title: t('listing.grid-config.convert-to-advanced') } }
        />
      ) }
      { languageSelection }
      <IconButton
        aria-label={ t('remove') }
        icon={ { value: 'trash' } }
        onClick={ onRemove }
        size='small'
        theme='secondary'
        tooltip={ { title: t('remove') } }
      />
    </Space>
  )
}
