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
import { IconButton, Tooltip } from '@sdk/components'
import { t } from 'i18next'
import trackError, { ApiError } from '../../app/error-handler'
import { type ApiErrorData } from '../../app/error-handler/types'

interface ExportTranslationsButtonProps {
  domain: string
  filters?: {
    columnFilters?: object
    sortFilter?: object
  }
}

export const ExportTranslationsButton = ({ domain, filters }: ExportTranslationsButtonProps): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)

  const handleExport = async (): Promise<void> => {
    setIsLoading(true)
    try {
      const response = await fetch(`/pimcore-studio/api/translations/export?domain=${encodeURIComponent(domain)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          filters: filters ?? {}
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        trackError(new ApiError(errorData as ApiErrorData))
        return
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `export_${domain}_translations.csv`
      a.rel = 'noopener'
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      trackError(new ApiError(error as ApiErrorData))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Tooltip title={ t('translations.toolbar.export') }>
      <IconButton
        disabled={ isLoading }
        icon={ { value: 'download-cloud' } }
        loading={ isLoading }
        onClick={ () => { void handleExport() } }
      />
    </Tooltip>
  )
}
