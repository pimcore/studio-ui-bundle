/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type WidgetManagerActionService } from '@Pimcore/modules/widget-manager/services/widget-manager-action-service'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'

/** Widget type id for a saved-search result tab. */
export const SAVED_SEARCH_RESULT_WIDGET = 'saved-search-result'

interface OpenSavedSearchResultWidgetParams {
  id: number
  name: string
  elementType: ElementType
}

/**
 * Opens (or focuses) a saved search as a tab in the main widget area. The result widget self-loads
 * its configuration from the id, so only the id, display name and element type are needed here.
 */
export const openSavedSearchResultWidget = (
  widgetManager: WidgetManagerActionService,
  { id, name, elementType }: OpenSavedSearchResultWidgetParams
): void => {
  widgetManager.openMainWidget({
    id: `saved-search-${id}`,
    name,
    component: SAVED_SEARCH_RESULT_WIDGET,
    config: {
      savedSearchId: id,
      elementType,
      label: name,
      icon: { type: 'name', value: 'search' },
      iconColorGroup: 'element'
    }
  })
}
