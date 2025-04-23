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

import { type AbstractDecoratorWithRequiredConfig } from '../abstract-decorator'
import { withRowSelectionContext } from './context-layer/with-row-selection-context'
import { WithRowSelection } from './view-layer/components/grid/hooks/use-grid-options/with-row-selection'
import { withSelectionOverviewTab } from './view-layer/components/sidebar/hooks/with-selection-overview-tab'

export interface IRowSelectionDecoratorConfig {
  rowSelectionMode: 'single' | 'multiple'
}

export type IRowSelectionDecorator = AbstractDecoratorWithRequiredConfig<IRowSelectionDecoratorConfig>

export type IRowSelectionDecoratorProps = Parameters<IRowSelectionDecorator>[0]

export const RowSelectionDecorator: IRowSelectionDecorator = (props, config) => {
  const { useGridOptions, useSidebarOptions, ContextComponent, ...baseProps } = props

  const newProps = {
    ...baseProps,
    ContextComponent: withRowSelectionContext(ContextComponent),
    useGridOptions: WithRowSelection(useGridOptions, config),
    useSidebarOptions: config.rowSelectionMode === 'multiple' ? withSelectionOverviewTab(useSidebarOptions) : useSidebarOptions
  }

  return newProps
}
