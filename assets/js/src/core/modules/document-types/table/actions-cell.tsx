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
import { type DocumentTypeRow, useDocumentType } from '../hooks/use-document-type'
import { type DocumentTypeWithActions } from './table'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { TRANSLATIONS_WIDGET } from '@Pimcore/modules/translations'
import { useTranslation } from 'react-i18next'

interface ActionsCellProps {
  info: CellContext<DocumentTypeWithActions, React.ReactNode>
  setDocumentTypeRows: React.Dispatch<React.SetStateAction<DocumentTypeRow[]>>
}

export const ActionsCell = ({ info, setDocumentTypeRows }: ActionsCellProps): JSX.Element => {
  const { t } = useTranslation()
  const id = info.row.original.id
  const name = info.row.original.name
  const { deleteDocumentTypeById, deleteLoading } = useDocumentType()
  const { openMainWidget, updateWidget } = useWidgetManager()

  const handleDelete = async (): Promise<void> => {
    const { success } = await deleteDocumentTypeById(id)
    if (success) {
      setDocumentTypeRows(prev => prev.filter(row => row.id !== id))
    }
  }

  // opens the translations of the document type name, like the predefined properties do
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
    <div className="document-types-table--actions-column">
      <IconButton
        aria-label={ t('translate') }
        icon={ { value: 'translate' } }
        onClick={ handleTranslate }
        tooltip={ { title: t('translate') } }
        type="link"
      />
      <IconButton
        aria-label={ t('delete') }
        icon={ { value: 'trash' } }
        loading={ deleteLoading }
        onClick={ handleDelete }
        tooltip={ { title: t('delete') } }
        type="link"
      />
    </div>
  )
}
