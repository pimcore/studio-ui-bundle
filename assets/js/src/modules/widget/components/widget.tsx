import React from 'react'
import { WidgetTitle } from './widget-title'
import { useStyles } from './widget.styles'

interface WidgetProps {
  title: string
  showTitle?: boolean
  icon: string
  children: React.ReactNode
}

const Widget = (props: WidgetProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { title, showTitle, icon, children } = props

  return (
    <div className={['widget', styles.Widget].join(' ')}>
      {showTitle === true && (
        <WidgetTitle icon={icon} title={title} />
      )}

      <div className='widget__content'>
        {children}
      </div>
    </div>
  )
}

export { Widget }
