import React from 'react'
import { Button, Space } from 'antd'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { Icon } from '@Pimcore/components/icon/icon'

export const WidgetManagerActions = (): React.JSX.Element => {
  const { openMainWidget, openBottomWidget, openLeftWidget, openRightWidget } = useWidgetManager()

  function onOpenMainWidgetClick (): void {
    openMainWidget({
      component: 'widget-manager-actions',
      name: 'Widget Manager Actions'
    })
  }

  function onOpenBottomWidgetClick (): void {
    openBottomWidget({
      component: 'widget-manager-actions',
      name: 'Widget Manager Actions'
    })
  }

  function onOpenLeftWidgetClick (): void {
    openLeftWidget({
      component: 'widget-manager-actions',
      name: 'Widget Manager Actions'
    })
  }

  function onOpenRightWidgetClick (): void {
    openRightWidget({
      component: 'widget-manager-actions',
      name: 'Widget Manager Actions'
    })
  }

  return (
    <Space style={{ padding: '8px' }}>
      <Button type="primary" icon={<Icon name='folder' options={{ width: 12, height: 12 }}/>} onClick={onOpenMainWidgetClick}>Open Main Widget</Button>
      <Button type="default" icon={<Icon name='camera' options={{ width: 12, height: 12 }} />} onClick={onOpenBottomWidgetClick}>Open Bottom Widget</Button>
      <Button type="text" icon={<Icon name='folder' options={{ width: 12, height: 12 }} />} onClick={onOpenLeftWidgetClick}>Open Left Widget</Button>
      <Button type="dashed" icon={<Icon name='camera' options={{ width: 12, height: 12 }} />} onClick={onOpenRightWidgetClick}>Open Right Widget</Button>
    </Space>
  )
}
