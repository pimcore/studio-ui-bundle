/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { store } from '@Pimcore/app/store'
import { SavedSearchResultWidget } from './widget/saved-search-result-widget'
import { SavedSearchTitle } from './widget/saved-search-title'
import { selectSavedSearchDirty } from './dirty/saved-search-dirty-slice'
import { SAVED_SEARCH_RESULT_WIDGET } from './widget/saved-search-widget'

moduleSystem.registerModule({
  onInit: () => {
    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: SAVED_SEARCH_RESULT_WIDGET,
      component: SavedSearchResultWidget,
      titleComponent: SavedSearchTitle,
      isModified: (tabNode) => selectSavedSearchDirty(store.getState(), Number(tabNode.getConfig().savedSearchId))
    })
  }
})
