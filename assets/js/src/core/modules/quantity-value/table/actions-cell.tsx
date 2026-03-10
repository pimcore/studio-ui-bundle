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
import { type QuantityValueUnit } from '@Pimcore/modules/data-object/unit-slice-enhanced'
import { type QuantityValueUnitRow, useQuantityValueUnit } from '../hooks/use-quantity-value-unit'

type QuantityValueUnitWithActions = QuantityValueUnit & { actions: React.ReactNode }

interface ActionsCellProps {
  info: CellContext<QuantityValueUnitWithActions, React.ReactNode>
  setQuantityValueUnitRows: React.Dispatch<React.SetStateAction<QuantityValueUnitRow[]>>
}

export const ActionsCell = ({ info, setQuantityValueUnitRows }: ActionsCellProps): JSX.Element => {
  const id = info.row.original.id
  const { deleteUnitById, deleteLoading } = useQuantityValueUnit()

  const handleDelete = async (): Promise<void> => {
    if (id === null) return

    const { success } = await deleteUnitById(id)
    if (success) {
      setQuantityValueUnitRows(prev => prev.filter(row => row.id !== id))
    }
  }

  return (
    <Flex
      align="center"
      justify="center"
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
