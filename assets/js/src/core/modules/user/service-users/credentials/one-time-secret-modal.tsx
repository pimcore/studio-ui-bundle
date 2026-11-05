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
import { useMessage } from '@Pimcore/components/message/useMessage'
import { copyToClipboardWithFeedback } from '@Pimcore/utils/clipboard'
import { type ServiceUserCredentials } from '../service-users-api-slice-enhanced'

interface OneTimeSecretModalProps {
  /** The modal is open while credentials are set; the parent drops them on close so the secret is gone. */
  credentials?: ServiceUserCredentials
  onClose: () => void
}

export const OneTimeSecretModal = ({ credentials, onClose }: OneTimeSecretModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { success, error } = useMessage()

  const copySecret = (): void => {
    if (isUndefined(credentials)) {
      return
    }

    void copyToClipboardWithFeedback(
      credentials.clientSecret,
      () => { void success(t('clipboard.copy.success')) },
      () => { void error(t('clipboard.copy.error')) }
    )
  }

  return (
    <Modal
      closable={ false }
      footer={
        <Flex
          gap="small"
          justify="end"
        >
          <Button onClick={ copySecret }>{t('service-users.secret.copy')}</Button>
          <Button
            onClick={ onClose }
            type="primary"
          >
            {t('service-users.secret.close')}
          </Button>
        </Flex>
      }
      maskClosable={ false }
      open={ !isUndefined(credentials) }
      title={ t('service-users.secret.title') }
    >
      {!isUndefined(credentials) && (
        <Flex
          gap="small"
          vertical
        >
          <Alert
            message={ t('service-users.secret.warning') }
            showIcon
            type="warning"
          />
          <Text strong>{t('service-users.credentials.client-id')}</Text>
          <Input
            placeholder={ t('service-users.credentials.client-id') }
            readOnly
            value={ credentials.clientId }
          />
          <Text strong>{t('service-users.secret.client-secret')}</Text>
          <Input
            placeholder={ t('service-users.secret.client-secret') }
            readOnly
            value={ credentials.clientSecret }
          />
        </Flex>
      )}
    </Modal>
  )
}
