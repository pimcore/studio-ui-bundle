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
import { isNull } from 'lodash'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { FormattedDateTime } from '@Pimcore/components/formatted-date-time/formatted-date-time'
import { useStudioModal } from '@Pimcore/components/modal/hooks/use-studio-modal'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import {
  type ServiceUser,
  type ServiceUserCredentials,
  useServiceUserRotateSecretMutation
} from '../service-users-api-slice-enhanced'
import { OneTimeSecretModal } from './one-time-secret-modal'

interface CredentialsSectionProps {
  serviceUser: ServiceUser
}

export const CredentialsSection = ({ serviceUser }: CredentialsSectionProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { modal } = useStudioModal()
  const [rotate, { isLoading }] = useServiceUserRotateSecretMutation()
  const [credentials, setCredentials] = useState<ServiceUserCredentials | undefined>(undefined)

  const handleRotate = (): void => {
    modal.confirm({
      title: t('service-users.credentials.rotate'),
      content: t('service-users.credentials.rotate.confirm', { name: serviceUser.name }),
      okText: t('service-users.credentials.rotate'),
      cancelText: t('button.cancel'),
      onOk: async () => {
        const result = await rotate({ id: serviceUser.id })

        if ('error' in result) {
          trackError(new ApiError(result.error as ConstructorParameters<typeof ApiError>[0]))
          return
        }

        setCredentials(result.data)
      }
    })
  }

  return (
    <Flex
      gap="small"
      vertical
    >
      <Text strong>{t('service-users.credentials.title')}</Text>
      <Flex gap="small">
        <Text type="secondary">{t('service-users.credentials.client-id')}</Text>
        <Text copyable={ !isNull(serviceUser.clientId) }>
          {serviceUser.clientId ?? t('service-users.credentials.no-client')}
        </Text>
      </Flex>
      <Flex gap="small">
        <Text type="secondary">{t('service-users.credentials.last-used')}</Text>
        {isNull(serviceUser.lastLogin)
          ? <Text>{t('service-users.credentials.never-used')}</Text>
          : <FormattedDateTime timestamp={ serviceUser.lastLogin } />}
      </Flex>
      <div>
        <IconTextButton
          disabled={ isLoading || isNull(serviceUser.clientId) }
          icon={ { value: 'refresh' } }
          onClick={ handleRotate }
        >
          {t('service-users.credentials.rotate')}
        </IconTextButton>
      </div>

      <OneTimeSecretModal
        credentials={ credentials }
        onClose={ () => { setCredentials(undefined) } }
      />
    </Flex>
  )
}
