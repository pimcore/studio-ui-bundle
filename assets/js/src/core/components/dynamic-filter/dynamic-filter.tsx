/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { DynamicFilterProvider, type DynamicFilterProviderProps } from './provider/dynamic-filter-provider'
import { useDynamicTypeResolver } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'

export interface DynamicFilterProps extends Omit<DynamicFilterProviderProps, 'children'> {}

export const DynamicFilter = (props: DynamicFilterProps): React.JSX.Element => {
  const { frontendType, type } = props
  const { getComponentRenderer } = useDynamicTypeResolver()
  const { ComponentRenderer } = getComponentRenderer({ target: 'FIELD_FILTER', dynamicTypeIds: [type, frontendType ?? ''] })

  if (ComponentRenderer === null) {
    // @todo implement error handling
    return <>Dynamic Field Filter not supported</>
  }

  return useMemo(() => (
    <DynamicFilterProvider { ...props }>
      { ComponentRenderer({}) }
    </DynamicFilterProvider>
  ), [props])
}
