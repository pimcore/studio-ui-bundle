/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { App } from 'antd'
import {
  type ArgsProps,
  type ConfigOptions,
  type JointContent,
  type MessageInstance,
  type MessageType
} from 'antd/es/message/interface'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'
import { useStyle } from '@Pimcore/components/message/message.style'

export const useMessage = (messageConfig?: ConfigOptions): MessageInstance => {
  const { message } = App.useApp()
  const decoratedMessage = { ...message }
  const { styles } = useStyle()

  decoratedMessage.info = (content: JointContent, duration?: number | VoidFunction, onClose?: VoidFunction): MessageType => {
    let config: ArgsProps
    if (content !== null && typeof content === 'object' && 'content' in content) {
      config = content
    } else {
      config = {
        content
      }
    }

    config.icon = (
      <Icon
        options={ { width: '16px', height: '16px' } }
        value={ 'info-circle' }
      />
    )

    return message.info(
      config,
      duration,
      onClose
    )
  }

  decoratedMessage.open = (config: ArgsProps): MessageType => {
    if (config.type === 'info') {
      return message.open({
        icon: <Icon
          options={ { width: '16px', height: '16px' } }
          value={ 'info-circle' }
              />,
        className: styles.message,
        ...config
      })
    }

    return message.open({
      className: styles.message,
      ...config
    })
  }

  return decoratedMessage
}
