/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - Pimcore Open Core License (POCL)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 *  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
 */

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
    <>
      <Space style={ { padding: '8px' } }>
        <Button
          icon={ <Icon
            name='folder'
            options={ { width: 12, height: 12 } }
                 /> }
          onClick={ onOpenMainWidgetClick }
          type="primary"
        >Open Main Widget</Button>
        <Button
          icon={ <Icon
            name='camera'
            options={ { width: 12, height: 12 } }
                 /> }
          onClick={ onOpenBottomWidgetClick }
          type="default"
        >Open Bottom Widget</Button>
        <Button
          icon={ <Icon
            name='folder'
            options={ { width: 12, height: 12 } }
                 /> }
          onClick={ onOpenLeftWidgetClick }
          type="text"
        >Open Left Widget</Button>
        <Button
          icon={ <Icon
            name='camera'
            options={ { width: 12, height: 12 } }
                 /> }
          onClick={ onOpenRightWidgetClick }
          type="dashed"
        >Open Right Widget</Button>
      </Space>
    </>
  )
}
