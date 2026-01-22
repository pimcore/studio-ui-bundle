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
import React from 'react'
import { useLazyGdprExportQuery } from '../../gdpr-data-extractor-slice-enhanced'

interface ExportButtonProps extends Omit<React.ComponentProps<typeof IconButton>, 'id' | 'icon'> {
  id: number
  providerKey: string
}

export const ExportButton = ({ id, providerKey, onClick, loading, ...iconButtonProps }: ExportButtonProps): React.JSX.Element => {
  const [trigger, { isLoading }] = useLazyGdprExportQuery()

  const handleExport = async (e: React.MouseEvent<HTMLElement, MouseEvent>): Promise<void> => {
    try {
      const result = await trigger({ id, providerKey }).unwrap()

      const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `gdpr-export-${providerKey}-${id}.json`
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)

      onClick?.(e)
    } catch (error) {
      console.error('Export failed:', error)
    }
  }

  return (
    <IconButton
      {...iconButtonProps}
      icon={{ value: 'export' }}
      loading={isLoading || loading}
      onClick={handleExport}
    />
  )
}
