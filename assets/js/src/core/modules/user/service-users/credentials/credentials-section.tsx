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
import { isNull, isUndefined } from 'lodash'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Modal } from '@Pimcore/components/modal/modal'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { FormattedDateTime } from '@Pimcore/components/formatted-date-time/formatted-date-time'
import { useStudioModal } from '@Pimcore/components/modal/hooks/use-studio-modal'
import { useMessage } from '@Pimcore/components/message/useMessage'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import {
  type ServiceUser,
  useServiceUserMcpTokenIssueMutation,
  useServiceUserMcpTokenRevokeMutation,
  useServiceUserRotateSecretMutation
} from '../service-users-api-slice-enhanced'
import { type OneTimeCredential, OneTimeSecretModal } from './one-time-secret-modal'
import { isValidTokenLifetime, TOKEN_LIFETIME_DEFAULT_DAYS, TokenLifetimeField } from './token-lifetime-field'

interface CredentialsSectionProps {
  serviceUser: ServiceUser
}

const reportError = (error: unknown): void => {
  trackError(new ApiError(error as ConstructorParameters<typeof ApiError>[0]))
}

export const CredentialsSection = ({ serviceUser }: CredentialsSectionProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { modal } = useStudioModal()
  const { success } = useMessage()
  const [rotate, { isLoading: rotating }] = useServiceUserRotateSecretMutation()
  const [issue, { isLoading: issuing }] = useServiceUserMcpTokenIssueMutation()
  const [revoke, { isLoading: revoking }] = useServiceUserMcpTokenRevokeMutation()
  const [credential, setCredential] = useState<OneTimeCredential | undefined>(undefined)
  const [issueOpen, setIssueOpen] = useState(false)
  const [ttlDays, setTtlDays] = useState<number | null>(TOKEN_LIFETIME_DEFAULT_DAYS)
  const { mcpTokens } = serviceUser

  const closeIssue = (): void => {
    setIssueOpen(false)
    setTtlDays(TOKEN_LIFETIME_DEFAULT_DAYS)
  }

  const handleIssue = async (): Promise<void> => {
    if (!isValidTokenLifetime(ttlDays)) {
      return
    }

    const result = await issue({ id: serviceUser.id, serviceUserMcpTokenRequest: { ttlDays } })

    if ('error' in result) {
      reportError(result.error)
      return
    }

    closeIssue()
    setCredential(result.data)
  }

  const handleRevoke = (): void => {
    modal.confirm({
      title: t('service-users.credentials.revoke'),
      content: t('service-users.credentials.revoke.confirm'),
      okText: t('service-users.credentials.revoke'),
      cancelText: t('button.cancel'),
      onOk: async () => {
        const result = await revoke({ id: serviceUser.id })

        if ('error' in result) {
          reportError(result.error)
          return
        }

        void success(t('service-users.credentials.revoke.success'))
      }
    })
  }

  const handleRotate = (): void => {
    modal.confirm({
      title: t('service-users.credentials.rotate'),
      content: t('service-users.credentials.rotate.confirm', { name: serviceUser.name }),
      okText: t('service-users.credentials.rotate'),
      cancelText: t('button.cancel'),
      onOk: async () => {
        const result = await rotate({ id: serviceUser.id })

        if ('error' in result) {
          reportError(result.error)
          return
        }

        setCredential(result.data)
      }
    })
  }

  return (
    <Flex
      gap="small"
      vertical
    >
      <Text strong>{t('service-users.credentials.title')}</Text>

      <Text strong>{t('service-users.credentials.mcp-tokens')}</Text>
      <Flex gap="small">
        <Text type="secondary">{t('service-users.credentials.mcp-tokens.active')}</Text>
        <Text>{String(mcpTokens.active)}</Text>
      </Flex>
      <Flex gap="small">
        <Text type="secondary">{t('service-users.credentials.mcp-tokens.latest-expiry')}</Text>
        {isNull(mcpTokens.latestExpiresAt)
          ? <Text>{t('service-users.credentials.mcp-tokens.none')}</Text>
          : <FormattedDateTime timestamp={ mcpTokens.latestExpiresAt } />}
      </Flex>
      <Flex gap="small">
        <IconTextButton
          disabled={ issuing || !serviceUser.active }
          icon={ { value: 'new' } }
          onClick={ () => { setIssueOpen(true) } }
        >
          {t('service-users.credentials.issue')}
        </IconTextButton>
        <IconTextButton
          disabled={ revoking || mcpTokens.active === 0 }
          icon={ { value: 'trash' } }
          onClick={ handleRevoke }
        >
          {t('service-users.credentials.revoke')}
        </IconTextButton>
      </Flex>

      <Text strong>{t('service-users.credentials.oauth')}</Text>
      {serviceUser.clientCredentialsEnabled
        ? (
          <>
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
                disabled={ rotating || isNull(serviceUser.clientId) }
                icon={ { value: 'refresh' } }
                onClick={ handleRotate }
              >
                {t('service-users.credentials.rotate')}
              </IconTextButton>
            </div>
            <Text type="secondary">{t('service-users.credentials.oauth.rotate-hint')}</Text>
          </>
          )
        : <Text type="secondary">{t('service-users.credentials.oauth.disabled')}</Text>}

      <Modal
        cancelText={ t('button.cancel') }
        okButtonProps={ { disabled: !isValidTokenLifetime(ttlDays), loading: issuing } }
        okText={ t('service-users.credentials.issue') }
        onCancel={ closeIssue }
        onOk={ () => { void handleIssue() } }
        open={ issueOpen }
        title={ t('service-users.credentials.issue.title') }
      >
        <TokenLifetimeField
          onChange={ setTtlDays }
          value={ ttlDays }
        />
      </Modal>

      <OneTimeSecretModal
        credentials={ isUndefined(credential) ? undefined : [credential] }
        onClose={ () => { setCredential(undefined) } }
      />
    </Flex>
  )
}
