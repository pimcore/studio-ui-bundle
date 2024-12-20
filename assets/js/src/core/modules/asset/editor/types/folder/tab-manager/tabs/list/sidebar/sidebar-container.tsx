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
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Sidebar } from '@Pimcore/components/sidebar/sidebar'
import { type ISidebarEntry } from '@Pimcore/modules/element/sidebar/sidebar-manager'
import { Icon } from '@Pimcore/components/icon/icon'
import { GridConfig } from './grid-config/grid-config'
import { TagFiltersContainer } from './tag-filters/tag-filters-container'
import { FilterContainer } from './filters/filter-container'

interface ISidebarContainerProps {
  errorData?: FetchBaseQueryError
}

export const SidebarContainer = ({ errorData }: ISidebarContainerProps): React.JSX.Element => {
  const entries: ISidebarEntry[] = useMemo(() => [
    {
      key: 'filter',
      component: <FilterContainer errorData={ errorData } />,
      icon: <Icon value="filter" />
    },

    {
      key: 'tags',
      component: <TagFiltersContainer />,
      icon: <Icon value="tag" />
    },

    {
      key: 'grid-config',
      component: <GridConfig />,
      icon: <Icon value="settings" />
    }
  ], [errorData])

  return useMemo(() => {
    return (
      <Sidebar
        entries={ entries }
        sizing='large'
      />
    )
  }, [entries, errorData])
}
