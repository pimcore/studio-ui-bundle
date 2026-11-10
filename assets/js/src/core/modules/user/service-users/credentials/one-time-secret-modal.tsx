/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { isUndefined } from 'lodash'
import { Modal } from '@Pimcore/components/modal/modal'
import { Alert } from '@Pimcore/components/alert/alert'
import { Input } from '@Pimcore/components/input/input'
import { Button } from '@Pimcore/components/button/button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { FormattedDateTime } from '@Pimcore/components/formatted-date-time/formatted-date-time'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { copyToClipboardWithFeedback } from '@Pimcore/utils/clipboard'
import {
  type ServiceUserCredentials,
  type ServiceUserMcpAccessToken
} from '../service-users-api-slice-enhanced'

export type ClientSecretCredential = Pick<ServiceUserCredentials, 'clientId' | 'clientSecret'>
export type AccessTokenCredential = Pick<ServiceUserMcpAccessToken, 'token' | 'expiresAt'>

/** A credential the API returns once: the OAuth client secret or an MCP access token. */
export type OneTimeCredential = ClientSecretCredential | AccessTokenCredential

export const isAccessTokenCredential = (credential: OneTimeCredential): credential is AccessTokenCredential =>
  'token' in credential

interface OneTimeCredentialFieldsProps {
  credential: OneTimeCredential
}

/** The value of a one-time credential with the "shown only once" warning and a copy button for the secret part. */
export const OneTimeCredentialFields = ({ credential }: OneTimeCredentialFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { success, error } = useMessage()
  const isToken = isAccessTokenCredential(credential)
  const secretValue = isToken ? credential.token : credential.clientSecret
  const secretLabel = t(isToken ? 'service-users.credentials.token' : 'service-users.secret.client-secret')

  const copySecret = (): void => {
    void copyToClipboardWithFeedback(
      secretValue,
      () => { void success(t('clipboard.copy.success')) },
      () => { void error(t('clipboard.copy.error')) }
    )
  }

  return (
    <Flex
      gap="small"
      vertical
    >
      <Alert
        message={ t('service-users.secret.warning') }
        showIcon
        type="warning"
      />
      {!isToken && (
        <>
          <Text strong>{t('service-users.credentials.client-id')}</Text>
          <Input
            placeholder={ t('service-users.credentials.client-id') }
            readOnly
            value={ credential.clientId }
          />
        </>
      )}
      <Text strong>{secretLabel}</Text>
      <Input
        placeholder={ secretLabel }
        readOnly
        value={ secretValue }
      />
      {isToken && (
        <Flex gap="small">
          <Text type="secondary">{t('service-users.credentials.token.expires')}</Text>
          <FormattedDateTime timestamp={ credential.expiresAt } />
        </Flex>
      )}
      <div>
        <Button onClick={ copySecret }>{t('service-users.secret.copy')}</Button>
      </div>
    </Flex>
  )
}

interface OneTimeSecretModalProps {
  /** The modal is open while a credential is set; the parent drops it on close so the secret is gone. */
  credential?: OneTimeCredential
  onClose: () => void
}

export const OneTimeSecretModal = ({ credential, onClose }: OneTimeSecretModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const isToken = !isUndefined(credential) && isAccessTokenCredential(credential)

  return (
    <Modal
      closable={ false }
      // A closed antd modal keeps its last content in the DOM; drop it so the secret is really gone.
      destroyOnClose
      footer={
        <Flex justify="end">
          <Button
            onClick={ onClose }
            type="primary"
          >
            {t('service-users.secret.close')}
          </Button>
        </Flex>
      }
      maskClosable={ false }
      open={ !isUndefined(credential) }
      title={ t(isToken ? 'service-users.credentials.token' : 'service-users.secret.title') }
    >
      {!isUndefined(credential) && <OneTimeCredentialFields credential={ credential } />}
    </Modal>
  )
}
