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
import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { TagFilterProvider } from './provider/tag-filter/tag-filter-provider'

export const withTagFilterContext = (Component: AbstractDecoratorProps['ContextComponent']): AbstractDecoratorProps['ContextComponent'] => {
  const TagFilterContextComponent = (): React.JSX.Element => {
    return (
      <TagFilterProvider>
        <Component />
      </TagFilterProvider>
    )
  }

  return TagFilterContextComponent
}
