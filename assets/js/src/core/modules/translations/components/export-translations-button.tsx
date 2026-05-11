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
import { IconTextButton } from '@sdk/components'
import { t } from 'i18next'
import { useTranslationExportListMutation } from '../../app/translations/translations-api-slice-enhanced'
import trackError, { GeneralError } from '../../app/error-handler'
import { downloadFile } from '../../app/utils/download'

interface ExportTranslationsButtonProps {
  domain: string
  filters?: {
    columnFilters?: object
    sortFilter?: object
  }
}

export const ExportTranslationsButton = ({ domain, filters }: ExportTranslationsButtonProps): React.JSX.Element => {
  const [exportTranslations, { isLoading }] = useTranslationExportListMutation()

  const handleExport = async (): Promise<void> => {
    try {
      const result = await exportTranslations({
        domain,
        body: {
          filters: filters ?? {}
        }
      }).unwrap()

      if (result instanceof Blob) {
        downloadFile(`export_${domain}_translations.csv`, result)
      } else {
        trackError(new GeneralError('Export failed: No blob data received'))
      }
    } catch {
      trackError(new GeneralError('Failed to export translations'))
    }
  }

  return (
    <IconTextButton
      disabled={ isLoading }
      icon={ { value: 'export' } }
      loading={ isLoading }
      onClick={ () => { void handleExport() } }
      type="link"
    >
      {t('translations.toolbar.export')}
    </IconTextButton>
  )
}
