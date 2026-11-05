/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
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
  useServiceUserCreateMutation
} from '../service-users-api-slice-enhanced'

export type CreateServiceUserMode = 'create' | 'from-user'

interface CreateServiceUserModalProps {
  mode: CreateServiceUserMode
  open: boolean
  onCancel: () => void
  onCreated: (credentials: ServiceUserCredentials) => void
}

const NAME_MAX_LENGTH = 64
// Same rule as the service user API, so a name is refused before the request.
const NAME_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]*$/

export const isValidServiceUserName = (name: string): boolean =>
  name.length <= NAME_MAX_LENGTH && NAME_PATTERN.test(name)

export const CreateServiceUserModal = ({ mode, open, onCancel, onCreated }: CreateServiceUserModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [sourceUserId, setSourceUserId] = useState<number | undefined>(undefined)
  const [create, { isLoading: creating }] = useServiceUserCreateMutation()
  const [createFromUser, { isLoading: creatingFromUser }] = useServiceUserCreateFromUserMutation()

  const isFromUser = mode === 'from-user'
  const nameIsInvalid = name !== '' && !isValidServiceUserName(name)
  const canSubmit = isValidServiceUserName(name) && (!isFromUser || !isUndefined(sourceUserId))

  const reset = (): void => {
    setName('')
    setEmail('')
    setSourceUserId(undefined)
  }

  const handleOk = async (): Promise<void> => {
    if (!canSubmit) {
      return
    }

    const payload = { name, email: email.trim() === '' ? null : email.trim() }
    const result = isFromUser && !isUndefined(sourceUserId)
      ? await createFromUser({ id: sourceUserId, serviceUserCreateFromUser: payload })
      : await create({ serviceUserCreate: payload })

    if ('error' in result) {
      trackError(new ApiError(result.error as ConstructorParameters<typeof ApiError>[0]))
      return
    }

    reset()
    onCreated(result.data)
  }

  return (
    <Modal
      cancelText={ t('button.cancel') }
      okButtonProps={ { disabled: !canSubmit, loading: creating || creatingFromUser } }
      okText={ t('service-users.create.ok') }
      onCancel={ () => {
        reset()
        onCancel()
      } }
      onOk={ () => { void handleOk() } }
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
