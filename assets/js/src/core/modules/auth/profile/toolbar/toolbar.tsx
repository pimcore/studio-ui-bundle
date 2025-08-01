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
import { Flex } from '@Pimcore/components/flex/flex'
import { useUserHelper } from '@Pimcore/modules/auth/hooks/use-user-helper'

interface IToolbarProps {
  id: number
}

export const Toolbar = ({ id, onCloneUser, onRemoveUser, ...props }: IToolbarProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { user, isLoading, removeTrackedChanges } = useUserDraft()
  const { updateUserProfile } = useUserHelper()

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
    }
  }

  const onCancel = (): void => {
    setPopConfirmOpen(false)
  }

  const onConfirm = (): void => {
    setPopConfirmOpen(false)
    removeTrackedChanges()
  }

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
