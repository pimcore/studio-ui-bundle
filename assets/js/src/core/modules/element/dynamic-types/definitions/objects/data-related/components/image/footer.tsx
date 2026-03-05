/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactElement } from 'react'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { isEmpty } from 'lodash'
import { Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { useAssetHelper } from '@Pimcore/modules/asset/hooks/use-asset-helper'
import { ElementSelectorButton } from '@Pimcore/modules/element/element-selector/components/triggers/button/element-selector-button'
import { SelectionType } from '@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'

export interface ImageValue {
  type: 'asset'
  id: number
  fullpath?: string
}

interface ImageFooterProps {
  emptyValue?: () => void
  disabled?: boolean
  setValue: (value: ImageValue | null) => void
  value?: ImageValue | null
  onSearch?: () => void
  onUpload?: () => void
}

export const ImageFooter = (props: ImageFooterProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { openAsset } = useAssetHelper()

  const buttons: ReactElement[] = [
    <Tooltip
      key="open"
      title={ t('open') }
    >
      <IconButton
        disabled={ isEmpty(props.value) }
        icon={ { value: 'open-folder' } }
        onClick={ () => {
          if (typeof props.value?.id === 'number') {
            openAsset({ config: { id: props.value.id } })
          }
        } }
      />
    </Tooltip>
  ]
  if (props.disabled !== true) {
    buttons.unshift(
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
            props.setValue({
              type: elementTypes.asset,
              id: event.items[0].data.id,
              fullpath: event.items[0].data.fullpath
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
          disabled={ isEmpty(props.value) }
          icon={ { value: 'trash' } }
          onClick={ props.emptyValue }
        />
      </Tooltip>
    )

    if (!isEmpty(props.value) && (props.onSearch !== undefined || props.onUpload !== undefined)) {
      buttons.push(
        <Dropdown
          key="more"
          menu={ {
            items: [

              {
                hidden: props.onSearch === undefined,
                label: t('search'),
                key: 'search',
                icon: <Icon value={ 'search' } />,
                onClick: () => props.onSearch?.()
              },
              {
                hidden: props.onUpload === undefined,
                label: t('upload'),
                key: 'upload',
                icon: <Icon value={ 'upload-cloud' } />,
                onClick: () => props.onUpload?.()
              }
            ]
          } }
          placement='topLeft'
          trigger={ ['click'] }
        >
          <IconButton
            icon={ { value: 'more' } }
            onClick={ (e) => { e.stopPropagation() } }
          />
        </Dropdown>
      )
    }
  }

  return (
    <ButtonGroup
      items={ buttons }
      noSpacing
    />
  )
}
