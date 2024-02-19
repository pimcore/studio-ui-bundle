import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'
import { useStyles } from './widget-title.styles'

interface WidgetTitleProps {
  title: string
  icon: string
  className?: string
}

const WidgetTitle = (props: WidgetTitleProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { title, icon } = props

  return (
    <div className={styles.WidgetTitle}>
      <Icon name={icon} options={{
        width: 18,
        height: 18
      }} />

      <span>{title}</span>
    </div>
  )
}

export { WidgetTitle }
