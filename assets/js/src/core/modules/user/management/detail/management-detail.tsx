/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState, useEffect } from 'react'
import { UserDetailTab } from '@Pimcore/modules/user/management/detail/tabs/user-detail-tab'
import { useUserManagementHelper } from '@Pimcore/modules/user/hooks/use-user-management-helper'
import { Content } from '@Pimcore/components/content/content'
import { selectUserById } from '@Pimcore/modules/user/user-management-slice'
import { store } from '@Pimcore/app/store'
import { Tabs } from '@Pimcore/components/tabs/tabs'
import {
  ContentLayout
} from '@Pimcore/components/content-layout/content-layout'
import { Toolbar } from '@Pimcore/modules/user/management/toolbar/toolbar'
import { useStyle } from '@Pimcore/modules/user/management/detail/management-detail.styles'
import { useTranslation } from 'react-i18next'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { useUserManagementDraft } from '@Pimcore/modules/user/hooks/use-user-management-draft'
import { Popconfirm } from 'antd'
import { createTabContentTestId } from '@Pimcore/utils/test-id-generator'

interface IManagementDetailProps {
  onRemoveItem: (id: any, parentId: any) => void
  onCloneUser: (data: any, parentId: any) => void
}

const ManagementDetail = ({ onCloneUser, onRemoveItem, ...props }: IManagementDetailProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()
  const classNames = ['detail-tabs', styles.detailTabs]
  const modal = useFormModal()

  const { openUser, closeUser, removeUser, cloneUser, getAllIds, activeId } = useUserManagementHelper()
  const { user } = useUserManagementDraft(activeId)
  const [popConfirmOpen, setPopConfirmOpen] = useState<number | null>(null)

  const triggerConfirm = (): void => {
    closeUser(activeId)
    openUser(getAllIds[getAllIds.length - 2])
  }

  const onHandleClose = (key: string): void => {
    if (selectUserById(store.getState(), parseInt(key))?.modified && popConfirmOpen === null) {
      setPopConfirmOpen(parseInt(key))

      return
    }

    if (!selectUserById(store.getState(), parseInt(key))?.modified) {
      triggerConfirm()

      return
    }

    if (popConfirmOpen !== null) {
      setPopConfirmOpen(null)
    }
  }

  const handleCloneUser = (): void => {
    modal.input({
      title: t('user-management.clone-user'),
      label: t('user-management.clone-user.label'),
      onOk: async (value: string) => {
        const data = await cloneUser({ id: activeId, name: value })
        onCloneUser(data, user?.parentId)
      }
    })
  }

  const handleRemoveUser = (): void => {
    modal.confirm({
      title: t('user-management.remove-user'),
      content: t('user-management.remove-user.text'),
      onOk: async () => {
        triggerConfirm()
        await removeUser({ id: activeId })

        onRemoveItem(activeId, user?.parentId)
      }
    })
  }

  useEffect(() => {
    setPopConfirmOpen(null)
  }, [user])

  if (activeId === undefined) {
    return <Content none></Content>
  }

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar
          id={ activeId }
          onCloneUser={ handleCloneUser }
          onRemoveUser={ handleRemoveUser }
        />
      }
    >
      <div className={ classNames.join(' ') }>
        <Tabs
          activeKey={ activeId.toString() }
          items={ getAllIds.map((id) => ({
            key: id.toString(),
            label: <Popconfirm
              onCancel={ () => { setPopConfirmOpen(null) } }
              onConfirm={ triggerConfirm }
              open={ popConfirmOpen === id }
              title={ t('widget-manager.tab-title.close-confirmation') }
                   >
              {selectUserById(store.getState(), id)?.name} {selectUserById(store.getState(), id)?.modified ? '*' : ''}
            </Popconfirm>
          }))
          }
          onChange={ (id: string) => { openUser(Number(id)) } }
          onClose={ onHandleClose }
        />
        <Content
          className={ 'detail-tabs__content' }
          data-testid={ createTabContentTestId(activeId, { prefix: 'user-tab' }) }
        >
          <UserDetailTab id={ activeId } />
        </Content>
      </div>
    </ContentLayout>
  )
}

export { ManagementDetail }
