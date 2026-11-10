/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { isEqual, isUndefined } from 'lodash'
import { Content } from '@Pimcore/components/content/content'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Tabs } from '@Pimcore/components/tabs/tabs'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Button } from '@Pimcore/components/button/button'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { useStudioModal } from '@Pimcore/components/modal/hooks/use-studio-modal'
import { useMessage } from '@Pimcore/components/message/useMessage'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import {
  useServiceUserDeactivateByIdMutation,
  useServiceUserDeleteByIdMutation,
  useServiceUserGetByIdQuery,
  useServiceUserUpdateByIdMutation
} from '../service-users-api-slice-enhanced'
import { ServiceUserStatusTags } from '../components/service-user-status-tags'
import { nowInSeconds } from '../utils/dormancy'
import { type ServiceUserDraft, toDraft } from './service-user-draft'
import { SettingsTab } from './tabs/settings-tab'
import { PermissionsTab } from './tabs/permissions-tab'
import { RolesTab } from './tabs/roles-tab'
import { WorkspacesTab } from './tabs/workspaces-tab'

interface ServiceUserDetailProps {
  id: number
  onDeleted: (id: number) => void
  onDirtyChange?: (id: number, isDirty: boolean) => void
}

const reportError = (error: unknown): void => {
  trackError(new ApiError(error as ConstructorParameters<typeof ApiError>[0]))
}

export const ServiceUserDetail = ({ id, onDeleted, onDirtyChange }: ServiceUserDetailProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { modal } = useStudioModal()
  const { success } = useMessage()
  const { data: serviceUser, isLoading, error } = useServiceUserGetByIdQuery({ id })
  const [update, { isLoading: saving }] = useServiceUserUpdateByIdMutation()
  const [deactivate, { isLoading: deactivating }] = useServiceUserDeactivateByIdMutation()
  const [remove] = useServiceUserDeleteByIdMutation()
  const [draft, setDraft] = useState<ServiceUserDraft | undefined>(undefined)
  // The editable part of the last loaded service user. A refetch that changes only other fields (the MCP token
  // summary after issuing or revoking a token) must not throw away unsaved edits.
  const loadedDraft = useRef<ServiceUserDraft | undefined>(undefined)

  useEffect(() => {
    const next = isUndefined(serviceUser) ? undefined : toDraft(serviceUser)

    if (!isUndefined(next) && !isUndefined(loadedDraft.current) && isEqual(next, loadedDraft.current)) {
      return
    }

    loadedDraft.current = next
    setDraft(next)
  }, [serviceUser])

  useEffect(() => {
    if (!isUndefined(error)) {
      reportError(error)
    }
  }, [error])

  const isModified = !isUndefined(serviceUser) && !isUndefined(draft) && !isEqual(draft, toDraft(serviceUser))

  useEffect(() => {
    onDirtyChange?.(id, isModified)
  }, [id, isModified])

  if (isLoading || isUndefined(serviceUser) || isUndefined(draft)) {
    return <Content loading={ isLoading } />
  }

  const change = (patch: Partial<ServiceUserDraft>): void => {
    setDraft((current) => isUndefined(current) ? current : { ...current, ...patch })
  }

  const handleSave = async (): Promise<void> => {
    const result = await update({ id, serviceUserUpdate: draft })

    if ('error' in result) {
      reportError(result.error)
      return
    }

    void success(t('service-users.save.success'))
  }

  const handleDeactivate = (): void => {
    modal.confirm({
      title: t('service-users.deactivate'),
      content: t('service-users.deactivate.confirm', { name: serviceUser.name }),
      okText: t('service-users.deactivate'),
      cancelText: t('button.cancel'),
      onOk: async () => {
        const result = await deactivate({ id })

        if ('error' in result) {
          reportError(result.error)
        }
      }
    })
  }

  const handleDelete = (): void => {
    modal.confirm({
      title: t('service-users.delete'),
      content: t('service-users.delete.confirm', { name: serviceUser.name }),
      okText: t('element.delete.confirmation.ok'),
      cancelText: t('button.cancel'),
      onOk: async () => {
        const result = await remove({ id })

        if ('error' in result) {
          reportError(result.error)
          return
        }

        onDeleted(id)
      }
    })
  }

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar justify="space-between">
          <Flex gap="small">
            <IconTextButton
              disabled={ !serviceUser.active || deactivating }
              icon={ { value: 'lock' } }
              onClick={ handleDeactivate }
            >
              {t('service-users.deactivate')}
            </IconTextButton>
            <IconTextButton
              icon={ { value: 'trash' } }
              onClick={ handleDelete }
            >
              {t('service-users.delete')}
            </IconTextButton>
          </Flex>
          <Button
            disabled={ !isModified || saving }
            loading={ saving }
            onClick={ () => { void handleSave() } }
            type="primary"
          >
            {t('save')}
          </Button>
        </Toolbar>
      }
    >
      <Content padded>
        <Flex
          align="center"
          gap="small"
        >
          <Text strong>{serviceUser.name}</Text>
          <ServiceUserStatusTags
            active={ serviceUser.active }
            lastLogin={ serviceUser.lastLogin }
            now={ nowInSeconds() }
          />
        </Flex>
        <Tabs
          destroyInactiveTabPane
          items={ [
            {
              key: 'settings',
              label: t('service-users.tab.settings'),
              children: (
                <SettingsTab
                  draft={ draft }
                  onChange={ change }
                  serviceUser={ serviceUser }
                />
              )
            },
            {
              key: 'permissions',
              label: t('service-users.tab.permissions'),
              children: (
                <PermissionsTab
                  draft={ draft }
                  key={ id }
                  onChange={ change }
                />
              )
            },
            {
              key: 'roles',
              label: t('service-users.tab.roles'),
              children: (
                <RolesTab
                  onChange={ (roles) => { change({ roles }) } }
                  roles={ draft.roles }
                />
              )
            },
            {
              key: 'workspaces',
              label: t('service-users.tab.workspaces'),
              children: (
                <WorkspacesTab
                  draft={ draft }
                  onChange={ change }
                />
              )
            }
          ] }
        />
      </Content>
    </ContentLayout>
  )
}
