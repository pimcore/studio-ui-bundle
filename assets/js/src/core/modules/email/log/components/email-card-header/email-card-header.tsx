/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@Pimcore/app/store'
import { Flex } from '@Pimcore/components/flex/flex'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { api } from '@Pimcore/modules/email/emails-api-slice-enhanced'
import { type EmailLog, useEmailLogGetByIdQuery } from '@Pimcore/modules/email/emails-api-slice.gen'
import { Text } from '@sdk/components'
import { Divider } from 'antd'
import { isNil } from 'lodash'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useEmailLog } from '../../hooks/use-email-log'
import { ForwardModal } from '../forward-modal/forward-modal'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'

interface EmailCardHeaderProps {
  email: EmailLog
}

export const EmailCardHeader = ({ email }: EmailCardHeaderProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { resendWithConfirmation, removeWithConfirmation } = useEmailLog()
  const [isForwardModalOpen, setIsForwardModalOpen] = useState<boolean>(false)
  const { data } = useEmailLogGetByIdQuery({ id: email.id })
  const dispatch = useAppDispatch()

  return (
    <Flex
      className="email-log-content__header"
      justify="space-between"
    >
      <Flex vertical>
        <Text type="secondary">{`${t('widget.email-log.from')}: ${email.from}`}</Text>

        <Flex
          align="center"
          gap="mini"
        >
          <Text type="secondary">{`${t('widget.email-log.to')}: ${email.from}`}</Text>
          {!isNil(data?.cc) && (
            <>
              <Divider type="vertical" />
              <Text type="secondary">{`${t('widget.email-log.cc')}: ${data.cc}`}</Text>
            </>
          )}

          {!isNil(data?.bcc) && (
            <>
              <Divider type="vertical" />
              <Text type="secondary">{`${t('widget.email-log.bcc')}: ${data.bcc}`}</Text>
            </>
          )}
        </Flex>
      </Flex>

      <div>
        <Tooltip title={t('email-log.tooltip.resend')}>
          <IconButton
            icon={{ value: 'vector' }}
            onClick={() => {
              resendWithConfirmation(email.id, () => {
                dispatch(
                  api.util.invalidateTags(
                    invalidatingTags.EMAIL_LOG()
                  )
                )
              })
            }}
          />
        </Tooltip>

        <Tooltip title={t('email-log.tooltip.forward')}>
          <IconButton
            icon={{ value: 'flip-forward' }}
            onClick={() => { setIsForwardModalOpen(true) }}
          />
        </Tooltip>

        <Tooltip title={t('email-log.tooltip.delete')}>
          <IconButton
            icon={{ value: 'trash' }}
            onClick={() => {
              removeWithConfirmation(email.id, () => {
                dispatch(
                  api.util.invalidateTags(
                    invalidatingTags.EMAIL_LOG()
                  )
                )
              })
            }}
          />
        </Tooltip>
      </div>

      <ForwardModal
        email={email}
        open={isForwardModalOpen}
        setOpen={setIsForwardModalOpen}
      />
    </Flex>
  )
}
