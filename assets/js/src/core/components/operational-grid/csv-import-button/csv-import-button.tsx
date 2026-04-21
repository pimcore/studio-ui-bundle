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
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { CsvImportModal } from '../csv-import-modal/csv-import-modal'
import { useOperationalGridContext } from '../provider/operational-grid-provider'

export const CsvImportButton = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { value, columns, onChange } = useOperationalGridContext()
  const [isOpen, setIsOpen] = useState(false)

  const handleConfirm = (newRows: any[]): void => {
    onChange?.(newRows)
    setIsOpen(false)
  }

  return (
    <>
      <IconButton
        icon={ { value: 'edit-pen' } }
        onClick={ () => { setIsOpen(true) } }
        tooltip={ { title: t('operational-grid.csv-import.title') } }
        type="default"
      />

      <CsvImportModal
        columns={ columns }
        onCancel={ () => { setIsOpen(false) } }
        onConfirm={ handleConfirm }
        open={ isOpen }
        value={ value }
      />
    </>
  )
}
