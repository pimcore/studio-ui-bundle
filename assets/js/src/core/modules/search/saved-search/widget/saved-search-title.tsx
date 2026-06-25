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
import { useAppSelector } from '@Pimcore/app/store'
import { TabTitleContainer, type TabTitleContainerProps } from '@Pimcore/modules/widget-manager/title/tab-title-container'
import { selectSavedSearchDirty } from '../dirty/saved-search-dirty-slice'

/**
 * Tab title for a saved-search result widget — appends the "*" dirty indicator when the opened
 * search has unsaved changes (driven by the saved-search dirty slice).
 */
export const SavedSearchTitle = (props: TabTitleContainerProps): React.JSX.Element => {
  const { node } = props
  const savedSearchId = Number(node.getConfig().savedSearchId)
  const dirty = useAppSelector((state) => selectSavedSearchDirty(state, savedSearchId))

  return (
    <TabTitleContainer
      modified={ dirty }
      node={ node }
    />
  )
}
