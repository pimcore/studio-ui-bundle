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
import { Flex, IconButton } from '@sdk/components'
import { useWebsiteSetting } from '../hooks/use-website-settings'
import { WebsiteSettingRow } from '../website-settings-container'
import { WebsiteSettingEnrichedWithActions } from './table'

interface ActionsCellProps {
  info: CellContext<WebsiteSettingEnrichedWithActions, React.ReactNode>
  setWebsiteSettingRows: React.Dispatch<React.SetStateAction<WebsiteSettingRow[]>>
  onUpdateCellData: (params: {
    columnId: string;
    value: string;
    rowData: WebsiteSettingRow;
  }) => Promise<void>
}

export const ActionsCell = ({ info, setWebsiteSettingRows, onUpdateCellData }: ActionsCellProps): JSX.Element => {
   const row = info.row.original
  const id = row.id
  const { deleteSettingById, deleteLoading } = useWebsiteSetting()

  const handleDelete = async (): Promise<void> => {
    const { success } = await deleteSettingById(id)
    if (success) {
      setWebsiteSettingRows(prev => prev.filter(row => row.id !== id))
    }
  }

  return (
    <Flex justify="center" className="website-settings-table--actions-column">
      <IconButton
        icon={ { value: 'close' } }
        onClick={ () => onUpdateCellData({columnId: "data", value: "", rowData: row}) }
        type="link"
      />
      <IconButton
        icon={ { value: 'trash' } }
        loading={ deleteLoading }
        onClick={ handleDelete }
        type="link"
      />
    </Flex>
  )
}
