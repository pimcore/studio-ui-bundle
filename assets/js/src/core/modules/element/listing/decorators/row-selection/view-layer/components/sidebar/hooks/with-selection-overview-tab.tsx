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

import React from 'react'
import { useTranslation } from 'react-i18next'
import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { Icon } from '@Pimcore/components/icon/icon'
import { SelectionOverview } from '../tabs/selection-overview/selection-overview'

export const withSelectionOverviewTab = (useBaseHook: AbstractDecoratorProps['useSidebarOptions']): AbstractDecoratorProps['useSidebarOptions'] => {
  const useSelectionOverviewTab: typeof useBaseHook = () => {
    const { getProps: baseGetProps } = useBaseHook()
    const { t } = useTranslation()

    const getProps: typeof baseGetProps = () => {
      const baseProps = baseGetProps()

      return {
        ...baseProps,
        entries: [
          ...baseProps.entries,
          {
            component: <SelectionOverview />,
            key: 'selection-overview',
            icon: <Icon value="checkbox" />,
            tooltip: t('sidebar.selected_elements')
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
