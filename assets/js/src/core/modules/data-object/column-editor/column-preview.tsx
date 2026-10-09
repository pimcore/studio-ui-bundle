/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { useInjection } from '@Pimcore/app/depency-injection'
import { Box } from '@Pimcore/components/box/box'
import { Flex } from '@Pimcore/components/flex/flex'
import { Grid } from '@Pimcore/components/grid/grid'
import { GridContentRenderer } from '@Pimcore/components/grid-content-renderer/grid-content-renderer'
import { Text } from '@Pimcore/components/text/text'
import {
  type DynamicTypeGridCellRegistry
} from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/dynamic-type-grid-cell-registry'
import { useLanguageSelection } from '@Pimcore/components/language-selection/provider/use-language-selection'
import { api, type GridColumnRequest } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { ApiError, isApiErrorData } from '@Pimcore/modules/app/error-handler'
import { createColumnHelper } from '@tanstack/react-table'
import { type AdvancedEditorColumn } from './types'

export interface ColumnPreviewProps {
  column: AdvancedEditorColumn
  objectId: number | null
  pipelineValue?: Record<string, any>
}

const columnHelper = createColumnHelper()

const PreviewGrid = ({ value }: { value: Array<{ type: string, value: any }> }): React.JSX.Element => {
  const advancedGridCellRegistry = useInjection<DynamicTypeGridCellRegistry>(
    serviceIds['DynamicTypes/AdvancedGridCellRegistry']
  )

  const columns = value.map((item, index) => {
    const isAdvancedCellType = advancedGridCellRegistry.hasDynamicType(item.type)
    const safeKey = `${item.type.replace(/\./g, '_')}-${index}`

    return columnHelper.accessor(safeKey, {
      header: item.type,
      meta: {
        editable: false,
        type: isAdvancedCellType ? item.type : 'dataobject.adapter',
        config: {
          ...(isAdvancedCellType
            ? {}
            : {
                dataObjectType: item.type,
                dataObjectConfig: {}
              })
        }
      }
    })
  })

  const row: Record<string, any> = {}
  value.forEach((item, index) => {
    const safeKey = `${item.type.replace(/\./g, '_')}-${index}`
    row[safeKey] = item.value
  })

  return (
    <GridContentRenderer>
      <Grid
        autoWidth
        columns={ columns }
        data={ [row] }
      />
    </GridContentRenderer>
  )
}

interface PreviewResultProps {
  column: AdvancedEditorColumn
  objectId: number
  pipelineValue?: Record<string, any>
}

const PreviewResult = ({ column, objectId, pipelineValue }: PreviewResultProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { currentLanguage } = useLanguageSelection()

  const pipeline = (pipelineValue !== undefined && Object.keys(pipelineValue).length > 0)
    ? pipelineValue
    : column.pipeline

  // A freshly added (or still-empty) pipeline has no source fields yet - querying the backend at
  // that point always fails with "Invalid column configuration" (422), since there is nothing to
  // resolve a value from. Skip the request entirely until the user has added at least one source
  // field, and show a hint instead of a misleading generic error.
  const sourceFields = pipeline?.sourceFields ?? []
  const hasSourceFields = sourceFields.length > 0

  // Resolve locale: explicit per-column override > global language (only for localizable columns)
  // The `default` language is a sentinel for the non-localized bucket; the grid pipeline sends null for it.
  const effectiveLanguage = column.locale ?? currentLanguage
  const resolvedLocale = column.localizable === true
    ? (effectiveLanguage === 'default' ? null : effectiveLanguage)
    : undefined

  const { data, error, isFetching } = api.endpoints.dataObjectGetGridPreview.useQuery({
    body: {
      objectId,
      column: {
        type: column.type,
        key: column.key,
        locale: resolvedLocale,
        config: {
          advancedColumns: sourceFields,
          transformers: pipeline?.transformers
        } as unknown as GridColumnRequest['config']
      }
    }
  }, { skip: !hasSourceFields })

  // Keep the last successful data so re-fetches don't flash "no data"
  const lastData = useRef(data)
  if (data !== undefined) lastData.current = data

  if (!hasSourceFields) {
    return <Text type='secondary'>{ t('column-editor.preview.no-source-fields') }</Text>
  }

  if (error !== undefined) {
    // Surface the backend's actual validation message (e.g. "Invalid column configuration")
    // rather than a generic fallback whenever the API error response carries one.
    const content = isApiErrorData(error) ? new ApiError(error).getContent() : undefined
    const message = typeof content === 'string' ? content : t('column-editor.preview.error')
    return <Text type='danger'>{ message }</Text>
  }

  if (isFetching && lastData.current === undefined) {
    return <Text type='secondary'>{ t('column-editor.preview.loading') }</Text>
  }

  const value = lastData.current?.value

  if (value === undefined || value === null || !Array.isArray(value) || value.length === 0) {
    return <Text type='secondary'>{ t('column-editor.preview.no-data') }</Text>
  }

  return <PreviewGrid value={ value } />
}

export const ColumnPreview = ({ column, objectId, pipelineValue }: ColumnPreviewProps): React.JSX.Element => {
  const { t } = useTranslation()

  // Debounce pipeline changes so the previous result stays visible during edits
  const [debouncedPipelineValue, setDebouncedPipelineValue] = useState(pipelineValue)
  useEffect(() => {
    const timer = setTimeout(() => { setDebouncedPipelineValue(pipelineValue) }, 300)
    return () => { clearTimeout(timer) }
  }, [pipelineValue])

  return (
    <Box padding={ { top: 'small', bottom: 'none', x: 'small' } }>
      <Flex
        align='center'
        gap='small'
        wrap='wrap'
      >
        <Text style={ { wordBreak: 'keep-all', flexShrink: 0 } }>{ t('grid.advanced-column.preview') }:</Text>
        { objectId === null
          ? (
            <Text type='secondary'>
              { t('column-editor.preview.placeholder') }
            </Text>
            )
          : (
            <PreviewResult
              column={ column }
              objectId={ objectId }
              pipelineValue={ debouncedPipelineValue }
            />
            ) }
      </Flex>
    </Box>
  )
}
