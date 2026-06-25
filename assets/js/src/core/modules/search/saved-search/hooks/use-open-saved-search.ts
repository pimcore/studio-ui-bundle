/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useState } from 'react'
import { isUndefined } from 'lodash'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useLazySavedSearchGetConfigurationQuery } from '@Pimcore/modules/search/search-api-slice-enhanced'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { SAVED_SEARCH_RESULT_WIDGET } from '@Pimcore/modules/search/saved-search'
import { resolveSavedSearchElementType } from '@Pimcore/modules/search/saved-search/utils/resolve-element-type'

interface UseOpenSavedSearchReturn {
  /** Loads the saved search and opens it as a tab in the main widget area. */
  open: (id: number) => void
  /** The id currently being opened (for a per-row loading state), or undefined. */
  openingId: number | undefined
}

/**
 * Shared open-a-saved-search behaviour used by the Saved Searches tab and the menu-shortcut flyout.
 * The element type is inferred from the classId (objects carry one, assets don't) since the list
 * items don't expose it. `onOpened` runs after the widget is opened (e.g. to close the modal).
 */
export const useOpenSavedSearch = (onOpened?: () => void): UseOpenSavedSearchReturn => {
  const widgetManager = useWidgetManager()
  const [fetchConfiguration] = useLazySavedSearchGetConfigurationQuery()
  const [openingId, setOpeningId] = useState<number | undefined>(undefined)

  const open = (id: number): void => {
    setOpeningId(id)
    fetchConfiguration({ id }).then((result) => {
      if ('data' in result && !isUndefined(result.data)) {
        const configuration = result.data
        const elementType = resolveSavedSearchElementType(configuration)

        widgetManager.openMainWidget({
          id: `saved-search-${id}`,
          name: configuration.name,
          component: SAVED_SEARCH_RESULT_WIDGET,
          config: {
            savedSearchId: id,
            elementType,
            label: configuration.name,
            icon: { type: 'name', value: 'search' },
            iconColorGroup: 'element'
          }
        })
        onOpened?.()
      } else if ('error' in result && !isUndefined(result.error)) {
        trackError(new ApiError(result.error))
      }
    }).catch(() => { /* trigger never rejects; error handled via the result above */ })
      .finally(() => { setOpeningId(undefined) })
  }

  return { open, openingId }
}
