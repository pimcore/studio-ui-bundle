import React, { type ReactNode } from 'react'
import { type ApiAssetsGetCollection } from '@Pimcore/modules/asset/asset-api'
import { useTranslation } from 'react-i18next'
import { FlexContainerView } from '@Pimcore/modules/asset/types/folder/editor-tabs/tabs/preview/flex-container-view'
import { PreviewCard } from '@Pimcore/components/preview-card/preview-card'
import type { DropdownMenuItemProps } from '@Pimcore/components/dropdown-menu/dropdown-menu'

interface FlexContainerProps {
  assets: ApiAssetsGetCollection
}

const FlexContainer = (props: FlexContainerProps): React.JSX.Element => {
  const { assets } = props
  const { t } = useTranslation()

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
  assets.forEach((asset) => {
    cards.push(
        <PreviewCard key={asset.id}
                     name={asset.filename}
                     dropdownItems={dropdownItems}
                     imgSrc={asset.fullPath}
        />
    )
  })

  return (
        <FlexContainerView renderElements={cards} />
  )
}

export { FlexContainer }
