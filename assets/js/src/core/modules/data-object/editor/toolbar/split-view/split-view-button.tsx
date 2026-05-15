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
import { TAB_LISTING } from '../../types/folder/tab-manager/tabs/listing/listing-container'
import { TAB_VARIANTS } from '../../types/variant/tab-manager/tabs/variants/variants-tab-container'
import { LanguageComparisonModal } from './language-comparison-modal'

const VISIBLE_TABS = [TAB_EDIT.key, TAB_LISTING.key, TAB_VARIANTS.key]

export const SplitViewButton = (): React.JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const { id } = useContext(DataObjectContext)
  const { activeTab, editorType } = useDataObjectDraft(id)
  const { hasLocalizedFields } = useLanguageSelection()

  const isTabVisible = VISIBLE_TABS.includes(activeTab ?? '')
  const hasLanguages = hasLocalizedFields || editorType?.name === 'folder'

  if (!isTabVisible || !hasLanguages) {
    return <></>
  }

  return (
    <>
      <IconButton
        data-testid="data-object-editor-split-view-button"
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
