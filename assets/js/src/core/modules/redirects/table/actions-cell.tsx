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
import { Flex, IconButton } from '@sdk/components'
import { type CellContext } from '@tanstack/react-table'
import { type RedirectRow, useRedirects } from '../hooks/use-redirects'

type RedirectWithActions = RedirectRow & { actions: React.ReactNode }

interface ActionsCellProps {
  info: CellContext<RedirectWithActions, React.ReactNode>
  setRedirectRows: React.Dispatch<React.SetStateAction<RedirectRow[]>>
}

export const ActionsCell = ({ info, setRedirectRows }: ActionsCellProps): React.JSX.Element => {
  const rowData = info.row.original
  const { deleteRedirectById, deleteLoading } = useRedirects()

  const handleDelete = async (): Promise<void> => {
    if (rowData.id !== null) {
      const { success } = await deleteRedirectById(rowData.id)
      if (success) {
        setRedirectRows(prev => prev.filter(row => row.rowId !== rowData.rowId))
      }
    }
  }

  return (
    <Flex align="center" justify= "center" className="redirects-table--actions-column">
      <IconButton
        icon={ { value: 'trash' } }
        loading={ deleteLoading }
        onClick={ handleDelete }
        type="link"
      />
    </Flex>
  )
}
