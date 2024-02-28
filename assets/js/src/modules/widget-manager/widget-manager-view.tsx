import React from 'react'
import { Layout, type ILayoutProps } from 'flexlayout-react'
import { useStlyes } from './widget-manager-view.styles'

export interface WidgetManagerProps extends ILayoutProps {}

export const WidgetManagerView = ({ ...props }: WidgetManagerProps): React.JSX.Element => {
  const { styles } = useStlyes()

  return (
    <div className={['widget-manager', styles.widgetManager].join(' ')}>
      <Layout { ...props } />
    </div>
  )
}
