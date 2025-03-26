/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
