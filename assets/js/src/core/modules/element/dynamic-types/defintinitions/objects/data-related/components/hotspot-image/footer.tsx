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

import React, { type ReactElement } from 'react'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { type HotspotImageValue } from './hotspot-image'
import { isEmpty, isNumber } from 'lodash'
import { Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { useAssetHelper } from '@Pimcore/modules/asset/hooks/use-asset-helper'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import {
  hasValueData
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/hotspot-image/utils/value-data'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { ElementSelectorButton } from '@Pimcore/modules/element/element-selector/components/triggers/button/element-selector-button'
import { SelectionType } from '@Pimcore/components/dropdown/selection/selection-provider'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import { type ImageValue } from '../image/image'

interface HotspotImageFooterProps {
  emptyValue?: () => void
  disabled?: boolean
  value?: HotspotImageValue | null
  setValue: (value: HotspotImageValue | null) => void
  setCropModalOpen: (open: boolean) => void
  setMarkerModalOpen: (open: boolean) => void
  replaceImage: (newImage: ImageValue) => void
}

export const HotspotImageFooter = (props: HotspotImageFooterProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { openAsset } = useAssetHelper()
  const messageApi = useMessage()

  const clearValueData = async (): Promise<void> => {
    props.setValue({
      ...props.value!,
      hotspots: [],
      marker: [],
      crop: {}
    })

    await messageApi.success(t('hotspots.data-cleared'))
  }

  const buttons: ReactElement[] = [
    <Tooltip
      key="open"
      title={ t('open') }
    >
      <IconButton
        disabled={ isEmpty(props.value) }
        icon={ { value: 'open-folder' } }
        onClick={ () => {
          if (typeof props.value?.image?.id === 'number') {
            openAsset({ config: { id: props.value.image.id } })
          }
        } }
      />
    </Tooltip>
  ]

  if (props.disabled !== true) {
    buttons.push(
      <ElementSelectorButton elementSelectorConfig={ {
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
          if (!isEmpty(event.items)) {
            props.replaceImage({
              type: elementTypes.asset,
              id: event.items[0].data.id
            })
          }
        }
      } }
      />
    )

    buttons.push(
      <Tooltip
        key="empty"
        title={ t('empty') }
      >
        <IconButton
          disabled={ isEmpty(props.value) || props.disabled }
          icon={ { value: 'trash' } }
          onClick={ props.emptyValue }
        />
      </Tooltip>
    )
  }

  if (isNumber(props.value?.image?.id)) {
    buttons.push(
      <Dropdown
        key="more"
        menu={ {
          items: [
            {
              label: t('crop'),
              key: 'crop',
              icon: <Icon value={ 'crop' } />,
              onClick: async () => {
                props.setCropModalOpen(true)
              }
            },
            {
              label: t(props.disabled === true ? 'hotspots.show' : 'hotspots.edit'),
              key: 'hotspots-edit',
              icon: <Icon value={ 'new-marker' } />,
              onClick: async () => {
                props.setMarkerModalOpen(true)
              }
            },
            {
              hidden: props.disabled === true || !hasValueData(props.value),
              label: t('hotspots.clear-data'),
              key: 'clear-data',
              icon: <Icon value={ 'remove-marker' } />,
              onClick: clearValueData
            }
          ]
        } }
        placement='topLeft'
        trigger={ ['click'] }
      >
        <IconButton
          icon={ { value: 'more' } }
          onClick={ (e) => { e.stopPropagation() } }
          size="small"
        />
      </Dropdown>
    )
  }

  return (
    <ButtonGroup
      items={ buttons }
      noSpacing
    />
  )
}
