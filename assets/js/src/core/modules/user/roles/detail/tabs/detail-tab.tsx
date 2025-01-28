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

import React, { useEffect } from 'react'
import { Tabs, type ITabsProps } from '@Pimcore/components/tabs/tabs'
import { SettingsContainer } from '@Pimcore/modules/user/roles/detail/tabs/settings/settings-container'
import { WorkspacesContainer } from '@Pimcore/modules/user/roles/detail/tabs/workspaces/workspaces-container'
import { useTranslation } from 'react-i18next'
import { RoleProvider } from '@Pimcore/modules/user/roles/role-provider'
import { useIsAcitveMainWidget } from '@Pimcore/modules/widget-manager/hooks/use-is-active-main-widget'
import { useGlobalUserContext } from '@Pimcore/modules/user/hooks/use-global-user-context'
import { useRoleDraft } from '@Pimcore/modules/user/roles/hooks/use-roles-draft'
import { Content } from '@Pimcore/components/content/content'

interface IDetailTabProps {
  id: number
}

const DetailTab = ({ id }: IDetailTabProps): React.JSX.Element => {
  const { t } = useTranslation()
  const isWidgetActive = useIsAcitveMainWidget()
  const { setContext, removeContext } = useGlobalUserContext()
  const { role, isLoading, isError, removeRoleFromState } = useRoleDraft(id)

  useEffect(() => {
    return () => {
      removeContext()
      removeRoleFromState()
    }
  }, [])

  useEffect(() => {
    if (isWidgetActive) {
      setContext({ id })
    }

    return () => {
      if (!isWidgetActive) {
        removeContext()
      }
    }
  }, [isWidgetActive])

  if (isError) {
    return <div>Error</div>
  }

  if (isLoading) {
    return <Content loading />
  }

  if (role === undefined) {
    return <></>
  }

  const items: ITabsProps['items'] = [
    {
      key: 'settings',
      label: t('roles.settings.title'),
      children: <SettingsContainer />
    },
    {
      key: 'workspaces',
      label: t('roles.workspaces.title'),
      children: <WorkspacesContainer />
    }
  ]

  return (
    <RoleProvider id={ id }>
      <Tabs
        defaultActiveKey="1"
        destroyInactiveTabPane
        items={ items }
      >
      </Tabs>
    </RoleProvider>
  )
}

export { DetailTab }
