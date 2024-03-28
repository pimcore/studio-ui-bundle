import { Icon } from '@Pimcore/components/icon/icon'
import { Space } from 'antd'
import React from 'react'
import { useStyles } from './tab-title-view.styles'

interface TabTitleViewProps {
  icon: string
  title: string
}

export const TabTitleView = ({ icon, title }: TabTitleViewProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <Space className={ ['widget-manager-tab-title', styles.title].join(' ') }>
      <Icon
        name={ icon }
        options={ { width: 16, height: 16 } }
      />
      <span>{title}</span>
    </Space>
  )
}
