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
import { type PredefinedProperty } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice-enhanced'
import { IconButton } from '@sdk/components'
import { type PredefinedPropertyRow, usePredefinedProperty } from '../hooks/use-predefined-property'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { TRANSLATIONS_WIDGET } from '@Pimcore/modules/translations'

type PredefinedPropertyWithActions = PredefinedProperty & { actions: React.ReactNode }

interface ActionsCellProps {
  info: CellContext<PredefinedPropertyWithActions, React.ReactNode>
  setPredefinedPropertyRows: React.Dispatch<React.SetStateAction<PredefinedPropertyRow[]>>
}

export const ActionsCell = ({ info, setPredefinedPropertyRows }: ActionsCellProps): JSX.Element => {
  const id = info.row.original.id
  const name = info.row.original.name
  const { deletePropertyById, deleteLoading } = usePredefinedProperty()
  const { openMainWidget, updateWidget } = useWidgetManager()

  const handleDelete = async (): Promise<void> => {
    const { success } = await deletePropertyById(id)
    if (success) {
      setPredefinedPropertyRows(prev => prev.filter(row => row.id !== id))
    }
  }

  const handleTranslate = (): void => {
    const widgetConfig = {
      ...TRANSLATIONS_WIDGET,
      config: {
        ...TRANSLATIONS_WIDGET.config,
        initialDomain: 'admin',
        initialSearchTerm: name
      }
    }

    openMainWidget(widgetConfig)
    updateWidget(widgetConfig)
  }

  return (
    <div className="properties-table--actions-column">
      <IconButton
        icon={ { value: 'translate' } }
        onClick={ handleTranslate }
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
