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

import { useState } from 'react'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { useFilters } from './use-filters'

interface IUseIncludeDescendantsFilterHookReturn {
  isShowOnlyDirectChildren: boolean
  setIsShowOnlyDirectChildren: (value: boolean) => void
  handleChangeIsIncludeDescendants: (e: CheckboxChangeEvent) => void
}

export const useIncludeDescendantsFilter = (): IUseIncludeDescendantsFilterHookReturn => {
  const [isShowOnlyDirectChildren, setIsShowOnlyDirectChildren] = useState<boolean>(false)

  const { updateIsIncludeDescendants } = useFilters()

  const handleChangeIsIncludeDescendants = (e: CheckboxChangeEvent): void => {
    const showOnlyDirectChildValue = e.target.checked
    const includeDescendantsValue = !showOnlyDirectChildValue

    setIsShowOnlyDirectChildren(showOnlyDirectChildValue)
    updateIsIncludeDescendants(includeDescendantsValue)
  }

  return {
    isShowOnlyDirectChildren,
    setIsShowOnlyDirectChildren,
    handleChangeIsIncludeDescendants
  }
}
