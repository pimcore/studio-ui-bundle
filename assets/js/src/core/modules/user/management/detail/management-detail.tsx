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

import React, { useEffect, useState } from 'react'
import { UserDetailTab } from '@Pimcore/modules/user/management/detail/tabs/user-detail-tab'
import { useUserHelper } from '@Pimcore/modules/user/hooks/use-user-helper'
import { Content } from '@Pimcore/components/content/content'
import { selectUserById } from '@Pimcore/modules/user/user-slice'
import { store } from '@Pimcore/app/store'
import { Tabs } from '@Pimcore/components/tabs/tabs'
import {
  ContentToolbarSidebarLayout
} from '@Pimcore/components/content-toolbar-sidebar-layout/content-toolbar-sidebar-layout'
import { Toolbar } from '@Pimcore/modules/user/management/toolbar/toolbar'
import { useStyle } from '@Pimcore/modules/user/management/detail/management-detail.styles'
import { useTranslation } from 'react-i18next'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { useUserDraft } from '@Pimcore/modules/user/hooks/use-user-draft'

interface IManagementDetailProps {
  onUpdate: (loading: boolean) => void
}

const ManagementDetail = ({ onUpdate, ...props }: IManagementDetailProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()
  const classNames = ['detail-tabs', styles.detailTabs]
  const modal = useFormModal()

  const { openUser, closeUser, removeUser, cloneUser, getAllIds, activeId } = useUserHelper()
  const { user } = useUserDraft(activeId)
  const [tabs, setTabs] = useState(getAllIds.map((id) => ({
    key: id.toString(),
    label: `${selectUserById(store.getState(), id)?.name} ${selectUserById(store.getState(), id)?.modified ? '*' : ''}`
  })))

  const onClose = (key: string): void => {
    closeUser(key)
    openUser(getAllIds[getAllIds.length - 2])
  }

  const handleCloneUser = (): void => {
    onUpdate(true)

    modal.input({
      title: t('user-management.clone-user'),
      label: t('user-management.clone-user.label'),
      onOk: async (value: string) => {
        // const parentId = (findParentByKey(treeData, key)?.key)?.toString()
        await cloneUser({ id: 0, name: value })

        onUpdate(false)
      }
    })
  }

  const handleRemoveUser = (): void => {
    onUpdate(true)

    modal.confirm({
      title: t('user-management.remove-user'),
      content: t('user-management.remove-user.text'),
      onOk: async () => {
        closeUser(activeId)
        removeUser({ id: activeId }).then(() => {
          onUpdate(false)
        }).catch(() => {
          console.log('error')
        })
      }
    })
  }

  useEffect(() => {
    console.log('use effect')
    setTabs(getAllIds.map((id) => ({
      key: id.toString(),
      label: `${selectUserById(store.getState(), id)?.name} ${selectUserById(store.getState(), id)?.modified ? '*' : ''}`
    })))
  }, [user])

  if (activeId === undefined) {
    return <Content none></Content>
  }

  return (
    <ContentToolbarSidebarLayout
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
          items={ tabs }
          onChange={ openUser }
          onClose={ onClose }
        />
        <Content className={ 'detail-tabs__content' }>
          <UserDetailTab id={ activeId } />
        </Content>
      </div>
    </ContentToolbarSidebarLayout>
  )
}

export { ManagementDetail }
