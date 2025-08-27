/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext } from 'react'
import { SidebarContext, type SidebarContextValue } from './sidebar-provider'

/**
 * Hook to access and control the sidebar state from within a SidebarProvider.
 * Provides methods to manage entries, buttons, highlights, active tabs, and sizing.
 *
 * @throws Error when used outside of a SidebarProvider
 * @returns SidebarContextValue with all sidebar state and control methods
 */
export const useSidebar = (): SidebarContextValue => {
  const context = useContext(SidebarContext)

  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }

  return context
}
