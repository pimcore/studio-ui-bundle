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
import {
  type ImageValue
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/image/image'
import _ from 'lodash'
import { Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { useAssetHelper } from '@Pimcore/modules/asset/hooks/use-asset-helper'

interface ImageFooterProps {
  emptyValue?: () => void
  disabled?: boolean
  value?: ImageValue | null
}

export const ImageFooter = (props: ImageFooterProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { openAsset } = useAssetHelper()

  return (
    <ButtonGroup items={ [
      <Tooltip
        key="empty"
        title={ t('empty') }
      >
        <IconButton
          disabled={ _.isEmpty(props.value) || props.disabled }
          icon={ { value: 'delete-outlined' } }
          onClick={ props.emptyValue }
        />
      </Tooltip>,
      <Tooltip
        key="open"
        title={ t('open') }
      >
        <IconButton
          disabled={ _.isEmpty(props.value) }
          icon={ { value: 'group' } }
          onClick={ () => {
            if (typeof props.value?.id === 'number') {
              openAsset({ config: { id: props.value.id } })
            }
          } }
        />
      </Tooltip>
    ] }
    />
  )
}
