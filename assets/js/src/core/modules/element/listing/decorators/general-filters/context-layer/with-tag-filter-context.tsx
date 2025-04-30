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
import { DirectChildrenFilterProvider } from './provider/direct-children-filter/direct-children-filter-provider'
import { FieldFiltersProvider } from './provider/field-filters/field-filters-provider'
import { PqlFilterProvider } from './provider/pql-filter/pql-filter-provider'
import { SearchTermFilterProvider } from './provider/search-term-filter/search-term-filter-provider'
import { type GeneralFiltersDecoratorConfig } from '../general-filters-decorator'
import { GeneralFiltersConfigProvider } from './provider/general-filters-config/general-filters-config-provider'

export const withGeneralFiltersContext = (Component: AbstractDecoratorProps['ContextComponent'], config?: GeneralFiltersDecoratorConfig): AbstractDecoratorProps['ContextComponent'] => {
  const GeneralFiltersContextComponent = (): React.JSX.Element => {
    return (
      <GeneralFiltersConfigProvider config={ config }>
        <DirectChildrenFilterProvider>
          <SearchTermFilterProvider>
            <PqlFilterProvider>
              <FieldFiltersProvider>
                <Component />
              </FieldFiltersProvider>
            </PqlFilterProvider>
          </SearchTermFilterProvider>
        </DirectChildrenFilterProvider>
      </GeneralFiltersConfigProvider>
    )
  }

  return GeneralFiltersContextComponent
}
