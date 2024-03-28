import { message } from 'antd'
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

export const useMessage = (messageConfig?: ConfigOptions): readonly [MessageInstance, React.ReactElement] => {
  const [messageApi, contextHolder] = message.useMessage(messageConfig)
  const { styles } = useStyle()

  messageApi.info = (content: JointContent, duration?: number | VoidFunction, onClose?: VoidFunction): MessageType => {
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
        name={ 'info-circle-filled' }
        options={ { width: '16px', height: '16px' } }
      />
    )

    return message.info(
      config,
      duration,
      onClose
    )
  }

  messageApi.open = (config: ArgsProps): MessageType => {
    if (config.type === 'info') {
      return message.open({
        icon: <Icon
          name={ 'info-circle-filled' }
          options={ { width: '16px', height: '16px' } }
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

  return [messageApi, contextHolder]
}
