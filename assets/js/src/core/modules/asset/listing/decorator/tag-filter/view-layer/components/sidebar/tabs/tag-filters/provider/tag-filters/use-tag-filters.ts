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

import { useContext } from 'react'
import { TagFiltersContext, type ITagFiltersContext } from './tag-filters-provider'

interface UseFiltersHookReturn extends ITagFiltersContext {}

export const useTagFilters = (): UseFiltersHookReturn => {
  const context = useContext(TagFiltersContext)
  return context
}
