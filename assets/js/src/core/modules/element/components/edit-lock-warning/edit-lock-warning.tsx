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
import { isNil } from 'lodash'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { formatDateTime } from '@Pimcore/utils/date-time'

export interface EditLockWarningProps {
  /** Name of the user currently holding the lock. */
  userName?: string | null
  /** Unix timestamp (in seconds) of when the lock was acquired. */
  date?: number | null
}

export const EditLockWarning = ({ userName, date }: EditLockWarningProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Flex
      gap="small"
      vertical
    >
      <Text>{t('element.edit-lock.question')}</Text>

      {!isNil(userName) && userName !== '' && (
        <Text>{`${t('element.edit-lock.user')}: ${userName}`}</Text>
      )}

      {!isNil(date) && (
        <Text>
          {`${t('element.edit-lock.since')}: ${formatDateTime({ timestamp: date, dateStyle: 'medium', timeStyle: 'short' })}`}
        </Text>
      )}
    </Flex>
  )
}
