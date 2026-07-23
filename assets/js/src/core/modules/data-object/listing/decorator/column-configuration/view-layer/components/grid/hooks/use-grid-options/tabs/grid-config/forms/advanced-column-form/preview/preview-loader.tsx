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
import { isUndefined } from 'lodash'
import { type AdvancedColumnConfig } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { useDataObjectGetGridPreviewQuery } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { useData } from '@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { PreviewValue } from './preview-value'
import { Text } from '@Pimcore/components/text/text'
import { usePreviewItem } from './preview-item-provider'
import { useLanguageSelection } from '@Pimcore/components/language-selection'

export interface PreviewProps {
  column: AvailableColumn
}

export const PreviewLoader = (props: PreviewProps): React.JSX.Element => {
  const { column } = props

  const { data: gridData } = useData()
  const { item } = usePreviewItem()
  const { currentLanguage } = useLanguageSelection()

  const firstItem = gridData.items[0]
  const advancedColumnConfig = (column?.__meta?.advancedColumnConfig ?? column.config) as unknown as AdvancedColumnConfig[] | undefined

  const { t } = useTranslation()

  const { data, error } = useDataObjectGetGridPreviewQuery({
    body: {
      column: {
        type: column.type,
        key: column.key,
        locale: column.localizable
          ? ((column.locale ?? currentLanguage) === 'default' ? null : (column.locale ?? currentLanguage))
          : undefined,
        config: advancedColumnConfig
      },
      objectId: item?.data?.id ?? firstItem?.id
    }
  })

  return (
    <>
      {!isUndefined(error) && (
        <Text type="danger">
          {t('grid.advanced-column.error-preview-data')}: {'error' in error ? error?.error : <></>}
        </Text>
      )}

      {isUndefined(error)
        ? (
          <>
            {data?.value?.length > 0
              ? (
                <PreviewValue value={ data?.value } />
                )
              : (
                <div>{t('grid.advanced-column.no-preview-data')}</div>
                )}
          </>
          )
        : null}
    </>
  )
}
