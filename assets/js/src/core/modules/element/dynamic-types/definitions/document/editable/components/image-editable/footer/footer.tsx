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
import { isNil } from 'lodash'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Space } from '@Pimcore/components/space/space'
import { ElementSelectorButton } from '@Pimcore/modules/element/element-selector/components/triggers/button/element-selector-button'
import { SelectionType } from '@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider'

export interface ImageEditableConfig {
  width?: number
  height?: number
  title?: string
  reload?: boolean
}

export interface ImageEditableValue {
  id?: number
  alt?: string
  title?: string
  hotspots?: any[]
  marker?: any[]
  crop?: any
}

interface DocumentImageEditableFooterProps {
  config?: ImageEditableConfig
  disabled?: boolean
  emptyValue: () => void
  replaceImage: (assetId: number) => void
  setCropModalOpen: (open: boolean) => void
  setMarkerModalOpen: (open: boolean) => void
  setValue: (value: ImageEditableValue) => void
  value?: ImageEditableValue
}

export const DocumentImageEditableFooter = (props: DocumentImageEditableFooterProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Space>
      <ElementSelectorButton
        disabled={ props.disabled }
        elementSelectorConfig={ {
          selectionType: SelectionType.Single,
          areas: {
            asset: true,
            object: false,
            document: false
          },
          config: {
            assets: {
              allowedTypes: ['image']
            }
          },
          onFinish: (event) => {
            if (event.items.length > 0) {
              props.replaceImage(event.items[0].data.id)
            }
          }
        } }
      >
        {t('select')}
      </ElementSelectorButton>

      <IconButton
        disabled={ props.disabled === true || isNil(props.value?.id) }
        icon={ { value: 'location-marker' } }
        onClick={ () => { props.setMarkerModalOpen(true) } }
        title={ t('hotspots-markers') }
      />

      <IconButton
        disabled={ props.disabled === true || isNil(props.value?.id) }
        icon={ { value: 'crop' } }
        onClick={ () => { props.setCropModalOpen(true) } }
        title={ t('crop') }
      />

      <IconButton
        disabled={ props.disabled === true || isNil(props.value?.id) }
        icon={ { value: 'trash' } }
        onClick={ props.emptyValue }
        title={ t('empty') }
      />
    </Space>
  )
}
