/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useContext, useState } from 'react'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { DataObjectContext } from '@Pimcore/modules/data-object/data-object-provider'
import { useLanguageSelection } from '@Pimcore/components/language-selection/provider/use-language-selection'
import { TAB_EDIT } from '../../types/object/tab-manager/tabs/edit/edit-container'
import { LanguageComparisonModal } from './language-comparison-modal'

const VISIBLE_TABS = new Set([TAB_EDIT.key])

export const LanguageComparisonViewButton = (): React.JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const { id } = useContext(DataObjectContext)
  const { activeTab, editorType } = useDataObjectDraft(id)
  const { hasLocalizedFields } = useLanguageSelection()

  const isObject = editorType?.name !== 'folder'
  const isTabVisible = VISIBLE_TABS.has(activeTab ?? '')

  if (!isObject || !isTabVisible || !hasLocalizedFields) {
    return <></>
  }

  return (
    <>
      <IconButton
        data-testid="data-object-editor-language-comparison-button"
        icon={ { value: 'split-view' } }
        onClick={ () => { setIsModalOpen(true) } }
      />

      <LanguageComparisonModal
        onClose={ () => { setIsModalOpen(false) } }
        open={ isModalOpen }
      />
    </>
  )
}
