/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactElement, useState } from 'react'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import {
  type VideoType,
  type VideoValue
} from './video'
import { useTranslation } from 'react-i18next'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { VideoModal } from '@Pimcore/modules/element/components/video-modal/video-modal'
import { isEmpty } from 'lodash'

interface VideoFooterProps {
  emptyValue?: () => void
  disabled?: boolean
  value?: VideoValue | null
  onSave?: (value: VideoValue) => void
  allowedVideoTypes?: VideoType[]
}

export const VideoFooter = (props: VideoFooterProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = (): void => {
    setIsModalVisible(true)
  }

  const handleModalOk = (value: VideoValue): void => {
    props.onSave?.(value)
    setIsModalVisible(false)
  }

  const handleModalCancel = (): void => {
    setIsModalVisible(false)
  }

  const buttons: ReactElement[] = []

  if (props.disabled !== true) {
    buttons.push((
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
    ))

    buttons.push((
      <Tooltip
        key="edit"
        title={ t('edit') }
      >
        <IconButton
          icon={ { value: 'edit' } }
          onClick={ showModal }
        />
      </Tooltip>
    ))
  }

  if (props.disabled === true) {
    buttons.push((
      <Tooltip
        key="details"
        title={ t('details') }
      >
        <IconButton
          icon={ { value: 'info-circle' } }
          onClick={ showModal }
        />
      </Tooltip>
    ))
  }

  return (
    <>
      <ButtonGroup
        items={ buttons }
        noSpacing
      />
      <VideoModal
        allowedVideoTypes={ props.allowedVideoTypes }
        disabled={ props.disabled }
        onCancel={ handleModalCancel }
        onOk={ handleModalOk }
        open={ isModalVisible }
        value={ props.value }
      />
    </>
  )
}
