/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { isUndefined } from 'lodash'
import { Modal } from '@Pimcore/components/modal/modal'
import { Input } from '@Pimcore/components/input/input'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { UserSelect } from '@Pimcore/modules/user/components/user-select/user-select'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import {
  type ServiceUserCredentials,
  useServiceUserCreateFromUserMutation,
  useServiceUserCreateMutation,
  useServiceUserGetByIdQuery,
  useServiceUserMcpTokenIssueMutation
} from '../service-users-api-slice-enhanced'
import { type AccessTokenCredential, type OneTimeCredential } from '../credentials/one-time-secret-modal'
import {
  isValidTokenLifetime,
  TOKEN_LIFETIME_DEFAULT_DAYS,
  TokenLifetimeField
} from '../credentials/token-lifetime-field'

export type CreateServiceUserMode = 'create' | 'from-user'

interface CreateServiceUserModalProps {
  mode: CreateServiceUserMode
  open: boolean
  onCancel: () => void
  /** Called when the dialog is done, with every one-time credential of the creation (empty when nothing was issued). */
  onCreated: (serviceUserId: number, credentials: OneTimeCredential[]) => void
}

const NAME_MAX_LENGTH = 64
// Same rule as the service user API, so a name is refused before the request.
const NAME_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]*$/

export const isValidServiceUserName = (name: string): boolean =>
  name.length <= NAME_MAX_LENGTH && NAME_PATTERN.test(name)

const reportError = (error: unknown): void => {
  trackError(new ApiError(error as ConstructorParameters<typeof ApiError>[0]))
}

export const CreateServiceUserModal = ({ mode, open, onCancel, onCreated }: CreateServiceUserModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [sourceUserId, setSourceUserId] = useState<number | undefined>(undefined)
  // Set once the service user exists; the dialog then shows the credentials step.
  const [created, setCreated] = useState<ServiceUserCredentials | undefined>(undefined)
  const [ttlDays, setTtlDays] = useState<number | null>(TOKEN_LIFETIME_DEFAULT_DAYS)
  const [create, { isLoading: creating }] = useServiceUserCreateMutation()
  const [createFromUser, { isLoading: creatingFromUser }] = useServiceUserCreateFromUserMutation()
  const [issue, { isLoading: issuing }] = useServiceUserMcpTokenIssueMutation()
  // The created service user tells whether the OAuth client secret authenticates anything on this instance.
  const { data: serviceUser, isFetching: loadingServiceUser, error: serviceUserError } = useServiceUserGetByIdQuery(
    { id: created?.serviceUserId ?? 0 },
    { skip: isUndefined(created) }
  )

  useEffect(() => {
    if (!isUndefined(serviceUserError)) {
      reportError(serviceUserError)
    }
  }, [serviceUserError])

  const isFromUser = mode === 'from-user'
  // While a request is pending the dialog cannot be dismissed: a late success would otherwise reset a dialog
  // that was reopened meanwhile, or hand over credentials a second time.
  const creatingAny = creating || creatingFromUser
  const nameIsInvalid = name !== '' && !isValidServiceUserName(name)
  const canSubmit = isValidServiceUserName(name) && (!isFromUser || !isUndefined(sourceUserId))
  // Without the service user loaded the secret stays hidden; it can be rotated later when the grant is on.
  const clientCredentialsEnabled = serviceUser?.clientCredentialsEnabled === true

  const reset = (): void => {
    setName('')
    setEmail('')
    setSourceUserId(undefined)
    setCreated(undefined)
    setTtlDays(TOKEN_LIFETIME_DEFAULT_DAYS)
  }

  const finish = (serviceUserId: number, token?: AccessTokenCredential): void => {
    // The API sends no client secret while the grant is off, so the create response alone decides.
    const credentials: OneTimeCredential[] = []
    if (!isUndefined(created) && created.clientSecret !== null) {
      credentials.push({ clientId: created.clientId, clientSecret: created.clientSecret })
    }
    if (!isUndefined(token)) {
      credentials.push(token)
    }

    reset()
    onCreated(serviceUserId, credentials)
  }

  const handleCreate = async (): Promise<void> => {
    if (!canSubmit) {
      return
    }

    const payload = { name, email: email.trim() === '' ? null : email.trim() }
    const result = isFromUser && !isUndefined(sourceUserId)
      ? await createFromUser({ id: sourceUserId, serviceUserCreateFromUser: payload })
      : await create({ serviceUserCreate: payload })

    if ('error' in result) {
      reportError(result.error)
      return
    }

    setCreated(result.data)
  }

  const handleIssue = async (serviceUserId: number): Promise<void> => {
    if (!isValidTokenLifetime(ttlDays)) {
      return
    }

    const result = await issue({ id: serviceUserId, serviceUserMcpTokenRequest: { ttlDays } })

    if ('error' in result) {
      reportError(result.error)
      return
    }

    finish(serviceUserId, result.data)
  }

  if (!isUndefined(created)) {
    const serviceUserId = created.serviceUserId

    return (
      <Modal
        cancelButtonProps={ { disabled: issuing } }
        cancelText={ t('service-users.create.credentials.skip') }
        closable={ !issuing }
        // The step can show the client secret; a closed antd modal would keep it in the DOM.
        destroyOnClose
        keyboard={ !issuing }
        maskClosable={ false }
        okButtonProps={ { disabled: loadingServiceUser || !isValidTokenLifetime(ttlDays), loading: issuing } }
        okText={ t('service-users.credentials.issue') }
        onCancel={ () => {
          if (!issuing) {
            finish(serviceUserId)
          }
        } }
        onOk={ () => { void handleIssue(serviceUserId) } }
        open={ open }
        title={ t('service-users.create.credentials.title') }
      >
        <Flex
          gap="small"
          vertical
        >
          <Text>
            {t(clientCredentialsEnabled
              ? 'service-users.create.credentials.which'
              : 'service-users.create.credentials.token-description')}
          </Text>
          <Text strong>{t('service-users.credentials.issue.title')}</Text>
          <TokenLifetimeField
            onChange={ setTtlDays }
            value={ ttlDays }
          />
        </Flex>
      </Modal>
    )
  }

  return (
    <Modal
      cancelButtonProps={ { disabled: creatingAny } }
      cancelText={ t('button.cancel') }
      closable={ !creatingAny }
      destroyOnClose
      keyboard={ !creatingAny }
      maskClosable={ false }
      okButtonProps={ { disabled: !canSubmit, loading: creatingAny } }
      okText={ t('service-users.create.ok') }
      onCancel={ () => {
        if (creatingAny) {
          return
        }

        reset()
        onCancel()
      } }
      onOk={ () => { void handleCreate() } }
      open={ open }
      title={ t(isFromUser ? 'service-users.create-from-user.title' : 'service-users.create.title') }
    >
      <Flex
        gap="small"
        vertical
      >
        {isFromUser && (
          <>
            <Text>{t('service-users.create-from-user.description')}</Text>
            <UserSelect
              onChange={ (value) => { setSourceUserId(typeof value === 'number' ? value : undefined) } }
              placeholder={ t('service-users.field.source-user') }
              showSearch
              value={ sourceUserId }
            />
          </>
        )}
        <Input
          maxLength={ NAME_MAX_LENGTH }
          onChange={ (event) => { setName(event.target.value) } }
          placeholder={ t('service-users.field.name') }
          status={ nameIsInvalid ? 'error' : undefined }
          value={ name }
        />
        {nameIsInvalid && <Text type="danger">{t('service-users.field.name.invalid')}</Text>}
        <Input
          onChange={ (event) => { setEmail(event.target.value) } }
          placeholder={ t('service-users.field.email') }
          type="email"
          value={ email }
        />
      </Flex>
    </Modal>
  )
}
