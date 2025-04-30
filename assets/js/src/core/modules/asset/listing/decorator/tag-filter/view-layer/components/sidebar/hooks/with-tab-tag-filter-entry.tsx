/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import React from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { TagFiltersContainer } from '../tabs/tag-filters/tag-filters-container'
import { useTagFilter } from '../../../../context-layer/provider/tag-filter/use-tag-filter'

export const withTabTagFilterEntry = (useBaseHook: AbstractDecoratorProps['useSidebarOptions']): AbstractDecoratorProps['useSidebarOptions'] => {
  const useTabTagFilterEntry: typeof useBaseHook = () => {
    const { getProps: baseGetProps } = useBaseHook()
    const { tags } = useTagFilter()

    const getProps: typeof baseGetProps = () => {
      const baseProps = baseGetProps()
      let sidebarHighlights: typeof baseProps['highlights'] = baseProps.highlights ?? []

      if (tags.length > 0) {
        sidebarHighlights.push('tag-filters')
      } else {
        sidebarHighlights = sidebarHighlights.filter((highlight) => highlight !== 'tag-filters')
      }

      return {
        ...baseProps,
        highlights: sidebarHighlights,
        entries: [
          {
            component: <TagFiltersContainer />,
            key: 'tag-filters',
            icon: <Icon value="tag" />
          },
          ...baseProps.entries
        ]
      }
    }

    return {
      getProps
    }
  }

  return useTabTagFilterEntry
}
