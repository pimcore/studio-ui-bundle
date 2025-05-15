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
import { TagFiltersContainerInner } from './tag-filters-container-inner'
import { TagFiltersProvider } from './provider/tag-filters/tag-filters-provider'

export const TagFiltersContainer = (): React.JSX.Element => {
  return (
    <TagFiltersProvider>
      <TagFiltersContainerInner />
    </TagFiltersProvider>
  )
}
