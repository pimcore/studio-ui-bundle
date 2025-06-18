/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { Tabs, type ITabsProps } from '@Pimcore/components/tabs/tabs'
import { SettingsContainer } from '@Pimcore/modules/user/management/detail/tabs/settings/settings-container'
import { WorkspacesContainer } from '@Pimcore/modules/user/management/detail/tabs/workspaces/workspaces-container'
import { KeyBindingsContainer } from '@Pimcore/modules/user/management/detail/tabs/key-bindings/key-bindings-container'
import { ReferenceContainer } from '@Pimcore/modules/user/management/detail/tabs/references/references-container'
import { useTranslation } from 'react-i18next'
import { UserManagementProvider } from '@Pimcore/modules/user/user-management-provider'
import { useIsAcitveMainWidget } from '@Pimcore/modules/widget-manager/hooks/use-is-active-main-widget'
import { useGlobalUserContext } from '@Pimcore/modules/user/hooks/use-global-user-management-context'
import { useUserManagementDraft } from '@Pimcore/modules/user/hooks/use-user-management-draft'
import { Content } from '@Pimcore/components/content/content'

interface IUserDetailTabProps {
  id: number
}

const UserDetailTab = ({ id, ...props }: IUserDetailTabProps): React.JSX.Element => {
  const { t } = useTranslation()
  const isWidgetActive = useIsAcitveMainWidget()
  const { setContext, removeContext } = useGlobalUserContext()
  const { user, isLoading, isError, removeUserFromState } = useUserManagementDraft(id)

  useEffect(() => {
    return () => {
      removeContext()
      removeUserFromState()
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

  if (user === undefined) {
    return <></>
  }

  const items: ITabsProps['items'] = [
    {
      key: 'settings',
      label: t('user-management.settings.title'),
      children: <SettingsContainer />
    },
    {
      key: 'workspaces',
      label: t('user-management.workspaces.title'),
      children: <WorkspacesContainer />,
      disabled: user.admin
    },
    {
      key: 'key-bindings',
      label: t('user-management.key-bindings.title'),
      children: <KeyBindingsContainer />
    },
    {
      key: 'user-references',
      label: t('user-management.references.title'),
      children: <ReferenceContainer />
    }
  ]

  return (
    <UserManagementProvider id={ id }>
      <Tabs
        defaultActiveKey="1"
        destroyInactiveTabPane
        items={ items }
      >
      </Tabs>
    </UserManagementProvider>
  )
}

export { UserDetailTab }
