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
import { GridCellPreviewWrapper } from '../grid-cell-cell-preview-wrapper/grid-cell-preview-wrapper'
import { Tag } from '@Pimcore/components/tag/tag'
import { useTranslation } from 'react-i18next'

interface ItemsCountProps {
  count: number
}

export const ItemsCount = ({ count }: ItemsCountProps): React.JSX.Element => {
  const { t } = useTranslation()
  if (count < 1) {
    return <></>
  }

  return (
    <GridCellPreviewWrapper overflow="auto">
      <Tag>{count} {t(count === 1 ? 'entry' : 'entries')}</Tag>
    </GridCellPreviewWrapper>
  )
}
