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
import { Switch } from '@Pimcore/components/switch/switch'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { Text } from '@Pimcore/components/text/text'

export interface NotificationSettingsCellProps {
  checked: boolean
  /** False when the type cannot use this channel at all. */
  supported: boolean
  /** Channels are only meaningful while the type is subscribed to. */
  disabled?: boolean
  ariaLabel: string
  onChange?: (checked: boolean) => void
}

/**
 * One preference cell. An unsupported channel renders as a dash, not a disabled switch — a
 * switch implies someone could turn it on.
 */
export const NotificationSettingsCell = ({
  checked,
  supported,
  disabled = false,
  ariaLabel,
  onChange
}: NotificationSettingsCellProps): React.JSX.Element => {
  const { t } = useTranslation()

  if (!supported) {
    return (
      <Tooltip title={ t('notifications.settings.not-available') }>
        <Text type={ 'secondary' }>—</Text>
      </Tooltip>
    )
  }

  return (
    <Switch
      aria-label={ ariaLabel }
      checked={ checked }
      disabled={ disabled }
      onChange={ onChange }
    />
  )
}
