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
import { DetailTab } from '@Pimcore/modules/user/roles/detail/tabs/detail-tab'
import { useRoleHelper } from '@Pimcore/modules/user/roles/hooks/use-roles-helper'
import { Content } from '@Pimcore/components/content/content'
import { selectRoleById } from '@Pimcore/modules/user/roles/roles-slice'
import { store } from '@Pimcore/app/store'
import { Tabs } from '@Pimcore/components/tabs/tabs'
import {
  ContentLayout
} from '@Pimcore/components/content-layout/content-layout'
import { Toolbar } from '@Pimcore/modules/user/roles/toolbar/toolbar'
import { useStyle } from '@Pimcore/modules/user/roles/detail/detail.styles'
import { useTranslation } from 'react-i18next'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { Popconfirm } from 'antd'
import { useRoleDraft } from '@Pimcore/modules/user/roles/hooks/use-roles-draft'

interface IDetailProps {
  onRemoveRole: (id: any) => void
  onCloneRole: (data: any) => void
}

const Detail = ({ onCloneRole, onRemoveRole, ...props }: IDetailProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()
  const classNames = ['detail-tabs', styles.detailTabs]
  const modal = useFormModal()

  const { openRole, closeRole, removeRole, cloneRole, getAllIds, activeId } = useRoleHelper()
  const { role } = useRoleDraft(activeId)
  const [popConfirmOpen, setPopConfirmOpen] = useState<number | null>(null)

  const triggerConfirm = (): void => {
    closeRole(activeId)
    openRole(getAllIds[getAllIds.length - 2])
  }

  const onHandleClose = (key: string): void => {
    const role = selectRoleById(store.getState(), parseInt(key))
    if (role?.modified && popConfirmOpen === null) {
      setPopConfirmOpen(parseInt(key))
      return
    }

    if (!role?.modified) {
      triggerConfirm()
      return
    }

    if (popConfirmOpen !== null) {
      setPopConfirmOpen(null)
    }
  }

  const handleCloneRole = (): void => {
    modal.input({
      title: t('roles.clone-item'),
      label: t('roles.clone-item.label'),
      onOk: async (value: string) => {
        const data = await cloneRole({ id: activeId, name: value })
        onCloneRole(data)
      }
    })
  }

  const handleRemoveRole = (): void => {
    modal.confirm({
      title: t('roles.remove-item'),
      content: t('roles.remove-item.text'),
      onOk: async () => {
        closeRole(activeId)
        await removeRole({ id: activeId })

        onRemoveRole(activeId)
      }
    })
  }

  useEffect(() => {
    setPopConfirmOpen(null)
  }, [role])

  if (activeId === undefined) {
    return <Content none></Content>
  }

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar
          id={ activeId }
          onCloneRole={ handleCloneRole }
          onRemoveRole={ handleRemoveRole }
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
              {selectRoleById(store.getState(), id)?.name} {selectRoleById(store.getState(), id)?.modified ? '*' : ''}
            </Popconfirm>
          }))
          }
          onChange={ (id: string) => { openRole(Number(id)) } }
          onClose={ onHandleClose }
        />
        <Content className={ 'detail-tabs__content' }>
          <DetailTab id={ activeId } />
        </Content>
      </div>
    </ContentLayout>
  )
}

export { Detail }
