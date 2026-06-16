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
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { useStyles } from './edit-lock-warning.styles'

const typeLabelKey: Record<ElementType, string> = {
  asset: 'data-type.asset',
  document: 'data-type.document',
  'data-object': 'data-type.object'
}

export interface EditLockWarningProps {
  elementType: ElementType
  /** Full path of the element. */
  path?: string
  /** Name of the user holding the lock. */
  userName?: string | null
  /** Unix timestamp (seconds) when the lock was acquired. */
  date?: number | null
}

export const EditLockWarning = ({ elementType, path, userName, date }: EditLockWarningProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  return (
    <Flex
      gap="small"
      vertical
    >
      {!isNil(path) && path !== '' && (
        <Text>{`${t('element.edit-lock.path')}: ${path}`}</Text>
      )}

      <Text>{`${t('element.edit-lock.type')}: ${t(typeLabelKey[elementType])}`}</Text>

      {!isNil(userName) && userName !== '' && (
        <Text>{`${t('element.edit-lock.user')}: ${userName}`}</Text>
      )}

      {!isNil(date) && (
        <Text>
          {`${t('element.edit-lock.editing-since')}: ${formatDateTime({ timestamp: date, dateStyle: 'medium', timeStyle: 'short' })}`}
        </Text>
      )}

      <Text
        className={ styles.warning }
        strong
      >
        {t('element.edit-lock.warning')}
      </Text>
    </Flex>
  )
}
