/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { Toolbar as ToolbarView } from '@Pimcore/components/toolbar/toolbar'
import { useTranslation } from 'react-i18next'
import { Button } from '@sdk/components'
import { useUserDraft } from '@Pimcore/modules/auth/hooks/use-user-draft'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Popconfirm } from 'antd'
import { DropdownButton } from '@Pimcore/components/dropdown-button/dropdown-button'
import { Icon } from '@Pimcore/components/icon/icon'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { Flex } from '@Pimcore/components/flex/flex'
import { useUserHelper } from '@Pimcore/modules/auth/hooks/use-user-helper'
import { useHandleKeyBindings } from '@Pimcore/modules/app/hook/use-handle-keybindings'
import { useIsAcitveMainWidget } from '@Pimcore/modules/widget-manager/hooks/use-is-active-main-widget'

interface IToolbarProps {
  id: number
  onCloneUser?: () => void
  onRemoveUser?: () => void
}

export const Toolbar = ({ id, onCloneUser, onRemoveUser, ...props }: IToolbarProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { user, isLoading, removeTrackedChanges } = useUserDraft()
  const { updateUserProfile } = useUserHelper()
  const isWidgetActive = useIsAcitveMainWidget()

  const hasChanges = user?.modified === true

  const [popConfirmOpen, setPopConfirmOpen] = useState<boolean>(false)
  const onOpenChange = (newOpen: boolean): void => {
    if (!newOpen) {
      setPopConfirmOpen(false)
      return
    }

    if (hasChanges) {
      setPopConfirmOpen(true)
    } else {
      removeTrackedChanges()
      // reloadUser()
    }
  }

  const onCancel = (): void => {
    setPopConfirmOpen(false)
  }

  const onConfirm = (): void => {
    setPopConfirmOpen(false)
    removeTrackedChanges()
  }

  const items = [
    {
      key: '1',
      label: t('tree.actions.clone-user'),
      icon: <Icon value='copy-03'></Icon>,
      onClick: onCloneUser
    },
    {
      key: '2',
      label: t('tree.actions.remove-user'),
      icon: <Icon value='delete-outlined'></Icon>,
      onClick: onRemoveUser
    }
  ]

  useHandleKeyBindings(async () => { await updateUserProfile(user) }, 'save', isWidgetActive)

  return (
    <ToolbarView>
      <Flex>
        <Popconfirm
          onCancel={ onCancel }
          onConfirm={ onConfirm }
          onOpenChange={ onOpenChange }
          open={ popConfirmOpen }
          title={ t('toolbar.reload.confirmation') }
        >
          <IconButton
            icon={ { value: 'refresh' } }
          >
            {t('toolbar.reload')}
          </IconButton>
        </Popconfirm>

        {onCloneUser !== null || onRemoveUser !== null
          ? (
            <Dropdown
              menu={ { items } }
              trigger={ ['click'] }
            >
              <DropdownButton>
                {t('toolbar.more')}
              </DropdownButton>
            </Dropdown>
            )
          : null}
      </Flex>

      <Button
        disabled={ !hasChanges || isLoading }
        loading={ isLoading }
        onClick={ async () => await updateUserProfile(user) }
        type="primary"
      >
        {t('toolbar.save-and-publish')}
      </Button>
    </ToolbarView>
  )
}
