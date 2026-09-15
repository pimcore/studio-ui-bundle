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
import { Popconfirm } from 'antd'
import { Button } from '@Pimcore/components/button/button'
import { Text } from '@Pimcore/components/text/text'
import { useStyles } from './notification-settings.styles'

export interface NotificationSettingsToolbarProps {
  isDirty: boolean
  changedCount: number
  isSaving: boolean
  onSave: () => void
  onDiscard: () => void
}

export const NotificationSettingsToolbar = ({
  isDirty,
  changedCount,
  isSaving,
  onSave,
  onDiscard
}: NotificationSettingsToolbarProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const [confirmOpen, setConfirmOpen] = useState(false)

  return (
    <div className={ styles.toolbar }>
      {isDirty && (
        <Text type={ 'warning' }>
          {t('notifications.settings.unsaved-changes', { count: changedCount })}
        </Text>
      )}

      <span className={ styles.toolbarSpacer } />

      <Popconfirm
        cancelText={ t('notifications.settings.discard.keep-editing') }
        okText={ t('notifications.settings.discard.confirm') }
        onConfirm={ () => {
          setConfirmOpen(false)
          onDiscard()
        } }
        onOpenChange={ (open) => { setConfirmOpen(open && isDirty) } }
        open={ confirmOpen }
        title={ t('notifications.settings.discard.title') }
      >
        <Button disabled={ !isDirty || isSaving }>
          {t('notifications.settings.discard')}
        </Button>
      </Popconfirm>

      <Button
        disabled={ !isDirty }
        loading={ isSaving }
        onClick={ onSave }
        type={ 'primary' }
      >
        {t('notifications.settings.save')}
      </Button>
    </div>
  )
}
