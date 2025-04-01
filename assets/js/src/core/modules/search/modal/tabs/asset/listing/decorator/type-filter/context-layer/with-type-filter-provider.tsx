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

import { TypeSelectProvider } from '@Pimcore/modules/asset/components/type-select/provider/type-select-provider'
import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import React from 'react'
import { type TypeFilterDecoratorConfig } from '../type-filter-decorator'

export const withTypeFilterProvider = (Component: AbstractDecoratorProps['ContextComponent'], config?: TypeFilterDecoratorConfig): AbstractDecoratorProps['ContextComponent'] => {
  const TypeFilterContextComponent = (): React.JSX.Element => {
    return (
      <TypeSelectProvider
        initialValue={ config?.restrictedOptions?.[0] ?? null }
        nullable={ config?.restrictedOptions === undefined }
        restrictOptions={ config?.restrictedOptions }
      >
        <Component />
      </TypeSelectProvider>
    )
  }

  return TypeFilterContextComponent
}
