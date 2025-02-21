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
import {
  type ImageValue
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/image/image'
import { isEmpty } from 'lodash'
import { Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { useAssetHelper } from '@Pimcore/modules/asset/hooks/use-asset-helper'
import { ElementSelectorButton } from '@Pimcore/modules/element/element-selector/components/triggers/button/element-selector-button'
import { SelectionType } from '@Pimcore/components/dropdown/selection/selection-provider'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'

interface ImageFooterProps {
  emptyValue?: () => void
  disabled?: boolean
  setValue: (value: ImageValue | null) => void
  value?: ImageValue | null
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
            props.setValue({
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
          disabled={ isEmpty(props.value) }
          icon={ { value: 'trash' } }
          onClick={ props.emptyValue }
        />
      </Tooltip>
    )
  }

  return (
    <ButtonGroup
      items={ buttons }
      noSpacing
    />
  )
}
