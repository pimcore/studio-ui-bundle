import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'

interface WidgetTabBorderProps {
  icon: string
  title: string
}

export const WidgetBorderTitle = ({ icon, title }: WidgetTabBorderProps): React.JSX.Element => {
  return (
    <div>
      <Icon name={icon} options={{ width: 16, height: 16 }} />
    </div>
  )
}
