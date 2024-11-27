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

import { useAppDispatch } from '@Pimcore/app/store'
import {
  addNavItem as addNavItemAction,
  type IMainNavItem
} from '@Pimcore/modules/app/nav/main-nav-slice'

interface useMainNavReturn {
  addNavItem: (item: IMainNavItem) => void
}

export const useMainNav = (): useMainNavReturn => {
  const dispatch = useAppDispatch()

  function addNavItem (item: IMainNavItem): void {
    dispatch(addNavItemAction(item))
  }

  return {
    addNavItem
  }
}
