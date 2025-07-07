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
import { useTranslation } from '../hooks/use-translation'
import { TranslationRow } from '../translations-container'

type TranslationRowWithActions = TranslationRow & { actions: React.ReactNode }

interface ActionsCellProps {
  info: CellContext<TranslationRowWithActions, React.ReactNode>
  setTranslations: React.Dispatch<React.SetStateAction<TranslationRow[]>>
}

export const ActionsCell = ({ info, setTranslationRows }: ActionsCellProps): JSX.Element => {
  const id = info.row.original.id
  // const { deleteTranslationById, deleteLoading } = useTranslation()

  // const handleDelete = async (): Promise<void> => {
  //   const { success } = await deleteTranslationyById(id)
  //   if (success) {
  //     setTranslationRows(prev => prev.filter(row => row.id !== id))
  //   }
  // }

  return (
    <div className="properties-table--actions-column">
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
