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
import { Icon } from '@Pimcore/components/icon/icon'
import { type TranslationRow } from '../helpers/translation-helpers'

type TranslationWithActions = TranslationRow & { actions: React.ReactNode }

interface LanguageCellProps {
  info: CellContext<TranslationWithActions, any>
  language: string
  onEdit: (translationRow: TranslationRow, locale: string) => void
}

export const LanguageCell = ({ info, language, onEdit }: LanguageCellProps): React.JSX.Element => {
  const value = info.getValue() as string
  const translationRow = info.row.original

  return (
    <div style={ { display: 'flex', alignItems: 'center', gap: '8px' } }>
      <span>{value}</span>
      <div
        onClick={ () => { onEdit(translationRow, language) } }
        style={ { cursor: 'pointer', color: '#1890ff', display: 'flex', alignItems: 'center' } }
      >
        <Icon value="edit" />
      </div>
    </div>
  )
}
