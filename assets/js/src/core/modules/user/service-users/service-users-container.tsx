/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Popconfirm } from 'antd'
import { isUndefined } from 'lodash'
import { ConfigLayout } from '@Pimcore/components/predefined-layouts/config/config-layout'
import { Content } from '@Pimcore/components/content/content'
import { Tabs } from '@Pimcore/components/tabs/tabs'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useServiceUserGetCollectionQuery } from './service-users-api-slice-enhanced'
import { ServiceUserList } from './list/service-user-list'
import { ServiceUserDetail } from './detail/service-user-detail'
import { CreateServiceUserModal, type CreateServiceUserMode } from './create/create-service-user-modal'
import { type OneTimeCredential, OneTimeSecretModal } from './credentials/one-time-secret-modal'
import { nowInSeconds } from './utils/dormancy'

export const ServiceUsersContainer = (): React.JSX.Element => {
  const { data, isLoading, error, refetch } = useServiceUserGetCollectionQuery()
  const { t } = useTranslation()
  const [openIds, setOpenIds] = useState<number[]>([])
  const [activeId, setActiveId] = useState<number | undefined>(undefined)
  const [dirtyIds, setDirtyIds] = useState<number[]>([])
  const [confirmCloseId, setConfirmCloseId] = useState<number | undefined>(undefined)
  const [createMode, setCreateMode] = useState<CreateServiceUserMode | undefined>(undefined)
  const [credentials, setCredentials] = useState<OneTimeCredential[] | undefined>(undefined)
  // Recomputed on every list load, so the dormancy filter compares against a fresh "now".
  const now = useMemo(() => nowInSeconds(), [data])

  useEffect(() => {
    if (!isUndefined(error)) {
      trackError(new ApiError(error as ConstructorParameters<typeof ApiError>[0]))
    }
  }, [error])

  const openServiceUser = (id: number): void => {
    setOpenIds((current) => current.includes(id) ? current : [...current, id])
    setActiveId(id)
  }

  const closeServiceUser = (id: number): void => {
    const index = openIds.indexOf(id)
    const remaining = openIds.filter((openId) => openId !== id)

    setOpenIds(remaining)
    setDirtyIds((current) => current.filter((dirtyId) => dirtyId !== id))
    setConfirmCloseId(undefined)

    if (activeId === id) {
      setActiveId(remaining[Math.min(index, remaining.length - 1)])
    }
  }

  const requestClose = (key: string): void => {
    const id = Number(key)

    if (dirtyIds.includes(id)) {
      setConfirmCloseId(id)
      return
    }

    closeServiceUser(id)
  }

  const handleDirtyChange = (id: number, isDirty: boolean): void => {
    setDirtyIds((current) => {
      if (current.includes(id) === isDirty) {
        return current
      }

      return isDirty ? [...current, id] : current.filter((dirtyId) => dirtyId !== id)
    })
  }

  const nameOf = (id: number): string => data?.items.find((item) => item.id === id)?.name ?? String(id)

  const handleCreated = (serviceUserId: number, issued: OneTimeCredential[]): void => {
    setCreateMode(undefined)
    setCredentials(issued)
    openServiceUser(serviceUserId)
  }

  return (
    <>
      <ConfigLayout
        leftItem={ {
          size: 25,
          minSize: 220,
          children: (
            <ServiceUserList
              isLoading={ isLoading }
              now={ now }
              onCreate={ () => { setCreateMode('create') } }
              onCreateFromUser={ () => { setCreateMode('from-user') } }
              onRefresh={ () => { void refetch() } }
              onSelect={ openServiceUser }
              selectedId={ activeId }
              serviceUsers={ data?.items ?? [] }
            />
          )
        } }
        resizeAble
        rightItem={ {
          size: 75,
          minSize: 600,
          children: isUndefined(activeId)
            ? <Content none />
            : (
              <div style={ { display: 'flex', flexDirection: 'column', height: '100%' } }>
                <Tabs
                  activeKey={ activeId.toString() }
                  items={ openIds.map((id) => ({
                    key: id.toString(),
                    label: (
                      <Popconfirm
                        onCancel={ () => { setConfirmCloseId(undefined) } }
                        onConfirm={ () => { closeServiceUser(id) } }
                        open={ confirmCloseId === id }
                        title={ t('widget-manager.tab-title.close-confirmation') }
                      >
                        {nameOf(id)}{dirtyIds.includes(id) ? ' *' : ''}
                      </Popconfirm>
                    )
                  })) }
                  onChange={ (key: string) => { setActiveId(Number(key)) } }
                  onClose={ requestClose }
                />
                {openIds.map((id) => (
                  <div
                    key={ id }
                    style={ { display: id === activeId ? 'block' : 'none', flex: 1, minHeight: 0 } }
                  >
                    <ServiceUserDetail
                      id={ id }
                      onDeleted={ closeServiceUser }
                      onDirtyChange={ handleDirtyChange }
                    />
                  </div>
                ))}
              </div>
              )
        } }
        withDivider
      />

      <CreateServiceUserModal
        mode={ createMode ?? 'create' }
        onCancel={ () => { setCreateMode(undefined) } }
        onCreated={ handleCreated }
        open={ !isUndefined(createMode) }
      />

      <OneTimeSecretModal
        credentials={ credentials }
        onClose={ () => { setCredentials(undefined) } }
      />
    </>
  )
}
