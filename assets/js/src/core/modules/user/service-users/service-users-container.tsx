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
import { isUndefined } from 'lodash'
import { ConfigLayout } from '@Pimcore/components/predefined-layouts/config/config-layout'
import { Content } from '@Pimcore/components/content/content'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { type ServiceUserCredentials, useServiceUserGetCollectionQuery } from './service-users-api-slice-enhanced'
import { ServiceUserList } from './list/service-user-list'
import { ServiceUserDetail } from './detail/service-user-detail'
import { CreateServiceUserModal, type CreateServiceUserMode } from './create/create-service-user-modal'
import { OneTimeSecretModal } from './credentials/one-time-secret-modal'
import { nowInSeconds } from './utils/dormancy'

export const ServiceUsersContainer = (): React.JSX.Element => {
  const { data, isLoading, error, refetch } = useServiceUserGetCollectionQuery()
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined)
  const [createMode, setCreateMode] = useState<CreateServiceUserMode | undefined>(undefined)
  const [credentials, setCredentials] = useState<ServiceUserCredentials | undefined>(undefined)
  // Recomputed on every list load, so the dormancy filter compares against a fresh "now".
  const now = useMemo(() => nowInSeconds(), [data])

  useEffect(() => {
    if (!isUndefined(error)) {
      trackError(new ApiError(error as ConstructorParameters<typeof ApiError>[0]))
    }
  }, [error])

  const handleCreated = (created: ServiceUserCredentials): void => {
    setCreateMode(undefined)
    setCredentials(created)
    setSelectedId(created.serviceUserId)
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
              onSelect={ setSelectedId }
              selectedId={ selectedId }
              serviceUsers={ data?.items ?? [] }
            />
          )
        } }
        resizeAble
        rightItem={ {
          size: 75,
          minSize: 600,
          children: isUndefined(selectedId)
            ? <Content none />
            : (
              <ServiceUserDetail
                id={ selectedId }
                key={ selectedId }
                onDeleted={ () => { setSelectedId(undefined) } }
              />
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
