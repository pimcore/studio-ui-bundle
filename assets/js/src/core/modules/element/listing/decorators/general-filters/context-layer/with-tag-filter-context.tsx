/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { type GeneralFiltersDecoratorConfig } from '../general-filters-decorator'
import { GeneralFiltersConfigProvider } from './provider/general-filters-config/general-filters-config-provider'
import { AppliedFiltersProvider, elementFilterDefinitions } from '../element-filters'

export const withGeneralFiltersContext = (Component: AbstractDecoratorProps['ContextComponent'], config?: GeneralFiltersDecoratorConfig): AbstractDecoratorProps['ContextComponent'] => {
  const GeneralFiltersContextComponent = (): React.JSX.Element => {
    return (
      <GeneralFiltersConfigProvider config={ config }>
        <AppliedFiltersProvider
          descriptors={ elementFilterDefinitions }
          initialValues={ config?.initialFilters }
        >
          <Component />
        </AppliedFiltersProvider>
      </GeneralFiltersConfigProvider>
    )
  }

  return GeneralFiltersContextComponent
}
