import React from 'react'
import { Layout, type ILayoutProps } from 'flexlayout-react'
import { useStlyes } from './widget-manager-view.styles'

export interface WidgetManagerProps extends ILayoutProps {
  className?: string
}

export const WidgetManagerView = ({ className, ...props }: WidgetManagerProps): React.JSX.Element => {
  const { styles } = useStlyes()

  return (
    <div className={['widget-manager', className, styles.widgetManager].join(' ')}>
      <Layout { ...props } />
    </div>
  )
}
