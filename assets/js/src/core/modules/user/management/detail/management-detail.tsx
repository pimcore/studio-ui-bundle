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

import React, { useState, useEffect } from 'react'
import { UserDetailTab } from '@Pimcore/modules/user/management/detail/tabs/user-detail-tab'
import { useUserHelper } from '@Pimcore/modules/user/hooks/use-user-helper'
import { Content } from '@Pimcore/components/content/content'
import { selectUserById } from '@Pimcore/modules/user/user-slice'
import { store } from '@Pimcore/app/store'
import { Tabs } from '@Pimcore/components/tabs/tabs'
import {
  ContentLayout
} from '@Pimcore/components/content-layout/content-layout'
import { Toolbar } from '@Pimcore/modules/user/management/toolbar/toolbar'
import { useStyle } from '@Pimcore/modules/user/management/detail/management-detail.styles'
import { useTranslation } from 'react-i18next'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { useUserDraft } from '@Pimcore/modules/user/hooks/use-user-draft'
import { Popconfirm } from 'antd'

interface IManagementDetailProps {
  onRemoveItem: (id: any) => void
  onCloneUser: (data: any) => void
}

const ManagementDetail = ({ onCloneUser, onRemoveItem, ...props }: IManagementDetailProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()
  const classNames = ['detail-tabs', styles.detailTabs]
  const modal = useFormModal()

  const { openUser, closeUser, removeUser, cloneUser, getAllIds, activeId } = useUserHelper()
  const { user } = useUserDraft(activeId)
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
        onCloneUser(data)
      }
    })
  }

  const handleRemoveUser = (): void => {
    modal.confirm({
      title: t('user-management.remove-user'),
      content: t('user-management.remove-user.text'),
      onOk: async () => {
        closeUser(activeId)
        await removeUser({ id: activeId })

        onRemoveItem(activeId)
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
        <Content className={ 'detail-tabs__content' }>
          <UserDetailTab id={ activeId } />
        </Content>
      </div>
    </ContentLayout>
  )
}

export { ManagementDetail }
