/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ElementIcon, Icon } from '@Pimcore/components/icon/icon'
import { type IconColorGroup } from '@Pimcore/components/icon/icon-color-groups-registry'
import { Popconfirm } from 'antd'
import { Button } from '@Pimcore/components/button/button'
import React, { useState, type MouseEvent } from 'react'
import { useStyles } from './tab-title-view.styles'
import { useTranslation } from 'react-i18next'
import { Space } from '@Pimcore/components/space/space'
import { Filename } from '@Pimcore/components/filename/filename'
import { useUserDraft } from '@Pimcore/modules/auth/hooks/use-user-draft'

interface TabTitleViewProps {
  icon: ElementIcon
  title: string
  onClose?: () => void
  onConfirm?: () => void
  dataTestId?: string
  iconColorGroup?: IconColorGroup
}

export const TabTitleView = ({ icon, title, onClose, onConfirm, dataTestId, iconColorGroup }: TabTitleViewProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()
  const { user } = useUserDraft()
  const [isOpen, setIsOpen] = useState(false)

  const triggerClose = (): void => {
    onClose?.()
  }

  const triggerConfirm = (): void => {
    onConfirm?.()
  }

  const handleAllowDirtyClose = (open: boolean): void => {
    if (!open) {
      setIsOpen(open)
      return
    }

    if (user?.allowDirtyClose) {
      triggerConfirm()
    } else {
      setIsOpen(open)
    }
  }

  return (
    <Space
      className={ ['widget-manager-tab-title', styles.title].join(' ') }
      data-testid={ dataTestId }
      onMouseDown={ (evt: MouseEvent) => {
        if (evt.button === 1) {
          triggerClose()
        }
      } }
      size='mini'
    >
      <Icon
        iconColorGroup={ iconColorGroup }
        options={ { width: 16, height: 16 } }
        { ...icon }
      />

      <Filename
        ellipsis
        style={ { maxWidth: '300px', color: 'inherit' } }
        value={ title }
      />

      {onClose !== undefined && onConfirm !== undefined && (
        <Popconfirm
          onConfirm={ triggerConfirm }
          onOpenChange={ handleAllowDirtyClose }
          open={ isOpen }
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
          options={ { width: 14, height: 14 } }
          value='close'
        />
      </Button>
    )
  }
}
