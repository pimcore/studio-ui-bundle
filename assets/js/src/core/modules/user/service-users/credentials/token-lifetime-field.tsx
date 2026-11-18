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
import { isNull } from 'lodash'
import { InputNumber } from '@Pimcore/components/input-number/input-number'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'

// Same bounds as the MCP token API, so a lifetime is refused before the request.
export const TOKEN_LIFETIME_MIN_DAYS = 1
export const TOKEN_LIFETIME_MAX_DAYS = 90
export const TOKEN_LIFETIME_DEFAULT_DAYS = 30

export const isValidTokenLifetime = (days: number | null): days is number =>
  !isNull(days) && Number.isInteger(days) && days >= TOKEN_LIFETIME_MIN_DAYS && days <= TOKEN_LIFETIME_MAX_DAYS

interface TokenLifetimeFieldProps {
  value: number | null
  onChange: (days: number | null) => void
}

/** Lifetime of a new MCP access token in days, with the hint on how clients send the token. */
export const TokenLifetimeField = ({ value, onChange }: TokenLifetimeFieldProps): React.JSX.Element => {
  const { t } = useTranslation()
  const isInvalid = !isValidTokenLifetime(value)

  return (
    <Flex
      gap="mini"
      vertical
    >
      <Text type="secondary">{t('service-users.credentials.issue.hint')}</Text>
      <Text strong>{t('service-users.credentials.issue.ttl')}</Text>
      {/* No min/max here: the input would swallow an out-of-range value silently instead of showing the error. */}
      <InputNumber
        onChange={ (days) => { onChange(typeof days === 'number' ? days : null) } }
        placeholder={ t('service-users.credentials.issue.ttl') }
        precision={ 0 }
        status={ isInvalid ? 'error' : undefined }
        value={ value }
      />
      {isInvalid && <Text type="danger">{t('service-users.credentials.issue.ttl.invalid')}</Text>}
    </Flex>
  )
}
