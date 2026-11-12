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
import { PageLayout } from '@Pimcore/components/page-layout/page-layout'
import { Content } from '@Pimcore/components/content/content'
import { Tabs } from '@Pimcore/components/tabs/tabs'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useAppDispatch } from '@Pimcore/app/store'
import { setServiceUsersDirty } from './dirty/service-users-dirty-slice'
import { useServiceUserGetCollectionQuery } from './service-users-api-slice-enhanced'
import { ServiceUserList } from './list/service-user-list'
import { ServiceUserDetail } from './detail/service-user-detail'
import { CreateServiceUserModal, type CreateServiceUserMode } from './create/create-service-user-modal'
import { type OneTimeCredential, OneTimeSecretModal } from './credentials/one-time-secret-modal'
import { nowInSeconds } from './utils/dormancy'

interface OpenTabs {
  openIds: number[]
  activeId: number | undefined
}

export const ServiceUsersContainer = (): React.JSX.Element => {
  const { data, isLoading, error, refetch } = useServiceUserGetCollectionQuery()
  const { t } = useTranslation()
  // One state for the open tabs and the active one: the tab context menu closes several tabs in one event, so
  // every close has to work from the latest state rather than from the ids captured at render time.
  const [tabs, setTabs] = useState<OpenTabs>({ openIds: [], activeId: undefined })
  const { openIds, activeId } = tabs
  const [dirtyIds, setDirtyIds] = useState<number[]>([])
  // Dirty tabs whose close still needs confirming, in the order the closes were requested. "Close all" and
  // "close others" request several in one event, so they queue and are confirmed one after another rather
  // than overwriting each other; the first of the queue is the one asking.
  const [pendingCloseIds, setPendingCloseIds] = useState<number[]>([])
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
    setTabs((current) => ({
      openIds: current.openIds.includes(id) ? current.openIds : [...current.openIds, id],
      activeId: id
    }))
  }

  const closeServiceUser = (id: number): void => {
    setTabs((current) => {
      const index = current.openIds.indexOf(id)
      const remaining = current.openIds.filter((openId) => openId !== id)

      return {
        openIds: remaining,
        activeId: current.activeId === id ? remaining[Math.min(index, remaining.length - 1)] : current.activeId
      }
    })
    setDirtyIds((current) => current.filter((dirtyId) => dirtyId !== id))
    setPendingCloseIds((current) => current.filter((pendingId) => pendingId !== id))
  }

  // A click inside a tab's close confirmation bubbles to the tab label and activates it, which for a tab that
  // was just closed would select nothing; only open tabs can be activated.
  const activateServiceUser = (id: number): void => {
    setTabs((current) => current.openIds.includes(id) ? { ...current, activeId: id } : current)
  }

  const keepOpen = (id: number): void => {
    setPendingCloseIds((current) => current.filter((pendingId) => pendingId !== id))
  }

  const requestClose = (key: string): void => {
    const id = Number(key)

    if (dirtyIds.includes(id)) {
      setPendingCloseIds((current) => current.includes(id) ? current : [...current, id])
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

  const dispatch = useAppDispatch()
  const anyDirty = dirtyIds.length > 0

  // The widget tab title and the widget manager's close checks read the aggregate from the store, so closing the
  // whole widget asks for confirmation while any opened service user has unsaved edits.
  useEffect(() => {
    dispatch(setServiceUsersDirty(anyDirty))
  }, [dispatch, anyDirty])

  useEffect(() => () => { dispatch(setServiceUsersDirty(false)) }, [dispatch])

  const nameOf = (id: number): string => data?.items.find((item) => item.id === id)?.name ?? String(id)

  const handleCreated = (serviceUserId: number, issued: OneTimeCredential[]): void => {
    setCreateMode(undefined)
    setCredentials(issued)
    openServiceUser(serviceUserId)
  }

  return (
    <>
      <PageLayout
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
        resizable
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
                        onCancel={ () => { keepOpen(id) } }
                        onConfirm={ () => { closeServiceUser(id) } }
                        open={ pendingCloseIds[0] === id }
                        title={ t('widget-manager.tab-title.close-confirmation') }
                      >
                        {nameOf(id)}{dirtyIds.includes(id) ? ' *' : ''}
                      </Popconfirm>
                    )
                  })) }
                  onChange={ (key: string) => { activateServiceUser(Number(key)) } }
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
        variant="config"
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
