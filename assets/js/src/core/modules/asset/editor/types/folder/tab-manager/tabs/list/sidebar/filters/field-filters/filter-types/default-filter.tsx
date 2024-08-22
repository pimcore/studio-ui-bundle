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

import React, { useMemo, type ComponentType } from 'react'
import { type GridColumnConfiguration } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { TextFilter } from './text-filter'
import { SelectFilter } from './select-filter'

export interface DefaultFilterProps {
  column: GridColumnConfiguration
}

export const DefaultFilter = ({ column }: DefaultFilterProps): React.JSX.Element => {
  const { frontendType } = column

  const Component = useMemo(() => {
    return getComponent()
  }, [])

  // @todo implement different filter types
  return (
    <Component column={ column } />
  )

  function getComponent (): ComponentType<DefaultFilterProps> {
    switch (frontendType) {
      case 'text':
        return TextFilter
      case 'select':
        return SelectFilter
      default:
        return TextFilter
    }
  }
}
