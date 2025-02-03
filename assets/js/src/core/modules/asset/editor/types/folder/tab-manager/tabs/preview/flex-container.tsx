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

import React, { type ReactNode } from 'react'
import {
  FlexContainerView
} from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/preview/flex-container-view'
import { type AssetGetTreeApiResponse } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import {
  PreviewCardContainer
} from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/preview/card/preview-card-container'

interface FlexContainerProps {
  assets: AssetGetTreeApiResponse
}

const FlexContainer = (props: FlexContainerProps): React.JSX.Element => {
  const { assets } = props

  const cards: ReactNode[] = []
  assets.items.forEach((asset) => {
    cards.push(
      <PreviewCardContainer
        asset={ asset }
      />
    )
  })

  return (
    <FlexContainerView renderElements={ cards } />
  )
}

export { FlexContainer }
