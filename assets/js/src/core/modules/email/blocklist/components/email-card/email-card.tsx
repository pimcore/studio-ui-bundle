/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Card } from '@Pimcore/components/card/card'
import { Flex } from '@Pimcore/components/flex/flex'
import { type Blocklist } from '@Pimcore/modules/email/emails-api-slice.gen'
import { IconButton } from '@sdk/components'
import { formatDateTime } from '@sdk/utils'
import { Space } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useEmailBlocklist } from '../../hooks/use-email-blocklist'

interface EmailCardProps {
  entry: Blocklist
}

export const EmailCard = ({ entry }: EmailCardProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { removeEmail } = useEmailBlocklist()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <Card>
      <Flex
        align="center"
        justify="space-between"
      >
        <span>{entry.email}</span>

        <Space>
          <span>{formatDateTime({ timestamp: entry.modificationDate!, dateStyle: 'short', timeStyle: 'short' })}</span>

          <IconButton
            aria-label={ t('aria.email-blocklist.remove.email') }
            icon={ isLoading ? { value: 'spinner' } : { value: 'trash' } }
            loading={ isLoading }
            onClick={ () => {
              setIsLoading(true)
              void removeEmail(entry.email)
            } }
            type="link"
          />
        </Space>
      </Flex>
    </Card>
  )
}
