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
import { getPrefix } from '@Pimcore/app/api/pimcore/route'

interface ExportButtonProps extends Omit<React.ComponentProps<typeof IconButton>, 'id' | 'icon'> {
  id: number
  filename: string
}

export const ExportButton = ({ id, filename, onClick, ...iconButtonProps }: ExportButtonProps): React.JSX.Element => {
  const handleExport = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    const sanitizedFilename = filename
      .trim()
      .replaceAll(/[\s\\/:*?"<>|]+/g, '_')

    const url = `${getPrefix()}/gdpr/export-data/${id}?providerKey=assets`
    const link = document.createElement('a')
    link.href = url
    link.download = `${sanitizedFilename}.zip`
    document.body.appendChild(link)
    link.click()
    link.remove()

    onClick?.(e)
  }

  return (
    <IconButton
      { ...iconButtonProps }
      icon={ { value: 'export' } }
      onClick={ handleExport }
    />
  )
}
