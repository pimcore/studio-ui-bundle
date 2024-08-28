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

import { Icon } from '@Pimcore/components/icon/icon'
import { Popconfirm, Space } from 'antd'
import { Button } from '@Pimcore/components/button/button'
import React, { type MouseEvent } from 'react'
import { useStyles } from './tab-title-view.styles'
import { useTranslation } from 'react-i18next'

interface TabTitleViewProps {
  icon: string
  title: string
  onClose?: () => void
  onConfirm?: () => void
}

export const TabTitleView = ({ icon, title, onClose, onConfirm }: TabTitleViewProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()

  const triggerClose = (): void => {
    onClose?.()
  }

  const triggerConfirm = (): void => {
    onConfirm?.()
  }

  return (
    <Space className={ ['widget-manager-tab-title', styles.title].join(' ') }>
      <Icon
        name={ icon }
        options={ { width: 16, height: 16 } }
      />
      <span>{title}</span>

      {onClose !== undefined && onConfirm !== undefined && (
        <Popconfirm
          onConfirm={ triggerConfirm }
          title={ t('widget-manager.tab-title.close-confirmation') }
        >
          { renderCloseButton() }
        </Popconfirm>
      )}

      {onClose !== undefined && onConfirm === undefined && renderCloseButton()}
    </Space>
  )

  function renderCloseButton (): React.JSX.Element {
    return (
      <Button
        className='widget-manager__tab-title-close-button'
        onClick={ triggerClose }
        onMouseDown={ (event: MouseEvent) => { event.stopPropagation() } }
        type={ 'link' }
      >
        <Icon
          name='close'
          options={ { width: 10, height: 10 } }
        />
      </Button>
    )
  }
}
