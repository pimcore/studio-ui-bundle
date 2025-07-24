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
import { useTranslation } from '../hooks/use-translation'
import { type TranslationRow } from '../helpers/translation-helpers'

type TranslationRowWithActions = TranslationRow & { actions: React.ReactNode }

interface ActionsCellProps {
  info: CellContext<TranslationRowWithActions, React.ReactNode>
  setTranslationRows: React.Dispatch<React.SetStateAction<TranslationRow[]>>
}

export const ActionsCell = ({ info, setTranslationRows }: ActionsCellProps): React.JSX.Element => {
  const key = info.row.original.key
  const { deleteTranslationByKey, deleteLoading } = useTranslation()

  const handleDelete = async (): Promise<void> => {
    const { success } = await deleteTranslationByKey(key)
    if (success) {
      setTranslationRows(prev => prev.filter(row => row.key !== key))
    }
  }

  return (
    <Flex
      align="center"
      className="translations-table--actions-column"
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
