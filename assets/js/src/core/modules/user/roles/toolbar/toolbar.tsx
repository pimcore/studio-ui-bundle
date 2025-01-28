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

import React, { useState } from 'react'
import { Toolbar as ToolbarView } from '@Pimcore/components/toolbar/toolbar'
import { useTranslation } from 'react-i18next'
import { Button } from '@Pimcore/components/button/button'
import { useRoleDraft } from '@Pimcore/modules/user/roles/hooks/use-roles-draft'
import { useRoleHelper } from '@Pimcore/modules/user/roles/hooks/use-roles-helper'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Popconfirm } from 'antd'
import { DropdownButton } from '@Pimcore/components/dropdown-button/dropdown-button'
import { Icon } from '@Pimcore/components/icon/icon'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { Flex } from '@Pimcore/components/flex/flex'
import { type IRole } from '@Pimcore/modules/user/roles/roles-slice'

interface IToolbar {
  id: number
  onCloneRole: () => void
  onRemoveRole: () => void
}

export const Toolbar = ({ id, onCloneRole, onRemoveRole }: IToolbar): React.JSX.Element => {
  const { t } = useTranslation()
  const { role, isLoading, reloadRole } = useRoleDraft(id)
  const { updateRoleById } = useRoleHelper()

  const hasChanges = role?.modified === true

  const [popConfirmOpen, setPopConfirmOpen] = useState<boolean>(false)
  const onOpenChange = (newOpen: boolean): void => {
    if (!newOpen) {
      setPopConfirmOpen(false)
      return
    }

    if (hasChanges) {
      setPopConfirmOpen(true)
    } else {
      reloadRole()
    }
  }

  const onCancel = (): void => {
    setPopConfirmOpen(false)
  }

  const onConfirm = (): void => {
    setPopConfirmOpen(false)
    reloadRole()
  }

  const onSaveClick = (): void => {
    updateRoleById({ id, item: role as IRole }).catch((error) => {
      console.log(error)
    })
  }

  const items = [
    {
      key: '1',
      label: t('tree.actions.clone-item'),
      icon: <Icon value='copy-03'></Icon>,
      onClick: onCloneRole
    },
    {
      key: '2',
      label: t('tree.actions.remove-item'),
      icon: <Icon value='delete-outlined'></Icon>,
      onClick: onRemoveRole
    }
  ]

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

        <Dropdown
          menu={ { items } }
          trigger={ ['click'] }
        >
          <DropdownButton>
            {t('toolbar.more')}
          </DropdownButton>
        </Dropdown>
      </Flex>

      <Button
        disabled={ !hasChanges || isLoading }
        loading={ isLoading }
        onClick={ onSaveClick }
        type="primary"
      >
        {t('toolbar.save-and-publish')}
      </Button>
    </ToolbarView>
  )
}
