/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AssetGetTreeApiResponse } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { PreviewCard } from '@Pimcore/components/preview-card/preview-card'
import React from 'react'
import { useAssetHelper } from '@Pimcore/modules/asset/hooks/use-asset-helper'
import { isString } from 'lodash'
import { useContextMenuSlot } from '@Pimcore/modules/app/context-menu-registry/use-context-menu-slot'
import { contextMenuConfig } from '@Pimcore/modules/app/context-menu-registry/context-menu-config'

interface PreviewCardContainerProps {
  asset: AssetGetTreeApiResponse['items'][number]
}

export const PreviewCardContainer = ({ asset }: PreviewCardContainerProps): React.JSX.Element => {
  const { openAsset } = useAssetHelper()

  const onClickCard = (e): void => {
    openAsset({
      config: {
        id: asset.id
      }
    })
  }

  const context = {
    asset,
    onComplete: () => {}
  }

  const dropdownItems = useContextMenuSlot(contextMenuConfig.assetPreviewCard.name, context)

  return (
    <PreviewCard
      dropdownItems={ dropdownItems }
      imgSrc={ 'imageThumbnailPath' in asset && isString(asset.imageThumbnailPath) ? asset.imageThumbnailPath : asset.icon }
      key={ asset.id }
      name={ asset.filename }
      onClick={ onClickCard }
    />
  )
}
