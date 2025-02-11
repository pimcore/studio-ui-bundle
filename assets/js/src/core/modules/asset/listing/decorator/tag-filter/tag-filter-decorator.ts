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

import { type AbstractDecorator } from '../../../../element/listing/decorators/abstract-decorator'
import { withTagFilterContext } from './context-layer/with-tag-filter-context'
import { withTagFilterQueryArg } from './data-layer/with-tag-filter-query-arg'
import { withTabTagFilterEntry } from './view-layer/components/sidebar/hooks/with-tab-tag-filter-entry'

export const TagFilterDecorator: AbstractDecorator = (props) => {
  const { ContextComponent, useDataQueryHelper, useSidebarOptions, ...baseProps } = props

  const newProps = {
    ContextComponent: withTagFilterContext(ContextComponent),
    useDataQueryHelper: withTagFilterQueryArg(useDataQueryHelper),
    useSidebarOptions: withTabTagFilterEntry(useSidebarOptions),
    ...baseProps
  }

  return newProps
}
