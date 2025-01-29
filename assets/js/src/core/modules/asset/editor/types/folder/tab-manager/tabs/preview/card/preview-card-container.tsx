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

import { type AssetGetTreeApiResponse } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { PreviewCard } from '@Pimcore/components/preview-card/preview-card'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAssetHelper } from '@Pimcore/modules/asset/hooks/use-asset-helper'
import { useRename } from '@Pimcore/modules/element/actions/rename/use-rename'
import { useDelete } from '@Pimcore/modules/element/actions/delete/use-delete'
import { useDownload } from '@Pimcore/modules/asset/actions/download/use-download'
import { useUploadNewVersion } from '@Pimcore/modules/asset/actions/upload-new-version/upload-new-version'
import { useOpen } from '@Pimcore/modules/element/actions/open/open'
import type { DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import { getElementActionCacheKey } from '@Pimcore/modules/element/element-helper'

interface PreviewCardContainerProps {
  asset: AssetGetTreeApiResponse['items'][number]
}

export const PreviewCardContainer = ({ asset }: PreviewCardContainerProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { openAsset } = useAssetHelper()
  const { renameContextMenuItem } = useRename('asset', getElementActionCacheKey('asset', 'rename', asset.id))
  const { deleteContextMenuItem } = useDelete('asset', getElementActionCacheKey('asset', 'delete', asset.id))
  const { downloadContextMenuItem } = useDownload()
  const { uploadNewVersionContextMenuItem } = useUploadNewVersion()
  const { openContextMenuItem } = useOpen('asset')

  const onClickCard = (e): void => {
    openAsset({
      config: {
        id: asset.id
      }
    })
  }

  const dropdownItems: DropdownProps['menu']['items'] = [
    openContextMenuItem(asset),
    {
      key: 'locate-in-tree',
      icon: <Icon value="target" />,
      label: t('preview-card.locate-in-tree'),
      hidden: true
    },
    {
      key: 'info',
      icon: <Icon value="info-circle" />,
      label: t('info'),
      hidden: true
    },
    renameContextMenuItem(asset),
    uploadNewVersionContextMenuItem(asset),
    downloadContextMenuItem(asset),
    deleteContextMenuItem(asset)
  ]

  return (
    <PreviewCard
      dropdownItems={ dropdownItems }
      imgSrc={ 'imageThumbnailPath' in asset ? asset.imageThumbnailPath : asset.icon }
      key={ asset.id }
      name={ asset.filename! }
      onClick={ onClickCard }
    />
  )
}
