/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { IconButton } from '@sdk/components'
import React, { useEffect } from 'react'
import { useLazyGdprExportQuery } from '../../gdpr-data-extractor-slice-enhanced'
import { downloadJsonFile } from '@Pimcore/modules/app/utils/download'
import { isUndefined } from 'lodash'
import trackError from '@Pimcore/modules/app/error-handler/error-handler'
import ApiError from '@Pimcore/modules/app/error-handler/classes/api-error'
import { GeneralError } from '@sdk/modules/app'

interface ExportButtonProps extends Omit<React.ComponentProps<typeof IconButton>, 'id' | 'icon'> {
  id: number
  providerKey: string
}

export const ExportButton = ({ id, providerKey, onClick, loading, ...iconButtonProps }: ExportButtonProps): React.JSX.Element => {
  const [trigger, { isLoading, error }] = useLazyGdprExportQuery()

  const handleExport = async (e: React.MouseEvent<HTMLElement, MouseEvent>): Promise<void> => {
    try {
      const result = await trigger({ id, providerKey }).unwrap()

      downloadJsonFile(
        `gdpr-export-${providerKey}-${id}.json`,
        result
      )

      onClick?.(e)
    } catch (error: any) {
      console.error('Export failed:', error)
      trackError(new GeneralError(error.message as string))
    }
  }

  useEffect(() => {
    if (!isUndefined(error)) {
      trackError(new ApiError(error))
    }
  }, [error])

  return (
    <IconButton
      { ...iconButtonProps }
      icon={ { value: 'export' } }
      loading={ isLoading || loading }
      onClick={ handleExport }
    />
  )
}
