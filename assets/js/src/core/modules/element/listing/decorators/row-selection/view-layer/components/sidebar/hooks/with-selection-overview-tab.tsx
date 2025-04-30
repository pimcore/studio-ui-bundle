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
import { SelectionOverview } from '../tabs/selection-overview/selection-overview'

export const withSelectionOverviewTab = (useBaseHook: AbstractDecoratorProps['useSidebarOptions']): AbstractDecoratorProps['useSidebarOptions'] => {
  const useSelectionOverviewTab: typeof useBaseHook = () => {
    const { getProps: baseGetProps } = useBaseHook()

    const getProps: typeof baseGetProps = () => {
      const baseProps = baseGetProps()

      return {
        ...baseProps,
        entries: [
          ...baseProps.entries,
          {
            component: <SelectionOverview />,
            key: 'selection-overview',
            icon: <Icon value="checkbox" />
          }
        ]
      }
    }

    return {
      getProps
    }
  }

  return useSelectionOverviewTab
}
