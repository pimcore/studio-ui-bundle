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
import { useTranslation } from 'react-i18next'
import { useStyles } from './preview-loader.styles'
import { isUndefined } from 'lodash'
import { type AdvancedColumnConfig } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { useDataObjectGetGridPreviewQuery } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { useData } from '@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { PreviewValue } from './preview-value'
import { Text } from '@Pimcore/components/text/text'
import { usePreviewItem } from './preview-item-provider'
import { useLanguageSelection } from '@Pimcore/components/language-selection'
import { ApiError, isApiErrorData } from '@Pimcore/modules/app/error-handler'

export interface PreviewProps {
  column: AvailableColumn
}

interface AdvancedColumnPipelineValue {
  advancedColumns?: unknown[]
  transformers?: unknown
  title?: string
}

export const PreviewLoader = (props: PreviewProps): React.JSX.Element => {
  const { column } = props

  const { data: gridData } = useData()
  const { item } = usePreviewItem()
  const { currentLanguage } = useLanguageSelection()

  const firstItem = gridData.items[0]
  // Only the live/persisted pipeline value (never `column.config`, the "fields to add" schema
  // catalog used to populate the source-field/transformer pickers - not an actual selection) can
  // tell us whether the user has picked any source fields yet. Falling back to that catalog here
  // sent it as the query's `config` whenever a freshly added column had not been touched, which
  // the backend always rejects ("Advanced column config is not set").
  const pipelineValue = column?.__meta?.advancedColumnConfig as AdvancedColumnPipelineValue | undefined
  const sourceFields = pipelineValue?.advancedColumns ?? []
  const hasSourceFields = Array.isArray(sourceFields) && sourceFields.length > 0

  const { t } = useTranslation()
  const { styles } = useStyles()

  const { data, error } = useDataObjectGetGridPreviewQuery({
    body: {
      column: {
        type: column.type,
        key: column.key,
        locale: column.localizable
          ? ((column.locale ?? currentLanguage) === 'default' ? null : (column.locale ?? currentLanguage))
          : undefined,
        config: pipelineValue as unknown as AdvancedColumnConfig[] | undefined
      },
      objectId: item?.data?.id ?? firstItem?.id
    }
  }, { skip: !hasSourceFields })

  if (!hasSourceFields) {
    return <Text className={ styles.descriptionText }>{t('grid.advanced-column.no-source-fields')}</Text>
  }

  if (!isUndefined(error)) {
    // Surface the backend's actual validation message when the API error response carries one,
    // rather than only the raw RTK Query network-error shape (`'error' in error`).
    const content = isApiErrorData(error) ? new ApiError(error).getContent() : undefined
    const message = typeof content === 'string' ? content : undefined

    return (
      <>
        <Text type="danger">{t('grid.advanced-column.error-preview-data')} </Text>
        <Text className={ styles.descriptionText }>{message ?? ('error' in error ? error.error : '')}</Text>
      </>
    )
  }

  return data?.value?.length > 0
    ? <PreviewValue value={ data?.value } />
    : <Text className={ styles.descriptionText }>{t('grid.advanced-column.no-preview-data')}</Text>
}
