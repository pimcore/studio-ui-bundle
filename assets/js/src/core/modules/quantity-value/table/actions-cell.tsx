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
import { useTranslation } from 'react-i18next'
import { Flex, IconButton, useFormModal } from '@sdk/components'
import { type QuantityValueUnit } from '@Pimcore/modules/data-object/unit-slice-enhanced'
import { type QuantityValueUnitRow, useQuantityValueUnit } from '../hooks/use-quantity-value-unit'

type QuantityValueUnitWithActions = QuantityValueUnit & { actions: React.ReactNode }

interface ActionsCellProps {
  info: CellContext<QuantityValueUnitWithActions, React.ReactNode>
  setQuantityValueUnitRows: React.Dispatch<React.SetStateAction<QuantityValueUnitRow[]>>
}

export const ActionsCell = ({ info, setQuantityValueUnitRows }: ActionsCellProps): JSX.Element => {
  const id = info.row.original.id
  const { t } = useTranslation()
  const modal = useFormModal()
  const { deleteUnitById, deleteLoading } = useQuantityValueUnit()

  const deleteUnit = async (unitId: string): Promise<void> => {
    const { success } = await deleteUnitById(unitId)
    if (success) {
      setQuantityValueUnitRows(prev => prev.filter(row => row.id !== unitId))
    }
  }

  const handleDelete = (): void => {
    if (id === null) return

    modal.confirm({
      title: t('warning'),
      content: t('quantity-values.delete-confirmation'),
      okText: t('delete'),
      onOk: async () => { await deleteUnit(id) }
    })
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
