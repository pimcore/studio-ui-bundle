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
import { IconButton, Tooltip, useFormModal } from '@sdk/components'
import { t } from 'i18next'
import { useTranslationCleanupByDomainMutation } from '../../app/translations/translations-api-slice-enhanced'
import trackError, { ApiError } from '../../app/error-handler'
import { type ApiErrorData } from '../../app/error-handler/types'

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
        } catch (error) {
          trackError(new ApiError(error as ApiErrorData))
        }
      }
    })
  }

  return (
    <Tooltip title={ t('translations.toolbar.cleanup') }>
      <IconButton
        disabled={ isLoading }
        icon={ { value: 'trash' } }
        loading={ isLoading }
        onClick={ handleCleanup }
      />
    </Tooltip>
  )
}
