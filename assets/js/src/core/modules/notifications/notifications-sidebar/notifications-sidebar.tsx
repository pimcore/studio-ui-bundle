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
import { Sidebar } from '@Pimcore/components/sidebar/sidebar'
import { Icon } from '@Pimcore/components/icon/icon'
import { type ISidebarEntry } from '@Pimcore/modules/element/sidebar/sidebar-manager'
import { NotificationsDraftFiltersProvider, notificationsFilterDescriptors, useNotificationsAppliedFilters } from '@Pimcore/modules/notifications/filters/filters'
import { FilterTab } from '@Pimcore/modules/notifications/notifications-sidebar/components/filter-tab/filter-tab'

export const NotificationsSidebar = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { values: appliedValues } = useNotificationsAppliedFilters()

  const entries: ISidebarEntry[] = [
    {
      component: <FilterTab />,
      key: 'notifications-filter',
      icon: <Icon value="filter" />,
      tooltip: t('sidebar.search_filter')
    }
  ]

  return (
    <NotificationsDraftFiltersProvider
      descriptors={ notificationsFilterDescriptors }
      initialValues={ appliedValues }
    >
      <Sidebar
        entries={ entries }
        sizing='large'
      />
    </NotificationsDraftFiltersProvider>
  )
}
