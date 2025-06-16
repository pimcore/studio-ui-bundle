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
import { type CellContext } from '@tanstack/react-table'
import { IconButton } from '@sdk/components'
import { DocumentTypeRow, useDocumentType } from '../hooks/use-document-type'
import { type DocumentTypesWithActions } from './table'

interface ActionsCellProps {
  info: CellContext<DocumentTypesWithActions, React.ReactNode>
  setDocumentTypeRows: React.Dispatch<React.SetStateAction<DocumentTypeRow[]>>
}

export const ActionsCell = ({ info, setDocumentTypeRows }: ActionsCellProps): JSX.Element => {
  const id = info.row.original.id
  const { deleteDocumentTypeById, deleteLoading } = useDocumentType()

  const handleDelete = async (): Promise<void> => {
    const { success } = await deleteDocumentTypeById(id)
    if (success) {
      setDocumentTypeRows(prev => prev.filter(row => row.id !== id))
    }
  }

  return (
    <div className="document-types-table--actions-column">
      <IconButton
        icon={ { value: 'translate' } }
        onClick={ () => { console.log('Open Translate View') } }
        type="link"
      />
      <IconButton
        icon={ { value: 'trash' } }
        loading={ deleteLoading }
        onClick={ handleDelete }
        type="link"
      />
    </div>
  )
}
