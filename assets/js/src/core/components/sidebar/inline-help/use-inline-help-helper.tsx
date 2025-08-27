/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useSidebar } from '../use-sidebar'
import { useInlineHelp } from './inline-help-provider'
import { sidebarEntry } from './with-inline-help'

export interface UseInlineHelpHelperReturn {
  open: (component: any) => void
}

export const useInlineHelpHelper = (): UseInlineHelpHelperReturn => {
  const sidebar = useSidebar()
  const inlineHelp = useInlineHelp()

  const open = (component: any): void => {
    inlineHelp.setComponent(component as React.JSX.Element)
    sidebar.setActiveTab(sidebarEntry.key)
  }

  return {
    open
  }
}
