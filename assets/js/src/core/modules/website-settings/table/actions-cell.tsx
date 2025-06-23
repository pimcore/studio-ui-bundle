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
import { useWebsiteSetting } from '../hooks/use-website-settings'
import { WebsiteSettingRow } from '../website-settings-container'
import { WebsiteSettingWithActions } from './table'

interface ActionsCellProps {
  info: CellContext<WebsiteSettingWithActions, React.ReactNode>
  setWebsiteSettingRows: React.Dispatch<React.SetStateAction<WebsiteSettingRow[]>>
}

export const ActionsCell = ({ info, setWebsiteSettingRows }: ActionsCellProps): JSX.Element => {
  const id = info.row.original.id
  const { deleteSettingById, deleteLoading } = useWebsiteSetting()

  const handleDelete = async (): Promise<void> => {
    const { success } = await deleteSettingById(id)
    if (success) {
      setWebsiteSettingRows(prev => prev.filter(row => row.id !== id))
    }
  }

  return (
    <div className="website-settings-table--actions-column">
      <IconButton
        icon={ { value: 'trash' } }
        loading={ deleteLoading }
        onClick={ handleDelete }
        type="link"
      />
    </div>
  )
}
