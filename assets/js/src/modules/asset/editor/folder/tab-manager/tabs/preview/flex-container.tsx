import React, { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { FlexContainerView } from '@Pimcore/modules/asset/editor/folder/tab-manager/tabs/preview/flex-container-view'
import { PreviewCard } from '@Pimcore/components/preview-card/preview-card'
import type { DropdownMenuItemProps } from '@Pimcore/components/dropdown-menu/dropdown-menu'
import { useAsset } from '@Pimcore/modules/asset/hooks/use-asset'
import { type GetAssetsApiResponse } from '@Pimcore/modules/asset/asset-api-slice.gen'

interface FlexContainerProps {
  assets: GetAssetsApiResponse
}

const FlexContainer = (props: FlexContainerProps): React.JSX.Element => {
  const { assets } = props
  const { t } = useTranslation()
  const { openAsset } = useAsset()

  const dropdownItems: DropdownMenuItemProps[] = [
    {
      iconLeft: 'target',
      label: t('preview-card.locate-in-tree')
    },
    {
      iconLeft: 'info-circle-outlined',
      label: t('preview-card.info'),
      iconRight: {
        name: 'right-outlined'
      }
    },
    {
      iconLeft: 'rich-edit',
      label: t('preview-card.rename')
    },
    {
      iconLeft: 'download-02',
      label: t('preview-card.download-zip')
    },
    {
      iconLeft: 'delete-outlined',
      label: t('preview-card.delete')
    }
  ]

  const cards: ReactNode[] = []
  assets.items!.forEach((asset) => {
    const onClickCard = (e): void => {
      openAsset({
        name: asset.filename!,
        icon: asset.iconName ?? 'file-question-02',

        config: {
          id: asset.id!
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
