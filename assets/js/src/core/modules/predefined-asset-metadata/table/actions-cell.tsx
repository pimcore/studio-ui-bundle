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
import { type PredefinedMetadata } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/metadata-api-slice-enhanced'
import { Flex, IconButton } from '@sdk/components'
import { type PredefinedAssetMetadataRow, usePredefinedAssetMetadata } from '../hooks/use-predefined-asset-metadata'

type PredefinedAssetMetadataWithActions = PredefinedMetadata & { actions: React.ReactNode }

interface ActionsCellProps {
  info: CellContext<PredefinedAssetMetadataWithActions, React.ReactNode>
  setPredefinedAssetMetadataRows: React.Dispatch<React.SetStateAction<PredefinedAssetMetadataRow[]>>
}

export const ActionsCell = ({ info, setPredefinedAssetMetadataRows }: ActionsCellProps): JSX.Element => {
  const id = info.row.original.id
  const { deleteMetadataById, deleteLoading } = usePredefinedAssetMetadata()

  const handleDelete = async (): Promise<void> => {
    const { success } = await deleteMetadataById(id)
    if (success) {
      setPredefinedAssetMetadataRows(prev => prev.filter(row => row.id !== id))
    }
  }

  return (
    <Flex
      align='center'
      justify='center'
    >
      <IconButton
        icon={ { value: 'trash' } }
        loading={ deleteLoading }
        onClick={ handleDelete }
        type="link"
      />
    </Flex>
  )
}
