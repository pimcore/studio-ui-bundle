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
import { IconTextButton, Tooltip, useFormModal } from '@sdk/components'
import { t } from 'i18next'
import { useTranslationCleanupByDomainMutation } from '../../app/translations/translations-api-slice-enhanced'
import trackError, { GeneralError } from '../../app/error-handler'

interface CleanupTranslationsButtonProps {
  domain: string
  onSuccess: () => void
}

export const CleanupTranslationsButton = ({ domain, onSuccess }: CleanupTranslationsButtonProps): React.JSX.Element => {
  const [cleanupTranslations, { isLoading }] = useTranslationCleanupByDomainMutation()
  const { confirm } = useFormModal()

  const handleCleanup = (): void => {
    confirm({
      title: t('translations.cleanup.confirm.title'),
      content: t('translations.cleanup.confirm.content'),
      okText: t('translations.cleanup.confirm.ok'),
      cancelText: t('button.cancel'),
      onOk: async () => {
        try {
          await cleanupTranslations({ domain }).unwrap()
          onSuccess()
        } catch {
          trackError(new GeneralError('Failed to cleanup translations'))
        }
      }
    })
  }

  return (
    <Tooltip title={ t('translations.toolbar.cleanup') }>
      <IconTextButton
        disabled={ isLoading }
        icon={ { value: 'trash' } }
        loading={ isLoading }
        onClick={ handleCleanup }
        type="link"
      >
        {t('translations.toolbar.cleanup')}
      </IconTextButton>
    </Tooltip>
  )
}
