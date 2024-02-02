import { Icon } from '@Pimcore/components/icon/icon'
import { Space } from 'antd'
import React from 'react'

interface WidgetTabTitleProps {
  icon: string
  title: string
}

export const WidgetTabTitle = ({ icon, title }: WidgetTabTitleProps): React.JSX.Element => {
  return (
    <Space>
      <Icon name={icon} options={{ width: 16, height: 16 }} />
      <span>{title}</span>
    </Space>
  )
}
