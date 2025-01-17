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
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { type HotspotImageValue } from './hotspot-image'
import _ from 'lodash'
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

interface HotspotImageFooterProps {
  emptyValue?: () => void
  disabled?: boolean
  value?: HotspotImageValue | null
  setValue: (value: HotspotImageValue | null) => void
  setCropModalOpen: (open: boolean) => void
  setMarkerModalOpen: (open: boolean) => void
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
      crop: null
    })

    await messageApi.success(t('hotspots.data-cleared'))
  }

  return (
    <ButtonGroup
      items={ [
        <Tooltip
          key="empty"
          title={ t('empty') }
        >
          <IconButton
            disabled={ _.isEmpty(props.value) || props.disabled }
            icon={ { value: 'trash' } }
            onClick={ props.emptyValue }
          />
        </Tooltip>,
        <Tooltip
          key="open"
          title={ t('open') }
        >
          <IconButton
            disabled={ _.isEmpty(props.value) }
            icon={ { value: 'open-folder' } }
            onClick={ () => {
              if (typeof props.value?.image?.id === 'number') {
                openAsset({ config: { id: props.value.image.id } })
              }
            } }
          />
        </Tooltip>,
        <Dropdown
          key="more"
          menu={ {
            items: [
              {
                disabled: !_.isNumber(props.value?.image?.id),
                label: t('crop'),
                key: 'crop',
                icon: <Icon value={ 'crop' } />,
                onClick: async () => {
                  props.setCropModalOpen(true)
                }
              },
              {
                disabled: !_.isNumber(props.value?.image?.id),
                label: t('hotspots.edit'),
                key: 'hotspots-edit',
                icon: <Icon value={ 'new-marker' } />,
                onClick: async () => {
                  props.setMarkerModalOpen(true)
                }
              },
              {
                disabled: !hasValueData(props.value) || props.disabled === true,
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
      ] }
      noSpacing
    />
  )
}
