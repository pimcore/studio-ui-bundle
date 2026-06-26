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
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@Pimcore/app/store'
import { TabTitleContainer, type TabTitleContainerProps } from '@Pimcore/modules/widget-manager/title/tab-title-container'
import { selectSavedSearchDirty } from '../dirty/saved-search-dirty-slice'

/**
 * Tab title for a saved-search result widget — shows the element type next to the name (e.g.
 * "My search (Asset)") and appends the "*" dirty indicator when the opened search has unsaved
 * changes (driven by the saved-search dirty slice).
 */
export const SavedSearchTitle = (props: TabTitleContainerProps): React.JSX.Element => {
  const { node } = props
  const { t } = useTranslation()
  const config = node.getConfig()
  const savedSearchId = Number(config.savedSearchId)
  const dirty = useAppSelector((state) => selectSavedSearchDirty(state, savedSearchId))

  const baseTitle = typeof config.label === 'string' ? config.label as string : node.getName()
  const elementType = typeof config.elementType === 'string' ? config.elementType as string : undefined
  const title = elementType !== undefined ? `${baseTitle} (${t(elementType)})` : undefined

  return (
    <TabTitleContainer
      modified={ dirty }
      node={ node }
      title={ title }
    />
  )
}
