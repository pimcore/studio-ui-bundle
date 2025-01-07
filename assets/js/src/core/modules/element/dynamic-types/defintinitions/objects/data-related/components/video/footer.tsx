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
  type VideoValue
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/video/video'
import _ from 'lodash'
import { Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'

interface VideoFooterProps {
  emptyValue?: () => void
  disabled?: boolean
  value?: VideoValue | null
}

export const VideoFooter = (props: VideoFooterProps): React.JSX.Element => {
  const { t } = useTranslation()

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
      </Tooltip>
    ] }
    />
  )
}
