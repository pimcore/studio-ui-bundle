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

import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import React from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { FilterContainer } from '../tabs/filters/filter-container'

export const generalFiltersTabKey = 'general-filters'

export const withGeneralFiltersTab = (useBaseHook: AbstractDecoratorProps['useSidebarOptions']): AbstractDecoratorProps['useSidebarOptions'] => {
  const useSidebarGeneralFiltersExtension: typeof useBaseHook = () => {
    const { getProps: baseGetProps } = useBaseHook()

    const getProps: typeof baseGetProps = () => {
      const baseProps = baseGetProps()
      const sidebarHighlights: typeof baseProps['highlights'] = baseProps.highlights ?? []

      return {
        ...baseProps,
        highlights: sidebarHighlights,
        entries: [
          {
            component: <FilterContainer />,
            key: generalFiltersTabKey,
            icon: <Icon value="filter" />
          },
          ...baseProps.entries
        ]
      }
    }

    return {
      getProps
    }
  }

  return useSidebarGeneralFiltersExtension
}
