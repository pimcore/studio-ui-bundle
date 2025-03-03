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

import { type AbstractDecorator } from '../abstract-decorator'
import { withGeneralFiltersContext } from './context-layer/with-tag-filter-context'
import { withGeneralFiltersQueryArg } from './data-layer/with-general-filters-query-arg'
import { withGeneralFiltersTab } from './view-layer/components/sidebar/hooks/with-general-filters-tab'

export interface GeneralFiltersDecoratorConfig {
  handleSearchTermInSidebar: boolean
}

export const GeneralFiltersDecorator: AbstractDecorator<GeneralFiltersDecoratorConfig> = (props, config) => {
  const { ContextComponent, useDataQueryHelper, useSidebarOptions, ...baseProps } = props

  const newProps = {
    ContextComponent: withGeneralFiltersContext(ContextComponent, config),
    useDataQueryHelper: withGeneralFiltersQueryArg(useDataQueryHelper),
    useSidebarOptions: withGeneralFiltersTab(useSidebarOptions),
    ...baseProps
  }

  return newProps
}
