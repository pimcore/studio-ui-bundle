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
import { useTranslation } from 'react-i18next'
import { FlexContainerView } from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/preview/flex-container-view'
import { PreviewCard } from '@Pimcore/components/preview-card/preview-card'
import { useAssetHelper } from '@Pimcore/modules/asset/hooks/use-asset-helper'
import { type AssetGetTreeApiResponse } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { type DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'

interface FlexContainerProps {
  assets: AssetGetTreeApiResponse
}

const FlexContainer = (props: FlexContainerProps): React.JSX.Element => {
  const { assets } = props
  const { t } = useTranslation()
  const { openAsset } = useAssetHelper()

  const dropdownItems: DropdownProps['menu']['items'] = [
    {
      key: 'locate-in-tree',
      icon: <Icon name="target" />,
      label: t('preview-card.locate-in-tree')
    },
    {
      key: 'info',
      icon: <Icon name="info-circle-outlined" />,
      label: t('preview-card.info')
    },
    {
      key: 'rename',
      icon: <Icon name="rich-edit" />,
      label: t('preview-card.rename')
    },
    {
      key: 'download-zip',
      icon: <Icon name="download-02" />,
      label: t('preview-card.download-zip')
    },
    {
      key: 'delete',
      icon: <Icon name="trash" />,
      label: t('preview-card.delete')
    }
  ]

  const cards: ReactNode[] = []
  assets.items.forEach((asset) => {
    const onClickCard = (e): void => {
      openAsset({
        config: {
          id: asset.id
        }
      })
    }

    if ('imageThumbnailPath' in asset && asset.imageThumbnailPath !== undefined && asset.imageThumbnailPath !== null) {
      cards.push(
        <PreviewCard
          dropdownItems={ dropdownItems }
          imgSrc={ asset.imageThumbnailPath }
          key={ asset.id }
          name={ asset.filename! }
          onClick={ onClickCard }
        />
      )
    }
  })

  return (
    <FlexContainerView renderElements={ cards } />
  )
}

export { FlexContainer }
