/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React, { useMemo } from 'react'
import { Sidebar, type SidebarProps } from '@Pimcore/components/sidebar/sidebar'
import { Icon } from '@Pimcore/components/icon/icon'
import { GridConfig } from './sidebar-tabs/grid-config/grid-config'
import { TagFiltersContainer } from './sidebar-tabs/tag-filters/tag-filters-container'
import { FilterContainer } from './sidebar-tabs/filters/filter-container'
import { useListFilterOptions } from './hooks/use-list'
import { defaultFilterOptions } from './sidebar-tabs/filters/filter-provider'

export const SidebarContainer = (): React.JSX.Element => {
  const { filterOptions } = useListFilterOptions()
  const areFiltersModified = Object.keys(filterOptions).some(key => filterOptions[key] !== defaultFilterOptions[key])

  const modifiedSidebarEntries: SidebarProps['highlights'] = useMemo(() => {
    const modifiedEntries: SidebarProps['highlights'] = []

    if (areFiltersModified) {
      modifiedEntries.push('filter')
    }

    return modifiedEntries
  }, [areFiltersModified])

  const entries: SidebarProps['entries'] = useMemo(() => [
    {
      key: 'filter',
      component: <FilterContainer />,
      icon: <Icon name="filter-outlined" />
    },

    {
      key: 'tags',
      component: <TagFiltersContainer />,
      icon: <Icon name="tag-two-tone" />
    },

    {
      key: 'grid-config',
      component: <GridConfig />,
      icon: <Icon name="settings-outlined" />
    }
  ], [])

  return useMemo(() => {
    return (
      <Sidebar
        entries={ entries }
        highlights={ modifiedSidebarEntries }
        sizing='large'
      />
    )
  }, [entries, modifiedSidebarEntries])
}
