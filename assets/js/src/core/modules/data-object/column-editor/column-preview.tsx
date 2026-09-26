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
import { type DynamicTypeGridCellRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/dynamic-type-grid-cell-registry'
import { useLanguageSelection } from '@Pimcore/components/language-selection/provider/use-language-selection'
import { api, type GridColumnRequest } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
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

  // Resolve locale: explicit per-column override > global language (only for localizable columns)
  const resolvedLocale = column.localizable === true
    ? (column.locale ?? currentLanguage)
    : undefined

  const { data, error, isFetching } = api.endpoints.dataObjectGetGridPreview.useQuery({
    body: {
      objectId,
      column: {
        type: column.type,
        key: column.key,
        locale: resolvedLocale,
        config: pipeline !== undefined
          ? {
              advancedColumns: pipeline.sourceFields ?? [],
              transformers: pipeline.transformers
            } as unknown as GridColumnRequest['config']
          : undefined
      }
    }
  })

  // Keep the last successful data so re-fetches don't flash "no data"
  const lastData = useRef(data)
  if (data !== undefined) lastData.current = data

  if (error !== undefined) {
    const message = 'error' in (error as object) ? (error as any).error : t('column-editor.preview.error')
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
      >
        <Text style={ { wordBreak: 'keep-all' } }>{ t('grid.advanced-column.preview') }:</Text>
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
