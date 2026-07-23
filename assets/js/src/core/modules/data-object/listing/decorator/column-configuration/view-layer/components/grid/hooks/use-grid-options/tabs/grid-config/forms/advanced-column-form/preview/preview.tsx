/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import React, { useMemo } from 'react'
import { Box } from '@Pimcore/components/box/box'
import { useData } from '@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data'
import { PreviewLoader } from './preview-loader'
import { useDebounce } from '@Pimcore/utils/hooks/use-debounce'
import { useTranslation } from 'react-i18next'

export interface PreviewProps {
  column: AvailableColumn
}

export const Preview = (props: PreviewProps): React.JSX.Element => {
  const { data: gridData } = useData()
  const hasFirstItem = gridData?.items.length > 0 && gridData?.items?.[0] !== undefined
  const bufferedColumn = useDebounce(props.column, 300)
  const { t } = useTranslation()

  return useMemo(() => (
    <Box padding={ { top: 'small', bottom: 'none', x: 'small' } } >
      <Flex
        align="center"
        gap={ 'small' }
      >
        <Text style={ { wordBreak: 'keep-all' } }>{t('grid.advanced-column.preview')}:</Text>

        {hasFirstItem
          ? (
            <PreviewLoader column={ props.column } />
            )
          : (
            <Text type="secondary">{t('grid.advanced-column.no-preview')}</Text>
            )}
      </Flex>
    </Box>
  ), [bufferedColumn])
}
